from rest_framework import serializers
from .models import Virus, VirusVector, VectorSpecies


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


class VectorSpeciesAllSerializer(serializers.ModelSerializer):
    class Meta:
        model = VectorSpecies
        fields = '__all__'
