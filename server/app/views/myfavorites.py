from django.shortcuts import render, redirect
from app.models import *
from app.forms import *

def myfavorites(request):
    if "session_data" not in request.session or request.session["session_data"]["type"] != "user":
        return redirect("/")

    user = User.objects.get(email=request.session["session_data"]["email"])
    fav_companies = user.fav_companies.all()
    fav_offers = user.fav_offers.all()

    companies = []
    for fav_company in fav_companies:
        company = fav_company # id
        company.avg_rating = f"{company.avg_rating:.2f}"
        company.fav = True
        companies.append(company)

    offers = []
    for fav_offer in fav_offers:
        offer = fav_offer # id
        offer.fav = True
        offers.append(offer)

    return render(request, "myfavorites.html", {"companies": companies, "offers": offers, "session": "user"})