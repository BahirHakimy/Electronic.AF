import pytz
from django.db import models
from django.conf import settings
from django.utils import timezone
from django.core.mail import send_mail
from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin
from datetime import datetime, timedelta


class CustomManager(BaseUserManager):
    use_in_migrations = True

    def create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError("User must have an email address")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(email, password, **extra_fields)


class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(verbose_name="email address", unique=True)
    phone = models.CharField(max_length=9)
    firstname = models.CharField(("first name"), max_length=150)
    lastname = models.CharField(("last name"), max_length=150)
    is_staff = models.BooleanField(
        ("staff status"),
        default=False,
        help_text=("Designates whether the user can log into this admin site."),
    )
    is_active = models.BooleanField(
        ("active"),
        default=True,
        help_text=(
            "Designates whether this user should be treated as active. "
            "Unselect this instead of deleting accounts."
        ),
    )
    date_joined = models.DateTimeField(("date joined"), default=timezone.now)

    objects = CustomManager()

    class Meta:
        verbose_name = "user"
        verbose_name_plural = "users"

    def __str__(self) -> str:
        return self.email

    def get_full_name(self):
        """
        Return the first_name plus the last_name, with a space in between.
        """
        fullname = "%s %s" % (self.firstname, self.lastname)
        return fullname.strip()

    def email_user(self, subject, message, from_email=None, **kwargs):
        """Send an email to this user."""
        send_mail(subject, message, from_email, [self.email], **kwargs)

    def get_email(self):
        return self.email

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []


class ResetCodes(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    value = models.CharField(max_length=6)
    generated_at = models.DateTimeField(auto_now_add=True)
    used = models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.value

    def is_valid(self, for_user):
        utc = pytz.UTC
        if self.user == for_user:
            if (
                self.generated_at.replace(tzinfo=utc) + timedelta(minutes=5)
                > datetime.now().replace(tzinfo=utc)
                and not self.used
            ):
                return True
        return False
