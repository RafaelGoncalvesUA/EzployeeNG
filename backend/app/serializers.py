from rest_framework import serializers

from app.models import Company, Offer, User, Comment

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'

class OfferSerializer(serializers.ModelSerializer):
    class Meta:
        model = Offer
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'password']

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

class StatisticSerializer(serializers.Serializer):
    n_users = serializers.IntegerField()
    n_companies = serializers.IntegerField()
    n_offers = serializers.IntegerField()
    n_comments = serializers.IntegerField()
    avg_offers_per_company = serializers.FloatField()
    avg_comments_per_offer = serializers.FloatField()
    avg_rating = serializers.FloatField()
    