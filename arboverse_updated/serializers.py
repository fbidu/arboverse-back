from rest_framework import serializers
from .models import VectorSpecies, FeedingPeriod, BloodMeal, Landscape, Habitat, Location, VectorGenus, Virus, VirusVector


class VirusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Virus
        fields = ['name']


class VectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = VirusVector
        fields = '__all__'


class VectorSpeciesSerializer(serializers.ModelSerializer):
    class Meta:
        model = VectorSpecies
        fields = ['name']


class FeedingPeriodSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeedingPeriod
        fields = '__all__'

class BloodMealSerializer(serializers.ModelSerializer):
    class Meta:
        model = BloodMeal
        fields = '__all__'

class LandscapeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Landscape
        fields = '__all__'

class HabitatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Habitat
        fields = '__all__'

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'

class VectorGenusSerializer(serializers.ModelSerializer):
    class Meta:
        model = VectorGenus
        fields = '__all__'

class VirusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Virus
        fields = '__all__'

class VectorSpeciesAllSerializer(serializers.ModelSerializer):
    feeding_period = FeedingPeriodSerializer(many=True, read_only=True)
    blood_meal = BloodMealSerializer(many=True, read_only=True)
    landscape = LandscapeSerializer(many=True, read_only=True)
    habitat = HabitatSerializer(many=True, read_only=True)
    location = LocationSerializer(many=True, read_only=True)
    genus = VectorGenusSerializer(read_only=True)
    virus = VirusSerializer(many=True, read_only=True)

    class Meta:
        model = VectorSpecies
        fields = '__all__'
