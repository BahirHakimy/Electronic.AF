from django.urls import path
from .views import (
    addToCartView,
    getUserCartView,
    getProductsView,
    createProductView,
    deleteProductView,
    removeFromCartView,
    updateProductView,
    getRatingForProductView,
    addProductReviewView,
)

urlpatterns = [
    path("getProducts/", getProductsView, name="get_products"),
    path("createProduct/", createProductView, name="create_product"),
    path("updateProduct/", updateProductView, name="update_product"),
    path("deleteProduct/", deleteProductView, name="delete_product"),
    path("getCart/", getUserCartView, name="cart_info"),
    path("addToCart/", addToCartView, name="add_to_cart"),
    path("removeFromCart/", removeFromCartView, name="remove_from_cart"),
    path("submitReview/", addProductReviewView, name="submit_review"),
    path("getRating/", getRatingForProductView, name="get_average_rating"),
]
