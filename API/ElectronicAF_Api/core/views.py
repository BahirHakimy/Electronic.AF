from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import AllowAny

from core.serializers import UserCreateSerializer


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
