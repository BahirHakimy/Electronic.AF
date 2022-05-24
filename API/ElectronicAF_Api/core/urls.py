from django.urls import path
from .views import (
    getProductsView,
    createProductView,
    deleteProductView,
    updateProductView,
)

urlpatterns = [
    path("getProducts/", getProductsView, name="get_products"),
    path("createProduct/", createProductView, name="create_product"),
    path("deleteProduct/", deleteProductView, name="delete_product"),
    path("updateProduct/", updateProductView, name="update_product"),
]
