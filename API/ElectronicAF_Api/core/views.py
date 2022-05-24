from functools import partial
from django.core.files.uploadedfile import InMemoryUploadedFile
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, AllowAny
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.decorators import api_view, permission_classes, parser_classes

from .models import Product, Image
from .serializers import ProductCreateSerializer, ProductSerializer


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
