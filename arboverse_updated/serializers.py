from rest_framework import serializers
from .models import (
    Borning,
    VectorSpecies,
    FeedingPeriod,
    BloodMeal,
    Landscape,
    Habitat,
    Location,
    VectorGenus,
    Virus,
    VirusVector,
    VectorFamily,
    VectorSubFamily,
)


class VirusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Virus
        fields = ['name']


class VirusAllSerializer(serializers.ModelSerializer):
    class Meta:
        model = Virus
        fields = '__all__'


class VectorSpeciesSerializer(serializers.ModelSerializer):
    class Meta:
        model = VectorSpecies
        fields = ['name']


class VectorSerializer(serializers.ModelSerializer):
    vector_id = VectorSpeciesSerializer(many=True, read_only=True)
    virus_id = VirusSerializer(many=True, read_only=True)

    class Meta:
        model = VirusVector
        fields = '__all__'


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


class VectorFamilySerializer(serializers.ModelSerializer):  # Corrected Serializer
    class Meta:
        model = VectorFamily
        fields = '__all__'


class VectorSubFamilySerializer(serializers.ModelSerializer):  # Corrected Serializer
    class Meta:
        model = VectorSubFamily
        fields = '__all__'


class VectorGenusSerializer(serializers.ModelSerializer):
    family = VectorFamilySerializer(read_only=True)
    sub_family = VectorSubFamilySerializer(read_only=True)

    class Meta:
        model = VectorGenus
        fields = '__all__'


class VirusVectorSerializer(serializers.ModelSerializer):
    vector = VectorSpeciesSerializer(read_only=True)  # Use the VectorSpeciesSerializer for the vector field

    class Meta:
        model = VirusVector
        fields = ['vector', 'main_vector']  # Include `vector` and `main_vector`

    def get_vector_borne(self, obj):
        """
        Get the vector data through the VirusVector relation.
        This will fetch all related `VirusVector` instances for the current virus
        and serialize them properly.
        """
        virus_vectors = VirusVector.objects.filter(virus=obj)  # Get all VirusVector entries for this Virus
        return VirusVectorSerializer(virus_vectors, many=True).data  # Serialize all VirusVector instances


class BorningSerializer(serializers.ModelSerializer):
    class Meta:
        model = Borning
        fields = '__all__'


class VirusDetailedSerializer(serializers.ModelSerializer):
    genus = VectorGenusSerializer(read_only=True)
    family = VectorFamilySerializer(read_only=True)
    vectors = serializers.SerializerMethodField()  # Make sure to include the virus vector data
    borning = BorningSerializer(read_only=True)

    class Meta:
        model = Virus
        fields = ['id', 'name', 'specie', 'family', 'genus', 'borning', 'diseases', 'country',
                  'abbreviation', 'collection_date', 'genome_type', 'enveloped', 'reference_strain',
                  'genome_length_nt', 'host_amplifier', 'human_fatal_disease', 'veterinary_diseases',
                  'veterinary_fatal_diseases', 'no_cases', 'level_of_disease', 'vaccine', 'vero_cells',
                  'C6_36_cells', 'cpe_vero', 'plaques_vero', 'animal_model', 'sals_level', 'vectors']

    def get_vectors(self, obj):
        """
        Get the vector data through the VirusVector relation.
        This will fetch all related `VirusVector` instances for the current virus
        and serialize them properly.
        """
        virus_vectors = VirusVector.objects.filter(virus=obj)  # Get all VirusVector entries for this Virus
        return VirusVectorSerializer(virus_vectors, many=True).data  # Serialize all VirusVector instances


class VectorSpeciesAllSerializer(serializers.ModelSerializer):
    feeding_period = FeedingPeriodSerializer(many=True, read_only=True)
    blood_meal = BloodMealSerializer(many=True, read_only=True)
    landscape = LandscapeSerializer(many=True, read_only=True)
    habitat = HabitatSerializer(many=True, read_only=True)
    location = LocationSerializer(many=True, read_only=True)
    genus = VectorGenusSerializer(read_only=True)
    virus = VirusDetailedSerializer(many=True, read_only=True)  # Use detailed virus serializer

    class Meta:
        model = VectorSpecies
        fields = '__all__'
