from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from app.serializers import *
from app.models import *

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
    user.fav_companies.add(company)
    return Response(status=status.HTTP_201_CREATED)


@api_view(['GET', 'POST'])
def ws_company_favs(request):
    try:
        if request.method == 'GET':
            return get_company_favs(request)
        elif request.method == 'POST':
            return post_company_fav(request)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)