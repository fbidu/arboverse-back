# Create your views here.
# views.py
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response

from arboverse_updated.models import Virus, VirusVector, VectorSpecies
from arboverse_updated.serializers import VirusSerializer, VectorSerializer, VectorSpeciesSerializer, \
    VectorSpeciesAllSerializer, VirusAllSerializer
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


@api_view(['GET'])
def get_vector_by_name(request):
    name = request.GET.get('name')
    if name:
        queryset = VectorSpecies.objects.filter(name__iexact=name)
    else:
        queryset = VectorSpecies.objects.all()
    serializer = VectorSpeciesAllSerializer(queryset, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_virus_by_name(request):
    name = request.GET.get('name')
    if name:
        queryset = Virus.objects.filter(name__iexact=name)
    else:
        queryset = Virus.objects.all()
    serializer = VirusAllSerializer(queryset, many=True)
    return Response(serializer.data)
