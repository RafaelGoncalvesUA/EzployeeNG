from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from app.serializers import *
from app.models import *

@api_view(['PUT'])
def put_account(request):
    try:
        email = request.data['email']
        
        user = User.objects.get(email=email)
        if user is not None:
            serializer = UserSerializer(user, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)

        company = Company.objects.get(email=email)
        if company is not None:
            serializer = CompanySerializer(company, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)