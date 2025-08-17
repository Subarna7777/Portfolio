from rest_framework import generics
from .models import Project
from .serializers import ProjectSerializer

class ProjectList(generics.ListAPIView):
    queryset = Project.objects.all().order_by('-created_at')
    serializer_class = ProjectSerializer