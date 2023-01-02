from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from app.serializers import *
from app.models import *
from app.security import *

# @api_view(['GET'])
# @authentication_classes([TokenAuthentication])
# @permission_classes([IsAuthenticated])
def get_replies(request):
    comment_id = int(request.GET['id'])
    replies = Reply.objects.filter(comment_id=Comment.objects.get(id=comment_id))
    serializer = ReplySerializer(replies, many=True)
    for reply in serializer.data:
        pic = User.objects.get(id=reply['user']).profile_pic
        reply['img_url'] = None if not pic else pic.url
        reply['name'] = User.objects.get(id=reply['user']).first_name + ' ' + User.objects.get(id=reply['user']).last_name
    return Response(serializer.data, status=status.HTTP_200_OK)

# @api_view(['POST'])
def post_reply(request):
    serializer = ReplySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['PUT'])
def put_reply(request):
    reply_id = int(request.GET['id'])
    reply = Reply.objects.get(id=reply_id)
    serializer = ReplySerializer(reply, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['DELETE'])
def delete_reply(request):
    reply_id = int(request.GET['id'])
    reply = Reply.objects.get(id=reply_id)
    reply.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST', 'PUT', 'DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated | IsGetRequest])
def ws_replies(request):
    try:
        if request.method == 'GET':
            return get_replies(request)
        elif request.method == 'POST':
            return post_reply(request)
        elif request.method == 'PUT':
            return put_reply(request)
        elif request.method == 'DELETE':
            return delete_reply(request)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)