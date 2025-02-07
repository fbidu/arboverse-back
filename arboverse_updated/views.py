# Create your views here.
# views.py
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.views import generic

from arboverse_updated.models import DataUpload, Virus, VirusVector, VectorSpecies
from arboverse_updated.serializers import VirusSerializer, VectorSerializer, VectorSpeciesSerializer, \
    VectorSpeciesAllSerializer, VirusAllSerializer, VirusDetailedSerializer
import logging
logger = logging.getLogger(__name__)


class DataUploadView(generic.DetailView):
    model = DataUpload


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
    serializer = VirusDetailedSerializer(queryset, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_virusvector_by_virus(request):
    name = request.GET.get('name')
    if name:
        queryset = VirusVector.objects.filter(name__iexact=name)
    else:
        queryset = VirusVector.objects.all()
    serializer = VectorSerializer(queryset, many=True)
    return Response(serializer.data)


def upload_dataupdate(request):
    if request.method == "POST":
        form = UploadFileForm(request.POST, request.FILES)
        if form.is_valid():
            # handle_uploaded_file(request.FILES["file"])
            return HttpResponseRedirect("/admin/")
    else:
        form = UploadFileForm()
    return render(request, "upload.html", {"form": form})
