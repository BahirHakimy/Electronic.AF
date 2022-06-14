from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    MyTokenObtainPairView,
    checkResetCodeView,
    registerView,
    sendResetCodeView,
    passwordResetView,
)

urlpatterns = [
    path("token/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("register/", registerView, name="register"),
    path("sendResetCode/", sendResetCodeView, name="password_reset_code"),
    path("checkResetCode/", checkResetCodeView, name="check_reset_code"),
    path("passwordReset/", passwordResetView, name="password_reset"),
]
