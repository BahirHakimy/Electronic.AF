from django.urls import path
from .views import (
    addToCartView,
    getProductView,
    getUserReview,
    getProductReviews,
    getProductsView,
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
    path("getProduct/", getProductView, name="get_product"),
    path("createProduct/", createProductView, name="create_product"),
    path("updateProduct/", updateProductView, name="update_product"),
    path("deleteProduct/", deleteProductView, name="delete_product"),
    path("getCart/", getUserCartView, name="cart_info"),
    path("addToCart/", addToCartView, name="add_to_cart"),
    path("removeFromCart/", removeFromCartView, name="remove_from_cart"),
    path("getUserReview/", getUserReview, name="get_user_review"),
    path("getProductReviews/", getProductReviews, name="get_product_reviews"),
    path("submitReview/", addProductReviewView, name="submit_review"),
    path("getRating/", getRatingForProductView, name="get_average_rating"),
]
