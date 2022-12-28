from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from app.serializers import *
from app.models import *

# @api_view(['GET'])
# @authentication_classes([TokenAuthentication])
# @permission_classes([IsAuthenticated])
def get_comments(request):
    company_id = int(request.GET['id'])
    comments = Comment.objects.filter(company_id=Company.objects.get(id=company_id))
    serializer = CommentSerializer(comments, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


# @api_view(['POST'])
def post_comment(request):
    serializer = CommentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# @api_view(['PUT'])
def put_comment(request):
    comment_id = int(request.GET['id'])
    comment = Comment.objects.get(id=comment_id)
    serializer = CommentSerializer(comment, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# @api_view(['DELETE'])
def delete_comment(request):
    comment_id = int(request.GET['id'])
    comment = Comment.objects.get(id=comment_id)
    comment.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def ws_comments(request):
    try:
        if request.method == 'GET':
            return get_comments(request)
        elif request.method == 'POST':
            return post_comment(request)
        elif request.method == 'PUT':
            return put_comment(request)
        elif request.method == 'DELETE':
            return delete_comment(request)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)