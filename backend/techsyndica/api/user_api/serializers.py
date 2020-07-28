from api.models import User_own,chat,Todo
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User_own
        fields = ['username','password','team_id']
class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = chat
        fields = ['chat_text','team_id']
class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ['todo_text','checked','team_id']
class TodoSerializer_put(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ['checked']
