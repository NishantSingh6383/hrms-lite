from rest_framework import serializers
from .models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls,user):
        token = super().get_token(user)

        token['email'] = user.email
        token['username'] = user.username

        try:
            token['is_hr'] = user.is_hr
        except:
            token['is_hr'] = False

        return token    





class UserEmpSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email','username', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user    