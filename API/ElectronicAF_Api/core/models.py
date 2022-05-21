from itertools import product
from turtle import screensize
from django.db import models


CATEGORIES = [("LT", "Laptop"), ("DT", "Desktop")]
MEMORY_CAPACITIES = [
    ("4", "4GB"),
    ("8", "8GB"),
    ("16", "16GB"),
    ("32", "32GB"),
    ("64", "64GB"),
    ("128", "128GB"),
]
STORAGE_CAPACITIES = [
    ("256", "256GB"),
    ("512", "512GB"),
    ("1000", "1TB"),
    ("2000", "2TB"),
    ("4000", "4TB"),
]
STORAGE_TYPES = [("1", "HDD"), ("2", "SSD")]


class Product(models.Model):
    title = models.CharField("Product nam", max_length=255)
    category = models.CharField(max_length=2, choices=CATEGORIES)
    cpu = models.CharField(max_length=255)
    gpu = models.CharField(max_length=255)
    memory = models.CharField(max_length=3, choices=MEMORY_CAPACITIES)
    storage = models.CharField(max_length=4, choices=STORAGE_CAPACITIES)
    storage_type = models.CharField(max_length=1, choices=STORAGE_TYPES)
    os = models.CharField(max_length=55)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    description = models.TextField()

    def get_images(self):
        product_images = Image.objects.filter(product=self)
        if product_images.exists():
            return product_images
        return None


class Image(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    image = models.ImageField(upload_to="products")
    tumbnail = models.ImageField(upload_to="products/tumbnails")
