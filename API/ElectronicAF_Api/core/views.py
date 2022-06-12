from django.contrib.auth import get_user_model
from django.core.files.uploadedfile import InMemoryUploadedFile
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, AllowAny
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.decorators import api_view, permission_classes, parser_classes

from .models import Address, Cart, CartItem, CustomerReview, Image, Order, Product
from .serializers import (
    CartSerailizer,
    CustomerReviewSerializer,
    ProductCreateSerializer,
    ProductSerializer,
)


@api_view(["POST"])
@parser_classes([MultiPartParser, FormParser])
@permission_classes([IsAdminUser])
def createProductView(request):
    images = None
    if len(request.FILES) > 0:
        images = request.FILES

    data = request.data.copy()
    data["storage_type"] = data["storageType"]
    serializer = ProductCreateSerializer(data=data, many=False)
    if serializer.is_valid():
        product = serializer.save()
        if images:
            for image in images:
                if not isinstance(request.data[image], InMemoryUploadedFile):
                    return Response(
                        {
                            "detail": "Error: The sent files are either too big or not supported"
                        },
                        status=status.HTTP_400_BAD_REQUEST,
                    )
                instance = Image.objects.create(product=product, image=images[image])
                instance.save()

        serializer = ProductSerializer(product, many=False)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    else:
        standerdizedErrors = {}
        for error in serializer.errors:
            standerdizedErrors[error] = serializer.errors[error][0].__str__()
        return Response(
            {"errors": standerdizedErrors}, status=status.HTTP_400_BAD_REQUEST
        )


@api_view(["PUT"])
@permission_classes([IsAdminUser])
def updateProductView(request):
    try:
        id = request.data["id"]
        try:
            product = Product.objects.get(id=id)
            data = request.data.copy()
            if data.__contains__("storageType"):
                data["storage_type"] = data["storageType"]

            serializer = ProductCreateSerializer(
                instance=product, data=data, partial=True
            )
            if serializer.is_valid():
                product = serializer.save()
                serializer = ProductSerializer(product, many=False)
                return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
            else:
                standerdizedErrors = {}
                for error in serializer.errors:
                    standerdizedErrors[error] = serializer.errors[error][0].__str__()
                return Response(
                    {"errors": standerdizedErrors}, status=status.HTTP_400_BAD_REQUEST
                )

        except Product.DoesNotExist:
            return Response(
                {"detail": "Product with the given id was not found in the system"},
                status=status.HTTP_404_NOT_FOUND,
            )
    except KeyError:
        return Response(
            {"detail": "You must include the id of product you want to update"},
            status=status.HTTP_400_BAD_REQUEST,
        )


@api_view(["DELETE"])
@permission_classes([IsAdminUser])
def deleteProductView(request):
    try:
        id = request.data["id"]
        try:
            product = Product.objects.get(id=id)
            product.delete()
            return Response(
                {"detail": f"Product with id[{id}] was deleted successfully"},
                status=status.HTTP_200_OK,
            )
        except Product.DoesNotExist:
            return Response(
                {"detail": "Product with the given id was not found in the system"},
                status=status.HTTP_404_NOT_FOUND,
            )
    except KeyError:
        return Response(
            {"detail": "You must include the id of product you want to delete"},
            status=status.HTTP_400_BAD_REQUEST,
        )


@api_view(["GET"])
@permission_classes([AllowAny])
def getProductsView(request):
    products = Product.objects.all()
    if products.exists():
        serializer = ProductSerializer(
            products, many=True, context={"request": request}
        )
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(
            {"detail": "No availble product in the database"}, status=status.HTTP_200_OK
        )


