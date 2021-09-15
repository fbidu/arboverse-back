# Create your views here.
import json
from django.http import JsonResponse
from django.shortcuts import render

from arboverse.arbovirus.models import  Virus

def search(request):
    if 'term' in request.GET:
        qs = Virus.objects.filter(name__icontains=request.GET.get('term'))
        viruses = list()
        for virus in qs:
            viruses.append(virus.name)
        return JsonResponse(viruses, safe=False)
        
    results = list()
    query = 'Abadina'
    if request.method == "GET":
        if 'arbovirus-search' in list(request.GET.keys()):
            query = request.GET['arbovirus-search']

        results = Virus.objects.filter(name__icontains=query.strip())
        results = results[0] if len(results) > 0 else ''
        

        

    return render(request, 'pages/arboverse.html', {'query': query, 'result': results})
    