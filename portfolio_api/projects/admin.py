from django.contrib import admin
from .models import Project

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'demo', 'source')

    def demo(self, obj):
        return obj.live_url

    def source(self, obj):
        return obj.github_url
