from django.contrib import admin

from .models import Address, Cart, CartItem, CustomerReview, Image, Order, Product


class ProductAdmin(admin.ModelAdmin):
    list_display = ("title", "id", "category", "price")
    list_filter = ("category", "price")
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


admin.site.register(Address)
admin.site.register(Cart, CartAdmin)
admin.site.register(CartItem, CartItemAdmin)
admin.site.register(CustomerReview)
admin.site.register(Image, ImageAdmin)
admin.site.register(Order)
admin.site.register(Product, ProductAdmin)
