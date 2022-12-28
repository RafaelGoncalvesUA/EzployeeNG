from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from app.serializers import *
from app.models import *

# @api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_comments(request):
    try:
        company_id = int(request.GET['id'])
        comments = Comment.objects.filter(company_id=Company.objects.get(id=company_id))
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)


# @api_view(['POST'])
def post_comment(request):
    try:
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def ws_comments(request):
    try:
        if request.method == 'GET':
            return get_comments(request)
        elif request.method == 'POST':
            return post_comment(request)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)