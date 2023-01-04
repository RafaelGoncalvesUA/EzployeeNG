from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from app.serializers import *
from app.models import *
from app.security import *

# @api_view(['GET'])
# @authentication_classes([TokenAuthentication])
# @permission_classes([IsAuthenticated])
def get_comments(request):
    company_id = int(request.GET['id'])
    comments = Comment.objects.filter(company_id=Company.objects.get(id=company_id))
    serializer = CommentSerializer(comments, many=True)

    for comment in serializer.data:
        pic = User.objects.get(id=comment['user']).profile_pic
        comment['img_url'] = None if not pic else pic.url
        comment['name'] = User.objects.get(id=comment['user']).first_name + ' ' + User.objects.get(id=comment['user']).last_name
        comment['replies'] = [
            {
                'id': reply.id,
                'text' : reply.text,
                'name': reply.user.first_name + ' ' + reply.user.last_name,
                'img_url' : None if not pic else reply.user.profile_pic.url,
                'time': reply.time,
            } for reply in Reply.objects.filter(comment_id=comment['id'])
        ]

    return Response(serializer.data, status=status.HTTP_200_OK)


# @api_view(['POST'])
def post_comment(request):
    serializer = CommentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        if serializer.data['rating'] != 0:
            company = Company.objects.get(id=serializer.data['company'])  
            company.num_ratings += 1
            company.avg_rating = (company.avg_rating * (company.num_ratings - 1) + int(serializer.data["rating"])) / company.num_ratings
            company.save()
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
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated | IsGetRequest])
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