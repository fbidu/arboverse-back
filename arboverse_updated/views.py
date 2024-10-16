# Create your views here.
# views.py
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response

from arboverse_updated.models import Virus, VirusVector
from arboverse_updated.serializers import VirusSerializer, VectorSerializer
import logging
logger = logging.getLogger(__name__)


class VirusViewSet(viewsets.ModelViewSet):
    queryset = Virus.objects.all()
    serializer_class = VirusSerializer


class VectorViewSet(viewsets.ModelViewSet):
    queryset = VirusVector.objects.all()
    serializer_class = VectorSerializer


print(Virus.objects.all().count())
print(VirusVector.objects.all().count())

"""# Create your views here.
@api_view(['GET'])
def get_virus(request):
    app = Virus.objects.all()
    serializer = VirusSerializer(app, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_vector(request):
    app = VirusVector.objects.all()
    serializer = VectorSerializer(app, many=True)
    return Response(serializer.data)"""
