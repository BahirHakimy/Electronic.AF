from django.contrib import admin

from .customUserAdmin import CustomUserAdmin
from .models import CustomUser, ResetCodes


class ResetCodeAdmin(admin.ModelAdmin):
    list_display = ("user", "value", "generated_at", "used")


admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(ResetCodes, ResetCodeAdmin)

# Register your models here.
