from dataclasses import field, fields
from itertools import product
from pyexpat import model
from rest_framework import serializers

from .models import Address, Cart, CartItem, CustomerReview, Image, Order, Product


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
    images = serializers.SerializerMethodField("get_images")
    memory = serializers.ReadOnlyField(source="get_memory_display")
    storage = serializers.ReadOnlyField(source="get_storage_display")
    storageType = serializers.ReadOnlyField(source="get_storage_type_display")

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
            "description",
            "images",
        )

    def get_images(self, instance):
        images = Image.objects.filter(product=instance)
        if images.exists():
            serializer = ImageSerializer(images, many=True)
            return serializer.data
        else:
            return {}


class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True, many=False)

    class Meta:
        model = CartItem
        fields = ("product", "quantity")


class CartSerailizer(serializers.ModelSerializer):
    items = serializers.SerializerMethodField("serialize_items")

    class Meta:
        model = Cart
        fields = (
            "id",
            "items",
        )

    def serialize_items(self, instance):
        items = instance.get_items()
        if len(items) > 0:
            serializer = CartItemSerializer(items, many=True)
            return serializer.data
        else:
            return {}


class CustomerReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerReview
        fields = ("product", "rating", "review")
