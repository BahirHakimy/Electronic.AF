import os
from django.db import models
from django.db.models.signals import pre_delete
from django.core.files.uploadedfile import SimpleUploadedFile
from io import BytesIO
from PIL import Image as PilImage, ImageFilter, ImageOps


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
    os = models.CharField(max_length=55, blank=True)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    description = models.TextField(blank=True)

    def __str__(self) -> str:
        return self.title

    def get_images(self):
        product_images = Image.objects.filter(product=self)
        if product_images.exists():
            return product_images
        return None


class Image(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    image = models.ImageField(upload_to="products")
    thumbnail = models.ImageField(upload_to="products/tumbnails", blank=True)

    def __str__(self) -> str:
        return f"image of {self.product.title}"

    def create_thumbnail(self):
        if not self.image:
            return
        THUMBNAIL_SIZE = (600, 450)

        if self.image.name.endswith(".jpg"):
            PIL_TYPE = "jpeg"
            FILE_EXTENSION = "jpg"
            DJANGO_TYPE = "image/jpeg"

        elif self.image.name.endswith(".png"):
            PIL_TYPE = "png"
            FILE_EXTENSION = "png"
            DJANGO_TYPE = "image/png"

        image = PilImage.open(BytesIO(self.image.read()))
        image.thumbnail(THUMBNAIL_SIZE, PilImage.ANTIALIAS)
        image = ImageOps.exif_transpose(image.filter(ImageFilter.GaussianBlur(4)))
        temp_handle = BytesIO()
        image.save(temp_handle, PIL_TYPE)
        temp_handle.seek(0)
        suf = SimpleUploadedFile(
            os.path.split(self.image.name)[-1],
            temp_handle.read(),
            content_type=DJANGO_TYPE,
        )
        self.thumbnail.save(
            "%s_thumbnail.%s" % (os.path.splitext(suf.name)[0], FILE_EXTENSION),
            suf,
            save=False,
        )

    def save(self, *args, **kwargs):
        if not self.thumbnail:
            self.create_thumbnail()
        super(Image, self).save()


def deleteFilesFromDisk(instance, **kwargs):
    if instance.image:
        instance.image.delete(False)
    if instance.thumbnail:
        instance.thumbnail.delete(False)


pre_delete.connect(deleteFilesFromDisk, sender=Image)
