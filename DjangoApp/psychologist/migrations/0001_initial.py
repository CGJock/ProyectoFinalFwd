# Generated by Django 5.1.1 on 2024-11-02 19:34

import django.db.models.deletion
import django.utils.timezone
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='EXPEDIENT',
            fields=[
                ('id_expedient', models.AutoField(primary_key=True, serialize=False)),
                ('state', models.TextField(default='open', max_length=55)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('id_pacient', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='PACIENTFILES',
            fields=[
                ('id_file', models.AutoField(primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('file_name', models.CharField(max_length=55)),
                ('file', models.FileField(upload_to='')),
                ('id_expedient', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Files', to='psychologist.expedient')),
            ],
        ),
        migrations.CreateModel(
            name='PSYCHOLOGIST',
            fields=[
                ('id_psychologist', models.AutoField(primary_key=True, serialize=False)),
                ('pacient_count', models.IntegerField(default=0)),
                ('license_code', models.CharField(max_length=100)),
                ('availability', models.BooleanField()),
                ('assigned_to_hotline', models.BooleanField()),
                ('years_experience', models.IntegerField()),
                ('id_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='expedient',
            name='id_psychologist',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='psychologist.psychologist'),
        ),
        migrations.CreateModel(
            name='SESSION',
            fields=[
                ('id_session', models.AutoField(primary_key=True, serialize=False)),
                ('session_date', models.DateTimeField()),
                ('id_expedient', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Sessions', to='psychologist.expedient')),
            ],
        ),
        migrations.CreateModel(
            name='OBSERVATIONS',
            fields=[
                ('id_observation', models.AutoField(primary_key=True, serialize=False)),
                ('observation_description', models.TextField(max_length=255)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('id_session', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='Observations', to='psychologist.session')),
            ],
        ),
        migrations.CreateModel(
            name='TICKET',
            fields=[
                ('id_ticket', models.AutoField(primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('state', models.CharField(default='pending', max_length=55)),
                ('google_access_token', models.CharField(blank=True, max_length=255, null=True)),
                ('google_resfresh_token', models.CharField(blank=True, max_length=255, null=True)),
                ('expires_at', models.DateTimeField(blank=True, null=True)),
                ('id_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
