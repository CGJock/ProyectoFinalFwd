# Generated by Django 5.1.1 on 2024-11-04 07:51

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ROL',
            fields=[
                ('id_rol', models.IntegerField(primary_key=True, serialize=False)),
                ('rol_name', models.CharField(max_length=100)),
            ],
        ),
    ]
