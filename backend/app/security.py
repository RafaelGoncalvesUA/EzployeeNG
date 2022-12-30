from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated, BasePermission

class IsGetRequest(BasePermission):
    def has_permission(self, request, view):
        return request.method == 'GET'