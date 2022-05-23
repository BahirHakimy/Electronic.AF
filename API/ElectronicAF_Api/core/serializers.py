from dataclasses import fields
from unicodedata import category
from rest_framework import serializers

from .models import Product, Image


class ImageSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)
    thumbnail = serializers.ImageField(use_url=True)

    class Meta:
        model = Image
        fields = ("image", "thumbnail")


class ProductCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"


class ProductSerializer(serializers.ModelSerializer):
    category = serializers.ReadOnlyField(source="get_category_display")
    storageType = serializers.ReadOnlyField(source="get_storage_type_display")
    memory = serializers.ReadOnlyField(source="get_memory_display")
    storage = serializers.ReadOnlyField(source="get_storage_display")
    images = serializers.SerializerMethodField("get_images")

    class Meta:
        model = Product
        fields = (
            "id",
            "title",
            "category",
            "cpu",
            "gpu",
            "memory",
            "storage",
            "storageType",
            "os",
            "price",
            "images",
        )

    def get_images(self, instance):
        images = Image.objects.filter(product=instance)
        if images.exists():
            serializer = ImageSerializer(images, many=True)
            return serializer.data
        else:
            return {}
