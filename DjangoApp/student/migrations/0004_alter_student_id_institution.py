# Generated by Django 5.1.1 on 2024-10-12 20:57

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('instituto', '0001_initial'),
        ('student', '0003_student_psychologist_in_charge'),
    ]

    operations = [
        migrations.AlterField(
            model_name='student',
            name='id_institution',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='instituto.institutions'),
        ),
    ]
