# Generated by Django 5.1.1 on 2024-10-08 14:38

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0002_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='PostReplies',
            fields=[
                ('replies_id', models.AutoField(primary_key=True, serialize=False)),
                ('description', models.TextField()),
                ('replies_date', models.DateField(auto_now_add=True)),
                ('like_count', models.IntegerField(default=0)),
                ('id_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='replies_as_id_user', to=settings.AUTH_USER_MODEL)),
                ('post_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='replies', to='post.post')),
            ],
        ),
        migrations.DeleteModel(
            name='PostResponse',
        ),
    ]
