from django.contrib import admin

from .models import Address, Cart, CartItem, CustomerReview, Image, Order, Product


class ProductAdmin(admin.ModelAdmin):
    list_display = ("title", "id", "type", "price")
    list_filter = ("type", "price")
    search_fields = ("title",)


class ImageAdmin(admin.ModelAdmin):
    list_display = ("product",)
    list_filter = ("product",)


class CartAdmin(admin.ModelAdmin):
    list_display = ("user", "id", "is_active", "timestamp")
    list_filter = ("user", "is_active")


class CartItemAdmin(admin.ModelAdmin):
    list_display = ("product", "quantity", "cart_id")
    list_filter = ("cart_id",)


class AddressAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "province", "contact_phone")
    list_filter = ("user", "province")


class OrderAdmin(admin.ModelAdmin):
    list_display = ("cart", "status", "total", "timestamp")
    list_filter = ("status",)


admin.site.register(Address, AddressAdmin)
admin.site.register(Cart, CartAdmin)
admin.site.register(CartItem, CartItemAdmin)
admin.site.register(CustomerReview)
admin.site.register(Image, ImageAdmin)
admin.site.register(Order, OrderAdmin)
admin.site.register(Product, ProductAdmin)
