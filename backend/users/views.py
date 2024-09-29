from django.contrib.auth import login, logout, authenticate
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from .api.serializers import UserRegisterSerializer, UserSerializer
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny

class UserViewSet(GenericViewSet):
    serializer_class = UserSerializer
    authentication_classes = [SessionAuthentication]
    permission_classes = [AllowAny]

    @action(detail=False, methods=['post'], serializer_class=UserRegisterSerializer)
    def register(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        login(request, user)
        return Response({
            'user': UserSerializer(user).data,
            '訊息': '用戶註冊成功並已登錄'
        }, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['post'])
    def login(self, request):
        username, password = request.data.get('username'), request.data.get('password')
        if not username or not password:
            return Response({"詳細": "用戶名和密碼都是必填項。"}, status=status.HTTP_400_BAD_REQUEST)
        
        user = authenticate(request, username=username, password=password)
        if user:
            login(request, user)
            return Response({"詳細": "登錄成功。", "用戶": self.get_serializer(user).data})
        return Response({"詳細": "無效的憑證。"}, status=status.HTTP_401_UNAUTHORIZED)

    @action(detail=False, methods=['post'], permission_classes=[IsAuthenticated])
    def logout(self, request):
        logout(request)
        return Response({'訊息': '成功登出'})

    @action(detail=False, methods=['get'])
    def me(self, request):
        if request.user.is_authenticated:
            return Response(self.get_serializer(request.user).data)
        return Response({"詳細": "用戶未登入"})