from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from app.serializers import *
from app.models import *
from app.security import *
from django.contrib.auth.hashers import make_password

# @api_view(['PUT'])
def put_user_account(request):
    user_id = request.GET['id']
    user = User.objects.get(id=user_id)
    serializer = UserSerializer(user, data=request.data)
    serializer['password'] = make_password(serializer['password'])
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# @api_view(['PUT'])
def put_company_account(request):
    company_id = request.GET['id']
    company = Company.objects.get(id=company_id)
    serializer = CompanySerializer(company, data=request.data)
    serializer['password'] = make_password(serializer['password'])
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# @api_view(['GET'])
def get_user_account(request):
    user_id = request.GET['id']
    user = User.objects.get(id=user_id)
    serializer = UserGeneralInfoSerializer(user)
    return Response(serializer.data, status=status.HTTP_200_OK)


# @api_view(['GET'])
def get_company_account(request):
    company_id = request.GET['id']
    company = Company.objects.get(id=company_id)
    serializer = CompanyGeneralInfoSerializer(company)
    return Response(serializer.data, status=status.HTTP_200_OK)



@api_view(['GET', 'PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated | IsGetRequest])
def ws_user_account(request):
    try:
        if request.method == 'GET':
            return get_user_account(request)
        elif request.method == 'PUT':
            return put_user_account(request)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated | IsGetRequest])
def ws_company_account(request):
    try:
        if request.method == 'GET':
            return get_company_account(request)
        elif request.method == 'PUT':
            return put_company_account(request)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)