from django.contrib import admin
from .models import Contact

@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'created_at')  # columns to show in admin list
    list_filter = ('created_at',)                   # filters in sidebar
    search_fields = ('name', 'email', 'message')   # search box fields
    readonly_fields = ('created_at',)              # prevent editing creation time

