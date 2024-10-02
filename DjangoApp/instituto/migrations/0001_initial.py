# Generated by Django 5.1.1 on 2024-10-02 18:27

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='INSTITUTIONS',
            fields=[
                ('id_institution', models.AutoField(primary_key=True, serialize=False)),
                ('institution_name', models.CharField(max_length=150)),
                ('public_institution', models.BooleanField()),
                ('institution_address', models.CharField(max_length=200)),
            ],
        ),
    ]
