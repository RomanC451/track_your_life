# Generated by Django 4.1.1 on 2022-09-05 08:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='room',
            old_name='quest_can_pause',
            new_name='guest_can_pause',
        ),
        migrations.RenameField(
            model_name='room',
            old_name='votes_toskip',
            new_name='votes_to_skip',
        ),
    ]
