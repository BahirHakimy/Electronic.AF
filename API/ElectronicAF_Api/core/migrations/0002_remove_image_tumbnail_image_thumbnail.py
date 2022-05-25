# Generated by Django 4.0.4 on 2022-05-22 13:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='image',
            name='tumbnail',
        ),
        migrations.AddField(
            model_name='image',
            name='thumbnail',
            field=models.ImageField(blank=True, upload_to='products/tumbnails'),
        ),
    ]