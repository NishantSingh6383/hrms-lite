from django.urls import include, path
from .views import EmployeeListCreateView,EmployeeDetailUpdateView,CreateUserAndEmployeeView,AttendanceViewSet,Dashboard
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'attendance', AttendanceViewSet)


urlpatterns = [
    path('dashboard/', Dashboard.as_view(),),
    path('employee/', EmployeeListCreateView.as_view(),name='employee-list-create'),
    path('employee/<int:pk>/', EmployeeDetailUpdateView.as_view(), name='employee-detail-update'),
    path('create-user-employee/', CreateUserAndEmployeeView.as_view(), name='create-user-employee'),
    path('', include(router.urls)),

   
]