@api_view(["POST"])
def getUserCartView(request):
    User = get_user_model()
    try:
        email = request.data["email"]
        try:
            user = User.objects.get(email=email)
            carts = Cart.objects.filter(user=user, is_active=True).order_by(
                "-timestamp"
            )
            if carts.exists() and carts.count() < 2:
                cart = carts[0]
            elif carts.count() >= 2:
                cart_to_deactive, cart = carts
                cart_to_deactive.is_active = False
                cart_to_deactive.save()
            else:
                cart = Cart.objects.create(user=user, is_active=True)

            serializer = CartSerailizer(cart, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except User.DoesNotExist:
            return Response(
                {
                    "detail": "User with the given email does not exist.",
                },
                status=status.HTTP_404_NOT_FOUND,
            )

    except KeyError:
        return Response(
            {"detail": "You should provide user's email to get cart status."},
            status=status.HTTP_400_BAD_REQUEST,
        )


@api_view(["POST"])
def addToCartView(request):
    User = get_user_model()
    try:
        email = request.data["email"]
        product_id = request.data["productId"]
        try:
            user = User.objects.get(email=email)
            product = Product.objects.get(id=product_id)
            cart, created = Cart.objects.get_or_create(user=user, is_active=True)
            if created:
                cartItem = CartItem.objects.create(product=product, cart=cart)
                cartItem.save()
                serializer = CartSerailizer(cart, many=False)
                return Response(
                    {
                        "detail": "Product added to cart.",
                        "items": serializer.data["items"],
                    },
                    status=status.HTTP_202_ACCEPTED,
                )
            cartItem = CartItem.objects.filter(cart=cart, product=product)
            if cartItem.exists():
                cartItem = cartItem[0]
                cartItem.quantity += 1
            else:
                cartItem = CartItem.objects.create(cart=cart, product=product)
            cartItem.save()
            serializer = CartSerailizer(cart, many=False)
            return Response(
                {"detail": "Product added to cart.", "items": serializer.data["items"]},
                status=status.HTTP_202_ACCEPTED,
            )

        except User.DoesNotExist:
            return Response(
                {
                    "detail": "User with the given email does not exist.",
                },
                status=status.HTTP_404_NOT_FOUND,
            )
        except Product.DoesNotExist:
            return Response(
                {
                    "detail": "Requested product does not exist.",
                },
                status=status.HTTP_404_NOT_FOUND,
            )

    except KeyError:
        return Response(
            {
                "detail": "You should include user's email and productId in your request."
            },
            status=status.HTTP_400_BAD_REQUEST,
        )


@api_view(["DELETE"])
def removeFromCartView(request):
    try:
        cart_id = request.data["cartId"]
        product_id = request.data["productId"]
        try:
            remove_product = request.data["removeProduct"]
        except KeyError:
            remove_product = False
        try:
            product = Product.objects.get(id=product_id)
            cart = Cart.objects.get(id=cart_id, is_active=True)
            cartItem = CartItem.objects.get(cart=cart, product=product)
            if remove_product or cartItem.quantity == 1:
                cartItem.delete()
                message = "Product was removed from your cart."
            else:
                cartItem.quantity -= 1
                cartItem.save()
                message = "Product quantity updated."
            serializer = CartSerailizer(cart, many=False)
            return Response(
                {
                    "detail": message,
                    "items": serializer.data["items"],
                },
                status=status.HTTP_202_ACCEPTED,
            )

        except Product.DoesNotExist:
            return Response(
                {
                    "detail": "Requested product does not exist.",
                },
                status=status.HTTP_404_NOT_FOUND,
            )
        except Cart.DoesNotExist:
            return Response(
                {
                    "detail": "Provided cartId is not valid",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

    except KeyError:
        return Response(
            {
                "detail": "You should include cartId, productId and removedProduct in your request."
            },
            status=status.HTTP_400_BAD_REQUEST,
        )


@api_view(["POST"])
def getUserReview(request):

    User = get_user_model()
    try:
        product_id = request.data["productId"]
        email = request.data["email"]
        try:
            review_profile = CustomerReview.objects.filter(
                user__email=email, product__id=product_id
            )
            if review_profile.exists():
                review_profile = review_profile[0]
                serializer = CustomerReviewSerializer(
                    review_profile,
                    many=False,
                )
                return Response(
                    serializer.data,
                    status=status.HTTP_200_OK,
                )
            else:
                return Response(
                    {},
                    status=status.HTTP_200_OK,
                )
        except User.DoesNotExist:
            return Response(
                {"detail": "User with the given email does not exist."},
                status=status.HTTP_404_NOT_FOUND,
            )
        except ValueError:
            return Response(
                {"detail": "productId or email not formatted correctly."},
                status=status.HTTP_400_BAD_REQUEST,
            )

    except KeyError:
        return Response(
            {"detail": "You should include productId and user email in your request."}
        )


@api_view(["POST"])
@permission_classes([AllowAny])
def getProductReviews(request):
    try:
        product_id = request.data["productId"]
        reviews = CustomerReview.objects.filter(product__id=product_id)
        if reviews.exists():
            serializer = CustomerReviewSerializer(
                reviews,
                many=True,
            )
            return Response(
                serializer.data,
                status=status.HTTP_200_OK,
            )
        else:
            return Response(
                {},
                status=status.HTTP_200_OK,
            )

    except KeyError:
        return Response(
            {"detail": "You should include productId in your request."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    except ValueError:
        return Response(
            {"detail": "productId must be a number."},
            status=status.HTTP_400_BAD_REQUEST,
        )


@api_view(["POST"])
@permission_classes([AllowAny])
def addProductReviewView(request):
    User = get_user_model()
    try:
        product_id = request.data["productId"]
        email = request.data["email"]
        try:
            rating = request.data["rating"]
            review = ""
            if request.data.__contains__("review"):
                review = request.data["review"]

            review_profile = CustomerReview.objects.filter(
                user__email=email, product__id=product_id
            )
            if review_profile.exists():
                review_profile = review_profile[0]
                serializer = CustomerReviewSerializer(
                    review_profile,
                    data={"review": review, "rating": rating},
                    partial=True,
                    many=False,
                )
                message = "Review Updated."
            else:
                user = User.objects.get(email=email)
                serializer = CustomerReviewSerializer(
                    data={
                        "user": user.id,
                        "product": product_id,
                        "review": review,
                        "rating": rating,
                    },
                    many=False,
                )
                message = "Review Submited."

            if serializer.is_valid():
                serializer.save()

                return Response(
                    {"detail": message, "data": serializer.data},
                    status=status.HTTP_202_ACCEPTED,
                )
            else:
                standerdizedErrors = {}
                for error in serializer.errors:
                    standerdizedErrors[error] = serializer.errors[error][0].__str__()
                return Response(
                    {"errors": standerdizedErrors}, status=status.HTTP_400_BAD_REQUEST
                )
        except KeyError:
            return Response(
                {"errors": {"rating": "This field is required."}},
                status=status.HTTP_400_BAD_REQUEST,
            )
        except User.DoesNotExist:
            return Response(
                {"detail": "User with the given email does not exist."},
                status=status.HTTP_404_NOT_FOUND,
            )

    except KeyError:
        return Response(
            {"detail": "You should include productId and user email in your request."}
        )


@api_view(["POST"])
@permission_classes([AllowAny])
def getRatingForProductView(request):
    try:
        product_id = request.data["productId"]
        try:
            product = Product.objects.get(id=product_id)
            reviewProfile = CustomerReview.objects.filter(product=product)
            average_rate = 0
            reviews = 0
            if reviewProfile.exists():
                average_rate, reviews = reviewProfile[0].get_average_rating()
            return Response(
                {"average_rating": average_rate, "reviews": reviews},
                status=status.HTTP_200_OK,
            )
        except Product.DoesNotExist:
            return Response(
                {"detail": "Product with the given id was not found."},
                status=status.HTTP_404_NOT_FOUND,
            )
        except ValueError:
            return Response(
                {"detail": "productId must be number."},
                status=status.HTTP_400_BAD_REQUEST,
            )

    except KeyError:
        return Response(
            {"detail": "You should include productId to get review for."},
            status=status.HTTP_400_BAD_REQUEST,
        )
