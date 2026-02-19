from .serializers import MyTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
# Create your views here.






class MyTokenOptainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
