from django.shortcuts import render
from app.models import *
from app.forms import *

def index(request):
    session_ = False
    if "session_data" in request.session:
        session_= True
    
    return render(request, "index.html", {"session": session_})
        
    