from random import random
from urllib import response
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import AllowAny
from django.core.mail import send_mail
from django.contrib.auth import get_user_model
from core.serializers import UserCreateSerializer
from django.conf import settings


@api_view(["POST"])
def registerView(request):
    serializer = UserCreateSerializer(data=request.data,many=False)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data,status=status.HTTP_201_CREATED)
    else:
        standerdizedErrors = {}
        print(serializer.errors)
        for error in serializer.errors:
            standerdizedErrors[error] = serializer.errors[error][0].__str__()
        return Response({"errors":standerdizedErrors},status=status.HTTP_400_BAD_REQUEST)


def sendEmail(request):
    subject = request.data['subject']
    message = request.data['message']
    sender = request.data["from"]
    to = request.data['to']

    result = send_mail(subject,message,sender,[to],fail_silently=False)
    return Response({"result":result},status=status.HTTP_200_OK)


@api_view(["POST"])
def confirmationCode(request):
    User = get_user_model()
    email = request.data['email']
    try:
        user = User.objects.get(email=email)
        # random()

        subject = f"Reset password code {user.get_email()}"
        message = f"Use {2344} for reseting you account password."
        sender = settings.EMAIL_HOST_USER
        try:
            # user.email_user(subject,message,sender)
            send_mail(subject,message,sender,[user.get_email()])
            return Response({"detail":"Reset code was sent to your email.If you can't find it check your spam folder."})
        except Exception:
            print(Exception)
            return Response({"detail":"Some thing went wrong please try again later."},status=status.HTTP_503_SERVICE_UNAVAILABLE)
    except User.DoesNotExist:
        return Response({"detail":"User with the given email not found in the database."})