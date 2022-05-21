import random
from datetime import datetime, timedelta
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from django.core.mail import send_mail
from django.contrib.auth import get_user_model
from core.models import ResetCodes
from core.serializers import UserCreateSerializer
from django.conf import settings


@api_view(["POST"])
@permission_classes([AllowAny])
def registerView(request):
    serializer = UserCreateSerializer(data=request.data, many=False)
    if serializer.is_valid():
        serializer.save()
        copydata = serializer.data.copy()
        copydata.pop("password")
        return Response(copydata, status=status.HTTP_201_CREATED)
    else:
        standerdizedErrors = {}
        print(serializer.errors)
        for error in serializer.errors:
            standerdizedErrors[error] = serializer.errors[error][0].__str__()
        return Response(
            {"errors": standerdizedErrors}, status=status.HTTP_400_BAD_REQUEST
        )


def getRandom6digitCode():
    return random.randint(111111, 999999)


@api_view(["POST"])
@permission_classes([AllowAny])
def passwordResetView(request):
    User = get_user_model()
    try:
        code = request.data["resetCode"]
        new_password = request.data["newPassword"]
        email = request.data["email"]
        user = User.objects.get(email=email)
        try:
            reset_code = ResetCodes.objects.get(user=user, value=code)
            if reset_code.is_valid(user):
                user.set_password(new_password)
                user.save()
                reset_code.used = True
                reset_code.save()
                return Response(
                    {"detail": "Password reseted successfully"},
                    status=status.HTTP_202_ACCEPTED,
                )
            else:
                return Response(
                    {"detail": "Entered resetCode is not valid or expired"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        except ResetCodes.DoesNotExist:
            return Response(
                {"detail": "Entered resetCode is invalid"},
                status=status.HTTP_400_BAD_REQUEST,
            )
    except KeyError:
        return Response(
            {
                "detail": "You must include all requested data in request body (email,resetCode,newPassword)"
            },
            status=status.HTTP_400_BAD_REQUEST,
        )


@api_view(["POST"])
@permission_classes([AllowAny])
def sendResetCodeView(request):
    User = get_user_model()
    email = request.data["email"]
    try:
        user = User.objects.get(email=email)
        code = None
        codes_queryset = ResetCodes.objects.filter(user=user)
        if codes_queryset.exists():
            existent_code = codes_queryset[0]
            if existent_code.is_valid(user):
                code = existent_code.value
            else:
                existent_code.value = getRandom6digitCode()
                existent_code.generated_at = datetime.now()
                existent_code.used = False
                existent_code.save()
                code = existent_code.value
        else:
            new_code = ResetCodes.objects.create(user=user, value=getRandom6digitCode())
            code = new_code.value

        subject = f"Reset password code for {user.get_email()}"
        message = f"Use [{code}] for reseting you account password."
        sender = settings.EMAIL_HOST_USER
        try:
            user.email_user(subject, message, sender, fail_silently=False)
            return Response(
                {
                    "detail": "Reset code was sent to your email.If you can't find it check your spam folder."
                },
                status=status.HTTP_200_OK,
            )
        except Exception:
            print(Exception.with_traceback())
            return Response(
                {"detail": "Some thing went wrong please try again later."},
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )
    except User.DoesNotExist:
        return Response(
            {"detail": "User with the given email not found in the database."},
            status=status.HTTP_404_NOT_FOUND,
        )
