from django.urls import path
from . import views

urlpatterns = [
    path("api/v1/level", views.LevelListCreate.as_view()),
    path("api/v1/level/", views.LevelListCreate.as_view()),
    path("api/v1/level/reset_db/", views.ResetDatabase.as_view()),
]
