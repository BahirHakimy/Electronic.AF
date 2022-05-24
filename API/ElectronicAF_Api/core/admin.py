from django.contrib import admin
from .models import Product, Image


class ProductAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "price")
    list_filter = ("category", "price")
    search_fields = ("title",)


class ImageAdmin(admin.ModelAdmin):
    list_display = ("product",)
    list_filter = ("product",)


admin.site.register(Product, ProductAdmin)
admin.site.register(Image, ImageAdmin)
