# Generated by Django 3.1.1 on 2021-07-19 22:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("arbovirus", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="virus",
            name="C6_36_cells",
            field=models.BooleanField(blank=True),
        ),
        migrations.AlterField(
            model_name="virus",
            name="genome_length_nt",
            field=models.IntegerField(blank=True),
        ),
        migrations.AlterField(
            model_name="virus",
            name="human_fatal_disease",
            field=models.BooleanField(blank=True),
        ),
        migrations.AlterField(
            model_name="virus",
            name="vero_cells",
            field=models.BooleanField(blank=True),
        ),
        migrations.AlterField(
            model_name="virus",
            name="veterinary_diseases",
            field=models.BooleanField(blank=True),
        ),
        migrations.AlterField(
            model_name="virus",
            name="veterinary_fatal_diseases",
            field=models.BooleanField(blank=True),
        ),
    ]
