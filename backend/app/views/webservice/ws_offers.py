from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from app.serializers import *
from app.models import *
from django.db.models.functions import Lower
from app.security import *

# @api_view(['GET'])
def get_offers(request):

    if 'id' in request.GET:
        offer_id = int(request.GET['id'])
        offer = Offer.objects.get(id=offer_id)
        serializer = OfferSerializer(offer)
        return Response(serializer.data, status=status.HTTP_200_OK)

    elif 'company' in request.GET:
        company_id = int(request.GET['company'])
        offers = Offer.objects.filter(company_id=company_id)
        serializer = OfferSerializer(offers, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    else:
        if (
            'title' in request.GET
            and 'min' in request.GET
            and 'max' in request.GET
            and 'years' in request.GET
            and 'model' in request.GET
            and 'type' in request.GET
            and 'order' in request.GET
        ):
            title = request.GET['title']
            salary_min = int(request.GET['min'])
            salary_max = int(request.GET['max'])
            years_ranges = request.GET.getlist('years')
            work_models = request.GET.getlist('model')
            contract_types = request.GET.getlist('type')
            order = int(request.GET['order'])

            order_ = [
                Lower('title'),
                Lower('title').desc(),
                'salary_h',
                '-salary_h',
                'date_posted',
                '-date_posted',
                'date_expires',
                '-date_expires',
            ]

            offers = Offer.objects.filter(
                title__icontains=title,
                salary_h__gte=salary_min,
                salary_h__lte=salary_max,
                years_xp__in=years_ranges,
                work_model__in=work_models,
                contract_type__in=contract_types,
            ).order_by(order_[order])

        else:
            offers = Offer.objects.all()

        serializer = OfferSerializer(offers, many=True)

        faved_offers = []
        if 'user_id' in request.GET:
            faved_offers = User.objects.get(id=int(request.GET['user_id'])).fav_offers.all()
        ids = [offer.id for offer in faved_offers]
        for offer in serializer.data:
            offer['fav'] = offer['id'] in ids

        return Response(serializer.data, status=status.HTTP_200_OK)


# @api_view(['POST'])
def post_offer(request):
    serializer = OfferSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# @api_view(['PUT'])
def put_offer(request):
    offer_id = int(request.GET['id'])
    offer = Offer.objects.get(id=offer_id)
    serializer = OfferSerializer(offer, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# @api_view(['DELETE'])
def delete_offer(request):
    offer_id = int(request.GET['id'])
    offer = Offer.objects.get(id=offer_id)
    offer.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST', 'PUT', 'DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated | IsGetRequest])
def ws_offers(request):
    try:
        if request.method == 'GET':
            return get_offers(request)
        elif request.method == 'POST':
            return post_offer(request)
        elif request.method == 'PUT':
            return put_offer(request)
        elif request.method == 'DELETE':
            return delete_offer(request)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

