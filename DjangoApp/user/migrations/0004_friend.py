# Generated by Django 5.1.1 on 2024-10-30 15:40

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0003_alter_users_is_active'),
    ]

    operations = [
        migrations.CreateModel(
            name='Friend',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('friend', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='friend_of', to=settings.AUTH_USER_MODEL)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='friends', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'unique_together': {('user', 'friend')},
            },
        ),
    ]
