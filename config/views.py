# Create your views here.
# views.py
from rest_framework import viewsets
from .models import Virus, VirusVector
from .serializers import VirusSerializer, VectorSerializer

class VirusViewSet(viewsets.ModelViewSet):
    queryset = Virus.objects.all()
    serializer_class = VirusSerializer


class VectorViewSet(viewsets.ModelViewSet):
    queryset = VirusVector.objects.all()
    serializer_class = VectorSerializer
