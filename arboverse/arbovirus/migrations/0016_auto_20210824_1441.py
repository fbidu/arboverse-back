# Generated by Django 3.1.1 on 2021-08-24 14:41

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('arbovirus', '0015_bloodmeal_feedingperiod_habitat_landscape_location_vectorgenus'),
    ]

    operations = [
        migrations.CreateModel(
            name='VectorFamily',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='VectorOrder',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField()),
            ],
        ),
        migrations.AddField(
            model_name='vectorspecies',
            name='blood_meal',
            field=models.ManyToManyField(to='arbovirus.BloodMeal'),
        ),
        migrations.AddField(
            model_name='vectorspecies',
            name='feeding_period',
            field=models.ManyToManyField(to='arbovirus.FeedingPeriod'),
        ),
        migrations.AddField(
            model_name='vectorspecies',
            name='habitat',
            field=models.ManyToManyField(to='arbovirus.Habitat'),
        ),
        migrations.AddField(
            model_name='vectorspecies',
            name='landscape',
            field=models.ManyToManyField(to='arbovirus.Landscape'),
        ),
        migrations.AddField(
            model_name='vectorspecies',
            name='location',
            field=models.ManyToManyField(to='arbovirus.Location'),
        ),
        migrations.AlterField(
            model_name='vectorspecies',
            name='genus',
            field=models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.RESTRICT, to='arbovirus.vectorgenus'),
        ),
        migrations.CreateModel(
            name='VirusVector',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('main_vector', models.BooleanField(blank=True, null=True)),
                ('vector', models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.RESTRICT, to='arbovirus.vectorspecies')),
                ('virus', models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.RESTRICT, to='arbovirus.virus')),
            ],
        ),
        migrations.CreateModel(
            name='VectorSubFamily',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField()),
                ('family', models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.RESTRICT, to='arbovirus.vectorfamily')),
            ],
        ),
        migrations.AddField(
            model_name='vectorfamily',
            name='order',
            field=models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.RESTRICT, to='arbovirus.vectororder'),
        ),
        migrations.AddField(
            model_name='vectorgenus',
            name='family',
            field=models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.RESTRICT, to='arbovirus.vectorfamily'),
        ),
        migrations.AddField(
            model_name='vectorgenus',
            name='sub_family',
            field=models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.RESTRICT, to='arbovirus.vectorsubfamily'),
        ),
        migrations.AddField(
            model_name='vectorspecies',
            name='virus',
            field=models.ManyToManyField(related_name='virus', through='arbovirus.VirusVector', to='arbovirus.Virus'),
        ),
    ]
