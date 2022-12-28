from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from app.serializers import *
from app.models import *
from django.db.models import Avg

@api_view(['GET'])
def get_statistics(request):
    try:
        n_users = User.objects.count()
        n_companies = Company.objects.count()
        n_offers = Offer.objects.count()
        n_comments = Comment.objects.count()
        avg_offers_per_company = round(n_offers / n_companies, 2)
        avg_comments_per_offer = round(n_comments / n_offers, 2)
        avg_rating = round(Comment.objects.all().aggregate(Avg('rating'))['rating__avg'], 2)

        serializer = StatisticSerializer(
            {
                'n_users': n_users,
                'n_companies': n_companies,
                'n_offers': n_offers,
                'n_comments': n_comments,
                'avg_offers_per_company': avg_offers_per_company,
                'avg_comments_per_offer': avg_comments_per_offer,
                'avg_rating': avg_rating
            }
        )
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)