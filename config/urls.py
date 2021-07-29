from django.conf import settings
from django.urls import include, path
from django.conf.urls.static import static
from django.contrib import admin
from django.views.generic import TemplateView
from django.views import defaults as default_views

urlpatterns = [
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
        "dataset/",
        TemplateView.as_view(template_name="pages/dataset.html"),
        name="dataset",
    ),
    path(
        "research/",
        TemplateView.as_view(template_name="pages/research.html"),
        name="research",
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
        "news/",
        TemplateView.as_view(template_name="pages/news.html"),
        name="news",
    ),
    # Django Admin, use {% url 'admin:index' %}
    path(settings.ADMIN_URL, admin.site.urls),
    # User management
    path(
        "users/",
        include("arboverse.users.urls", namespace="users"),
    ),
    path("accounts/", include("allauth.urls")),
    # Your stuff: custom urls includes go here
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

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
