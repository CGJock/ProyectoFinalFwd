# Generated by Django 5.1.1 on 2024-09-26 16:34

import django.db.models.deletion
import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='users',
            old_name='usert_birth_date',
            new_name='birth_date',
        ),
        migrations.RenameField(
            model_name='users',
            old_name='user_email',
            new_name='email',
        ),
        migrations.RenameField(
            model_name='users',
            old_name='user_first_name',
            new_name='first_name',
        ),
        migrations.RenameField(
            model_name='users',
            old_name='user_last_name',
            new_name='last_name',
        ),
        migrations.RenameField(
            model_name='users',
            old_name='user_name',
            new_name='name',
        ),
        migrations.RenameField(
            model_name='users',
            old_name='user_phone_number',
            new_name='phone_number',
        ),
        migrations.RemoveField(
            model_name='student',
            name='rol_type',
        ),
        migrations.AddField(
            model_name='users',
            name='id_rol',
            field=models.ForeignKey(default=2, on_delete=django.db.models.deletion.CASCADE, to='user.rol'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='users',
            name='state',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='users',
            name='crated_at',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AlterField(
            model_name='users',
            name='updated_at',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
