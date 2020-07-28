from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from api.models import User_own,chat,Todo

from api.user_api.serializers import UserSerializer,ChatSerializer,TodoSerializer,TodoSerializer_put
from rest_framework.generics import ListAPIView

@api_view(['GET',])
def test_chat_view(request,team):
    
    Chat = chat()
    try :
        chats = Chat.objects.filter(team_id= team)
    except Chat.DoesNotExist:
        return Response(status = status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        data = []
        for chats_2 in chats:
            serializer = ChatSerializer(chats_2)
            data.append(serializer.data)

        return Response(data)

@api_view(['POST',])

def api_create_user_view(request):

    user = User_own()

    if request.method == 'POST':
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'status':'success'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@api_view(['POST',])
def api_create_chat_view(request):

    chat_text = chat()

    if request.method == 'POST':
        serializer = ChatSerializer(chat_text, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'status':'success'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT',])
def todo_status_view(request,text,team):
    try :
        todo = Todo.objects.filter(team_id=team).get(todo_text=text)
        
    except Todo.DoesNotExist:
        return Response(status = status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = TodoSerializer_put(todo,data = request.data)
        data = {}
        if serializer.is_valid():
            serializer.save()
            data["success"] = "Update successfull"
            return Response(data = data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE',])
def todo_delete_view(request, text,team):
    try :
        todo = Todo.objects.filter(team_id=team).get(todo_text=text)
        
    except Todo.DoesNotExist:
        return Response(status = status.HTTP_404_NOT_FOUND)

    if request.method == 'DELETE':
        operation = todo.delete()
        data = {}
        if operation:
            data["success"] = "delete successfull"
        else:
            data["faliure"] = "delete failed"
        return Response(data = data)
@api_view(['POST',])
def api_create_todo_view(request):

    todo = Todo()

    if request.method == 'POST':
        serializer = TodoSerializer(todo, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'status':'success'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class UserListView(ListAPIView):
    def get_queryset(self):
        return User_own.objects.all()
    serializer_class = UserSerializer

class ChatListView(ListAPIView):
    lookup_url_kwarg = "team"
    def get_queryset(self):
        team = self.kwargs.get(self.lookup_url_kwarg)
        return chat.objects.filter(team_id=team).order_by('-pk')
    serializer_class = ChatSerializer
class TodoListView(ListAPIView):
    lookup_url_kwarg = "team"

    def get_queryset(self):
        team = self.kwargs.get(self.lookup_url_kwarg)

        return Todo.objects.filter(team_id=team)
    serializer_class = TodoSerializer
