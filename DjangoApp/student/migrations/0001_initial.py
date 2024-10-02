# Generated by Django 5.1.1 on 2024-10-01 15:29

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('grade', '0001_initial'),
        ('instituto', '__first__'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='STUDENT',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('government_subsidy', models.BooleanField()),
                ('scholarship', models.BooleanField()),
                ('id_grade', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='grade.grade')),
                ('id_institution', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='instituto.institutions')),
                ('id_student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
