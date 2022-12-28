from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from app.serializers import *
from app.models import *
from django.contrib.auth.hashers import make_password, check_password
from django.contrib.auth.models import User

@api_view(['POST'])
def login(request):
    try:
        email = request.data['email']
        password = request.data['password']

        user = User.objects.get(email=email)
        if user is not None:
            if check_password(password, user.password):
                serializer = UserSerializer(user)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_401_UNAUTHORIZED)

        company = Company.objects.get(email=email)
        if company is not None:
            if check_password(password, company.password):
                serializer = CompanySerializer(company)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_401_UNAUTHORIZED)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def register_user(request):
    try:
        request.data['password'] = make_password(request.data['password'])
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            try:
                API_user = User.objects.get(username=user.email)
            except User.DoesNotExist:
                API_user = User.objects.create_user(username=user.email, password=user.password)
            token = Token.objects.get(user=API_user)
            response = serializer.data
            response['token'] = token.key
            return Response(response, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def register_company(request):
    try:
        request.data['password'] = make_password(request.data['password'])
        serializer = CompanySerializer(data=request.data)
        if serializer.is_valid():
            company = serializer.save()
            try:
                API_user = User.objects.get(username=company.email)
            except User.DoesNotExist:
                API_user = User.objects.create_user(username=company.email, password=company.password)
            token = Token.objects.get(user=API_user)
            response = serializer.data
            response['token'] = token.key
            return Response(response, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)