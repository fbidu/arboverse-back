# Create your views here.
# views.py
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response

from arboverse_updated.models import Virus, VirusVector, VectorSpecies
from arboverse_updated.serializers import VirusSerializer, VectorSerializer, VectorSpeciesSerializer
import logging
logger = logging.getLogger(__name__)


class VirusViewSet(viewsets.ModelViewSet):
    queryset = Virus.objects.all()
    serializer_class = VirusSerializer


class VectorViewSet(viewsets.ModelViewSet):
    queryset = VirusVector.objects.all()
    serializer_class = VectorSerializer


class VectorSpeciesSet(viewsets.ModelViewSet):
    queryset = VectorSpecies.objects.all()
    serializer_class = VectorSpeciesSerializer


print(Virus.objects.all().count())
print(VirusVector.objects.all().count())
