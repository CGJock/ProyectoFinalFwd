# Generated by Django 5.1.1 on 2024-10-31 14:50

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('grade', '0001_initial'),
        ('instituto', '0001_initial'),
        ('psychologist', '__first__'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='STUDENT',
            fields=[
                ('id_student', models.AutoField(primary_key=True, serialize=False)),
                ('government_subsidy', models.BooleanField()),
                ('scholarship', models.BooleanField()),
                ('id_grade', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='grade.grade')),
                ('id_institution', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='instituto.institutions')),
                ('id_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('psychologist_in_charge', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='pacient', to='psychologist.psychologist')),
            ],
        ),
    ]
