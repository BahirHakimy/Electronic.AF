from django.urls import path
from .views import getProductsView, createProductView

urlpatterns = [
    path("createProduct/", createProductView, name="create_product"),
    path("getProducts/", getProductsView, name="get_products"),
]
