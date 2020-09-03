from django.urls import path, re_path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('<slug>/', views.redirect_user, name='redirect'),
    path('<slug>', views.redirect_user, name='redirect'),
    path('api/get_link/', views.get_link, name='get_link'),
    path('api/get_link', views.get_link, name='get_link'),
    re_path(r'.*', views.unknown_path, name='unknown_path'),
]