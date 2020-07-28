from django.contrib import admin
from .models import User_own,chat,Todo

# Register your models here.
admin.site.register(User_own)
admin.site.register(chat)
admin.site.register(Todo)
