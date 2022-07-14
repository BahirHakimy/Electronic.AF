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
    type = serializers.ReadOnlyField(source="get_type_display")
    vendor = serializers.ReadOnlyField(source="get_vendor_display")
    images = serializers.SerializerMethodField("get_images")
    memory = serializers.ReadOnlyField(source="get_memory_display")
    storage = serializers.ReadOnlyField(source="get_storage_display")
    storageType = serializers.ReadOnlyField(source="get_storage_type_display")

    class Meta:
        model = Product
        fields = (
            "id",
            "title",
            "type",
            "vendor",
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
    total = serializers.ReadOnlyField(source="get_total_price")

    class Meta:
        model = Cart
        fields = ("id", "items", "total")

    def serialize_items(self, instance):
        items = instance.get_items()
        if len(items) > 0:
            serializer = CartItemSerializer(items, many=True)
            return serializer.data
        else:
            return {}


class CustomerReviewSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source="get_user_identifier")

    class Meta:
        model = CustomerReview
        fields = ("username", "product", "rating", "review")


class AddressSerializer(serializers.ModelSerializer):
    province = serializers.ReadOnlyField(source="get_province_display")
    homeAddress = serializers.ReadOnlyField(source="home_address")
    contactPhone = serializers.ReadOnlyField(source="contact_phone")

    class Meta:
        model = Address
        fields = ("id", "user", "province", "district", "homeAddress", "contactPhone")


class AddressCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = "__all__"


class OrderSerializer(serializers.ModelSerializer):

    address = AddressSerializer(read_only=True, many=False)
    items = serializers.SerializerMethodField("serialize_items")
    status = serializers.ReadOnlyField(source="get_status_display")

    class Meta:
        model = Order
        fields = ("address", "items", "status", "total")

    def serialize_items(self, instance):
        items = instance.cart.get_items()
        if len(items) > 0:
            serializer = CartItemSerializer(items, many=True)
            return serializer.data
        else:
            return []
