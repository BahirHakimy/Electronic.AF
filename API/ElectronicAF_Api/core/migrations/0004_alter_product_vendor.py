# Generated by Django 4.0.4 on 2022-07-13 05:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_product_vendor'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='vendor',
            field=models.CharField(choices=[('dell', 'DELL'), ('hp', 'HP'), ('apple', 'APPLE'), ('asus', 'ASUS'), ('lenovo', 'LENOVO'), ('msi', 'MSI')], default='dell', max_length=55),
        ),
    ]
