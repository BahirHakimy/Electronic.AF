from django.contrib import admin
from .customUserAdmin import CustomUserAdmin
from .models import CustomUser



admin.site.register(CustomUser,CustomUserAdmin)

# Register your models here.
