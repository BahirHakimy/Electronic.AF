from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import registerView,sendResetCodeView,passwordResetView

urlpatterns = [
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("register/",registerView,name="register"),
    path("sendResetCode/",sendResetCodeView,name="password_reset_code"),
    path("passwordReset/",passwordResetView,name="password_reset")
]