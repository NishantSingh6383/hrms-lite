from rest_framework import serializers
from .models import Employee, Attendance


# -------------------------
# Employee Serializer
# -------------------------
class EmployeeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Employee
        fields = "__all__"

    # ✅ UNIQUE EMPLOYEE ID VALIDATION
    def validate_employee_id(self, value):
        """
        Prevent duplicate employee IDs
        """
        # exclude current object during update
        if self.instance:
            if Employee.objects.exclude(pk=self.instance.pk).filter(employee_id=value).exists():
                raise serializers.ValidationError(
                    "Employee ID must be unique. A user with this ID already exists."
                )
        else:
            if Employee.objects.filter(employee_id=value).exists():
                raise serializers.ValidationError(
                    "Employee ID must be unique. A user with this ID already exists."
                )

        return value

    def create(self, validated_data):
        return Employee.objects.create(**validated_data)


# -------------------------
# Attendance Serializer
# -------------------------
class AttendanceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Attendance
        fields = "__all__"
