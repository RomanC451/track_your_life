# Generated by Django 4.1.1 on 2022-10-28 11:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('spotify', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='spotifytoken',
            name='expires_in',
            field=models.DateTimeField(),
        ),
    ]
