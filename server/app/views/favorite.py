from django.shortcuts import render, redirect
from app.models import *
from app.forms import *

# favorite/action/type/id
# action = add/remove
# type = company/offer


def favorite(request, action, type, id):

    if "session_data" not in request.session or request.session["session_data"]["type"] != "user":
        return redirect("/")

    if action not in ["add", "remove"] or type not in ["company", "offer"]:
        return render(request, "error.html", {"error": "Ação inválida."})
        
    user = User.objects.get(email=request.session["session_data"]["email"])

    if type == "company":
        try:
            company = Company.objects.get(id=id)
        except:
            return render(request, "error.html", {"error": "Empresa não encontrada."})

        if action == "add":

            if company not in user.fav_companies.all():
                user.fav_companies.add(company)
            else:
                return render(request, "error.html", {"error": "Empresa já favoritada."})
        elif action == "remove":
            user.fav_companies.remove(company)

    elif type == "offer":
        try:
            offer = Offer.objects.get(id=id)
        except:
            return render(request, "error.html", {"error": "Oferta não encontrada."})

        if action == "add":
            if offer not in user.fav_offers.all():
                user.fav_offers.add(offer)
        elif action == "remove":
            user.fav_offers.remove(offer)

    return redirect(request.META.get('HTTP_REFERER', '/'))
    