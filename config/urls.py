from django.conf import settings
from django.urls import include, path
from django.conf.urls.static import static
from django.contrib import admin
from django.views.generic import TemplateView
from django.views import defaults as default_views
from rest_framework.routers import DefaultRouter
from arboverse_updated import views

router = DefaultRouter()
router.register('virus', views.VirusViewSet, basename="Virus")
router.register('virus-vector', views.VectorViewSet, basename="VirusVector")
router.register('vector-species', views.VectorSpeciesSet, basename="VectorSpecies")
#router.register('vector-search', views.get_vector_by_name, basename="VectorSpeciesSearch")

urlpatterns = ([
    path(
        "",
        TemplateView.as_view(template_name="home.html"),
        name="home",
    ),
    path(
        "arboverse/",
        TemplateView.as_view(template_name="pages/arboverse.html"),
        name="arboverse",
    ),
    path(
        "arbodata/",
        TemplateView.as_view(template_name="pages/arbodata.html"),
        name="arbodata",
    ),
    path(
        "arbodash/",
        TemplateView.as_view(template_name="pages/arbodash.html"),
        name="arbodash",
    ),
    path(
        "publications/",
        TemplateView.as_view(template_name="pages/publications.html"),
        name="publications",
    ),
    path(
        "people/",
        TemplateView.as_view(template_name="pages/collaborators.html"),
        name="people",
    ),
    path(
        "contact/",
        TemplateView.as_view(template_name="pages/contact.html"),
        name="contact",
    ),
    # Django Admin, use {% url 'admin:index' %}
    path(settings.ADMIN_URL, admin.site.urls),
    # User management
    path(
        "users/",
        include("arboverse_updated.users.urls", namespace="users"),
    ),
    path("accounts/", include("allauth.urls")),
    path("api/", include(router.urls)),
    path('api/vector-by-name/', views.get_vector_by_name, name='get-vector-by-name')
    # Your stuff: custom urls includes go here
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
               + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT))

if settings.DEBUG:
    # This allows the error pages to be debugged during development, just visit
    # these url in browser to see how these error pages look like.
    urlpatterns += [
        path(
            "400/",
            default_views.bad_request,
            kwargs={"exception": Exception("Bad Request!")},
        ),
        path(
            "403/",
            default_views.permission_denied,
            kwargs={"exception": Exception("Permission Denied")},
        ),
        path(
            "404/",
            default_views.page_not_found,
            kwargs={"exception": Exception("Page not Found")},
        ),
        path("500/", default_views.server_error),
    ]
    if "debug_toolbar" in settings.INSTALLED_APPS:
        import debug_toolbar

        urlpatterns = [path("__debug__/", include(debug_toolbar.urls))] + urlpatterns
