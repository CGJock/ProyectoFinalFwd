

import django.db.models.deletion
import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('grade', '0002_alter_grade_id_grade'),
        ('rol', '0002_alter_rol_id_rol'),
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
        migrations.CreateModel(
            name='USERS',
            fields=[
                ('id_user', models.AutoField(primary_key=True, serialize=False)),
                ('state', models.BooleanField(default=False)),
                ('dni_number', models.CharField(max_length=9, unique=True)),
                ('username', models.CharField(max_length=100)),
                ('crated_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('birth_date', models.DateField()),
                ('name', models.CharField(max_length=100)),
                ('first_name', models.CharField(max_length=75)),
                ('last_name', models.CharField(max_length=75)),
                ('email', models.EmailField(max_length=100)),
                ('password', models.CharField(max_length=100)),
                ('phone_number', models.CharField(max_length=11)),
                ('id_rol', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='rol.rol')),
            ],
        ),
        migrations.CreateModel(
            name='STUDENT',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('gobernment_subsidy', models.BooleanField()),
                ('scholarship', models.BooleanField()),
                ('uuid', models.UUIDField(null=True, unique=True)),

                ('id_grade', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='grade.grade')),

                ('id_grade', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='students', to='grade.grade')),


            ],
        ),
        migrations.CreateModel(
            name='PSYCHOLOGIST',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('license_code', models.CharField(max_length=100)),
                ('availability', models.BooleanField()),
                ('years_experience', models.IntegerField()),
                ('id_psychologist', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='user.users')),
            ],
        ),
    ]
