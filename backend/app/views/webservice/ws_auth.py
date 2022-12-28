from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from app.serializers import *
from app.models import Company, User as MyUser, Token
from django.contrib.auth.hashers import make_password, check_password
from django.contrib.auth.models import User as API_User

@api_view(['POST'])
def login(request):
    try:
        email = request.data['email']
        password = request.data['password']

        try:
            user = MyUser.objects.get(email=email)
            api_user = API_User.objects.get(username=user.email)
            if check_password(password, user.password):
                serializer = UserSerializer(user)
                token = Token.objects.get(user=api_user)
                response = serializer.data
                del response['password']
                response['token'] = token.key
                response["type"] = "user"
                return Response(response, status=status.HTTP_200_OK)
        except MyUser.DoesNotExist:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        try:
            company = Company.objects.get(email=email)
            api_user = API_User.objects.get(username=company.email)
            if check_password(password, company.password):
                serializer = CompanySerializer(company)
                token = Token.objects.get(user=api_user)
                response = serializer.data
                del response['password']
                response['token'] = token.key
                response["type"] = "company"
                return Response(response, status=status.HTTP_200_OK)
        except Company.DoesNotExist:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        return Response(status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def register_user(request):
    try:
        email_ = request.data['email']

        try:
            MyUser.objects.get(email=email_)
            return Response({"error": "email already exists"}, status=status.HTTP_400_BAD_REQUEST)
        except MyUser.DoesNotExist:
            pass
        
        try:
            Company.objects.get(email=email_)
            return Response({"error": "email already exists"}, status=status.HTTP_400_BAD_REQUEST)
        except Company.DoesNotExist:
            pass

        request.data['password'] = make_password(request.data['password'])
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            try:
                api_user = API_User.objects.get(username=user.email)
            except API_User.DoesNotExist:
                api_user = API_User.objects.create_user(username=user.email, password=user.password)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def register_company(request):
    try:
        email_ = request.data['email']
        try:
            MyUser.objects.get(email=email_)
            return Response({"error": "email already exists"}, status=status.HTTP_400_BAD_REQUEST)
        except MyUser.DoesNotExist:
            pass
        
        try:
            Company.objects.get(email=email_)
            return Response({"error": "email already exists"}, status=status.HTTP_400_BAD_REQUEST)
        except Company.DoesNotExist:
            pass
        
        request.data['password'] = make_password(request.data['password'])
        serializer = CompanySerializer(data=request.data)
        if serializer.is_valid():
            company = serializer.save()
            try:
                api_user = API_User.objects.get(username=company.email)
            except API_User.DoesNotExist:
                api_user = API_User.objects.create_user(username=company.email, password=company.password)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)