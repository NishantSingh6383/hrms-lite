from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from accounts.views import MyTokenOptainPairView



urlpatterns = [
    path('user/token/', MyTokenOptainPairView.as_view(), name='token_obtain_pair'),
    path('user/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
   
]
