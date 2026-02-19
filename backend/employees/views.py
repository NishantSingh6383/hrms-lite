from rest_framework import generics, viewsets
from rest_framework.permissions import AllowAny
from accounts.permissions import IsHR
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from django.db import transaction, IntegrityError
from accounts.serializers import  UserEmpSerializer
from .serializers import EmployeeSerializer,AttendanceSerializer
from .models import Employee,Attendance
# Create your views here.





class EmployeeListCreateView(generics.ListCreateAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    permission_classes = [AllowAny]

  


class EmployeeDetailUpdateView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    permission_classes = [AllowAny]

     



class CreateUserAndEmployeeView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        

        user_data = {
            'email': request.data.get('user[email]'),
            'username': request.data.get('user[username]'),
            'password': request.data.get('user[password]')
        }
        employee_data = {
            'first_name': request.data.get('employee[first_name]'),
            'last_name': request.data.get('employee[last_name]'),
            'position': request.data.get('employee[position]'),
            'phone': request.data.get('employee[phone]'),
            'education': request.data.get('employee[education]'),
            'status': request.data.get('employee[status]'),
            'employee_type': request.data.get('employee[employee_type]'),
            'gender': request.data.get('employee[gender]'),
            'image': request.data.get('employee[image]')
        }
            

        
        try:
            with transaction.atomic():
                user_serializer = UserEmpSerializer(data=user_data)
                if user_serializer.is_valid():
                    user = user_serializer.save()
                else:
                    raise IntegrityError(user_serializer.errors)

                
                employee_data['user'] = user.id 
                employee_serializer = EmployeeSerializer(data=employee_data)
                if employee_serializer.is_valid():
                    employee_serializer.save()
                else:
                    raise IntegrityError(employee_serializer.errors)

                return Response({
                    'user': user_serializer.data,
                    'employee': employee_serializer.data
                }, status=status.HTTP_201_CREATED)

        except IntegrityError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": "An unexpected error occurred."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




class AttendanceViewSet(viewsets.ModelViewSet):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer
    permission_classes = [AllowAny]




class Dashboard(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        employee_count = Employee.objects.all().count()
        attendance_count = Attendance.objects.all().count()

        return Response({
                    'employee_count': employee_count,
                    'attendance_count': attendance_count
                }, status=status.HTTP_201_CREATED)
