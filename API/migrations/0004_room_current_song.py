# Generated by Django 4.1.1 on 2022-10-31 14:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0003_alter_room_code'),
    ]

    operations = [
        migrations.AddField(
            model_name='room',
            name='current_song',
            field=models.CharField(max_length=50, null=True),
        ),
    ]
