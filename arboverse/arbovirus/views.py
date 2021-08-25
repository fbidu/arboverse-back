# Create your views here.
from django.shortcuts import render,get_object_or_404

from arboverse.arbovirus.models import  Virus

from django.db.models import Q

def search(request):

    results = []

    if request.method == "GET":

        query = request.GET.get('search')

        if query == '':

            query = 'Abadina'
        query = 'Abadina'
        print(query)
        results = Virus.objects.filter(name__icontains=query)

    return render(request, 'pages/arboverse.html', {'results': results})