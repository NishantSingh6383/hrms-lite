from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from django.urls import reverse
from accounts.models import User
from .models import Employee, Attendance
from .serializers import EmployeeSerializer, AttendanceSerializer
from accounts.serializers import UserEmpSerializer
import tempfile

# Create your tests here.
class EmployeeListRetrieveUpdateViewTest(TestCase):
    def setUp(self):
        self.client = APIClient()

        self.user = User.objects.create_user(email='testuser@gmail.com', password='password')
        self.user.is_hr = True
        self.user.save()

        # Authenticate the client with the user
        self.client.force_authenticate(user=self.user)

        self.employee1 = Employee.objects.create(
            user=self.user,
            first_name='John',
            last_name='Doe',
            position='Engineer',
            phone='1234567890',
            education='Bachelor',
            status='Active',
            employee_type='PART_TIME',
            gender='Male'
            # No image provided
        )
        self.employee2 = Employee.objects.create(
            user=self.user,
            first_name='Jane',
            last_name='Smith',
            position='Manager',
            phone='+9876543210',
            education='Master',
            status='Active',
            employee_type='PART_TIME',
            gender='Female'
            # No image provided
        )

    def normalize_image_url(self, data):
        for employee in data:
            if 'image' in employee and employee['image'].startswith('http://testserver'):
                employee['image'] = employee['image'].replace('http://testserver', '')
        return data

    def test_list_employees(self):
        url = reverse('employee-list-create')
        response = self.client.get(url)
        employees = Employee.objects.all()
        serializer = EmployeeSerializer(employees, many=True)
        normalized_response_data = self.normalize_image_url(response.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(normalized_response_data, serializer.data)

    def test_retrieve_employee(self):
        url = reverse('employee-detail-update', kwargs={'pk': self.employee1.pk})
        response = self.client.get(url)
        employee = Employee.objects.get(pk=self.employee1.pk)
        serializer = EmployeeSerializer(employee)
        normalized_response_data = self.normalize_image_url([response.data])[0]
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(normalized_response_data, serializer.data)

    def test_update_employee(self):
        url = reverse('employee-detail-update', kwargs={'pk': self.employee1.pk})
        data = {
            'first_name': 'Updated John',
            'position': 'Senior Engineer',
            'status': 'NotActive',
        }
        response = self.client.patch(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.employee1.refresh_from_db()
        self.assertEqual(self.employee1.first_name, 'Updated John')
        self.assertEqual(self.employee1.position, 'Senior Engineer')
        self.assertEqual(self.employee1.status, 'NotActive')





class CreateUserAndEmployeeViewTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(email='testuser@gmail.com', password='password')
        self.user.is_hr = True
        self.user.save()
        self.client.force_authenticate(user=self.user)

    def test_create_user_and_employee_view(self):
        url = reverse('create-user-employee')
        
        
            
        data = {
            'user[email]': 'newuser@example.com',
            'user[username]': 'newuser',
            'user[password]': 'newpassword',
            'employee[first_name]': 'New',
            'employee[last_name]': 'User',
            'employee[position]': 'Intern',
            'employee[phone]': '+1122334455',
            'employee[education]': 'High School',
            'employee[status]': 'Active',
            'employee[employee_type]': 'PART_TIME',
            'employee[gender]': 'Female',
            
        }
            
            
        response = self.client.post(url, data, format='multipart')        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)





class AttendanceViewSetTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(email='testuser@gmail.com', password='password')
        self.user.is_hr = True
        self.user.save()
        self.client.force_authenticate(user=self.user)

    def test_attendance_view_set(self):
        url = reverse('attendance-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

