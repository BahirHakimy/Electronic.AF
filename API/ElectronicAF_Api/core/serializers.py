from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    fullname = serializers.ReadOnlyField(source="get_fullname")

    class Meta:
        model = User
        fields = ("email", "fullname", "phone")


class UserCreateSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data["email"],
            validated_data["password"],
            firstname=validated_data["firstname"],
            lastname=validated_data["lastname"],
        )
        user.phone = validated_data["phone"]
        return user

    class Meta:
        model = User
        fields = ("email", "password", "firstname", "lastname", "phone")
