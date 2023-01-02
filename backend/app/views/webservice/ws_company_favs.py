from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from app.serializers import *
from app.models import *
from app.security import *

# @api_view(['GET'])
def get_company_favs(request):
    user_id = int(request.GET['id'])
    user = User.objects.get(id=user_id)
    company_favs = user.fav_companies.all()
    serializer = CompanySerializer(company_favs, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
   

# @api_view(['POST'])
def post_company_fav(request):
    user = User.objects.get(id=request.data['user_id'])
    company = Company.objects.get(id=request.data['company_id'])
    if company in user.fav_companies.all():
        return Response({'error': 'Company already in favorites'}, status=status.HTTP_400_BAD_REQUEST)
    user.fav_companies.add(company)
    return Response(status=status.HTTP_201_CREATED)

# @api_view(['DELETE'])
def delete_company_fav(request):
    user = User.objects.get(id=request.data['user_id'])
    company = Company.objects.get(id=request.data['company_id'])
    user.fav_companies.remove(company)
    return Response(status=status.HTTP_200_OK)


@api_view(['GET', 'POST', 'DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def ws_company_favs(request):
    try:
        if request.method == 'GET':
            return get_company_favs(request)
        elif request.method == 'POST':
            return post_company_fav(request)
        elif request.method == 'DELETE':
            return delete_company_fav(request)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)