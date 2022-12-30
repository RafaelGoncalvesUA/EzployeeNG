from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from app.serializers import *
from app.models import *
from app.security import *

# @api_view(['GET'])
def get_offer_favs(request):    
    user_id = int(request.GET['id'])
    user = User.objects.get(id=user_id)
    offer_favs= user.fav_offers.all()
    serializer = OfferSerializer(offer_favs, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
   

# @api_view(['POST'])
def post_offer_fav(request):
    user = User.objects.get(id=request.data['user_id'])
    offer = Offer.objects.get(id=request.data['offer_id'])
    user.fav_offers.add(offer)
    return Response(status=status.HTTP_201_CREATED)

# @api_view(['DELETE'])
def delete_offer_fav(request):
    user = User.objects.get(id=request.data['user_id'])
    offer = Offer.objects.get(id=request.data['offer_id'])
    user.fav_offers.remove(offer)
    return Response(status=status.HTTP_200_OK)

@api_view(['GET', 'POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def ws_offer_favs(request):
    try:
        if request.method == 'GET':
            return get_offer_favs(request)
        elif request.method == 'POST':
            return post_offer_fav(request)
        elif request.method == 'DELETE':
            return delete_offer_fav(request)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)