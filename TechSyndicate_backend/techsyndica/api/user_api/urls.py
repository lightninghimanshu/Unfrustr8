from django.urls import path
from api.user_api.views import (
UserListView,api_create_user_view,api_create_chat_view,ChatListView,
TodoListView,api_create_todo_view,todo_delete_view,todo_status_view,
test_chat_view,
)
urlpatterns = [

    path('all_users/', UserListView.as_view(), name='api-login'),
    path('sign_up/',api_create_user_view,name = 'signup'),
    path('chat_list/<str:team>/',ChatListView.as_view(),name = 'chat_list'),
    path('post_chat/', api_create_chat_view,name = 'new_chat'),

    path('Todo_list/<str:team>/',TodoListView.as_view(),name = 'Todo_list'),
    path('Todo_update/<str:text>/<str:team>/', todo_status_view, name='todo-update'),
    path('Todo_delete/<str:text>/<str:team>/', todo_delete_view, name='todo-delete'),
    path('Todo_create/', api_create_todo_view,name = 'new_todo'),




]
