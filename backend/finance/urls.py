from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from finance import views

urlpatterns = [
    path('', views.homepageView.as_view()),
    #path('<int:pk>/', views.snippet_detail),
]

urlpatterns = format_suffix_patterns(urlpatterns)