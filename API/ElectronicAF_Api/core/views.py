import base64
import json
from django.core.files.base import ContentFile
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
@permission_classes([AllowAny])
def createProductView(request):
    try:
        images = request.data["images"].split(",")
    except KeyError:
        images = None
    print(request.data[images[0]])
    print(type(request.data[images[0]]))

    data = request.data.copy()
    data["storage_type"] = data["storageType"]
    serializer = ProductCreateSerializer(data=data, many=False)
    if serializer.is_valid():
        product = serializer.save()
        if images:
            for image in images:
                if not isinstance(request.data[image], InMemoryUploadedFile):
                    image = ContentFile(
                        base64.urlsafe_b64decode(request.data[image]),
                        f"{product.title}.jpg",
                    )
                instance = Image.objects.create(
                    product=product, image=request.data[image]
                )
                instance.save()

        serializer = ProductSerializer(product, many=False)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    else:
        standerdizedErrors = {}
        print(serializer.errors)
        for error in serializer.errors:
            standerdizedErrors[error] = serializer.errors[error][0].__str__()
        return Response(
            {"errors": standerdizedErrors}, status=status.HTTP_400_BAD_REQUEST
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
