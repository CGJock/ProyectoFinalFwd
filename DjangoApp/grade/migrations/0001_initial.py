# Generated by Django 5.1.1 on 2024-10-31 14:49

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='GRADE',
            fields=[
                ('id_grade', models.IntegerField(primary_key=True, serialize=False)),
                ('grade_name', models.CharField(max_length=100)),
            ],
        ),
    ]
