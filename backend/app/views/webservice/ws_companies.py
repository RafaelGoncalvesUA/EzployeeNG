from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from app.serializers import *
from app.models import *
from django.db.models.functions import Lower
from app.security import *

# @api_view(['GET'])
def get_companies(request):

    if 'id' in request.GET:
        company_id = int(request.GET['id'])
        company = Company.objects.get(id=company_id)
        serializer = CompanySerializer(company)
        return Response(serializer.data, status=status.HTTP_200_OK)

    else:
        if 'name' in request.GET and 'rating' in request.GET and 'order' in request.GET:
            name = request.GET['name']
            rating = int(request.GET['rating'])
            order = int(request.GET['order'])

            order_ = [
                Lower('name'),
                Lower('name').desc(),
                'avg_rating',
                '-avg_rating',
                '-num_ratings',
                '-num_ratings',
            ]
            companies = Company.objects.filter(name__icontains=name, avg_rating__gte=rating).order_by(order_[order])
        else:
            companies = Company.objects.all()

        serializer = CompanySerializer(companies, many=True)

        faved_companies = []
        if 'user_id' in request.GET:
            faved_companies = User.objects.get(id=int(request.GET['user_id'])).fav_companies.all()
        ids = [c.id for c in faved_companies]
        for company in serializer.data:
            company['fav'] = company['id'] in ids
        return Response(serializer.data, status=status.HTTP_200_OK)


# @api_view(['POST'])
def post_company(request):
    serializer = CompanySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# @api_view(['PUT'])
def put_company(request):
    company_id = int(request.GET['id'])
    company = Company.objects.get(id=company_id)
    serializer = CompanySerializer(company, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# @api_view(['DELETE'])
def delete_company(request):
    company_id = int(request.GET['id'])
    company = Company.objects.get(id=company_id)
    company.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST', 'PUT', 'DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated | IsGetRequest])
def ws_companies(request):
    try:
        if request.method == 'GET':
            return get_companies(request)
        elif request.method == 'POST':
            return post_company(request)
        elif request.method == 'PUT':
            return put_company(request)
        elif request.method == 'DELETE':
            return delete_company(request)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
