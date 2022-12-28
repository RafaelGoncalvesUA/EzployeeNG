from django.shortcuts import render, redirect, HttpResponse
from app.models import *
from app.forms import *
from django.db.models.functions import Lower


def offers(request):
    session_ = False
    if "session_data" in request.session:
        session_ = request.session["session_data"]["type"]

    lst = []
    if request.method == "POST":

        order_ = [
            Lower('title'),
            Lower('title').desc(),
            'salary_h',
            '-salary_h',
            'date_posted',
            '-date_posted',
            'date_expires',
            '-date_expires',
        ]

        form = SearchOfferForm(request.POST)
        if form.is_valid():
            data = form.cleaned_data
            years_ranges = Offer.YearsXpRanges.values
            work_models = Offer.WorkModel.values
            contract_types = Offer.ContractType.values

            valid_years_ranges = [years_ranges[y] for y in range(len(years_ranges))
                                  if str(y) in data['years_xp']]
            valid_work_models = [work_models[w] for w in range(len(work_models))
                                 if str(w) in data['work_model']]
            valid_contract_types = [contract_types[c] for c in range(len(contract_types))
                                    if str(c) in data['contract_type']]

            lst = Offer.objects.filter(
                title__icontains=data["title"],
                salary_h__gte=data["salary_min"],
                salary_h__lte=data["salary_max"],
                years_xp__in=valid_years_ranges,
                work_model__in=valid_work_models,
                contract_type__in=valid_contract_types,
            ).order_by(order_[int(data["order"])])

            for offer in lst:
                if len(offer.title) > 31:
                    offer.title = offer.title[:31] + "..."
                if session_ != "user":
                    offer.fav = False
                else:
                    offer.fav = offer in User.objects.get(email=request.session["session_data"]["email"]) \
                        .fav_offers.all()

    else:
        form = SearchOfferForm()
        lst = Offer.objects.all().order_by('title')
        for offer in lst:
            if len(offer.title) > 31:
                offer.title = offer.title[:31] + "..."
            if session_ != "user":
                offer.fav = False
            else:
                offer.fav = offer in User.objects.get(email=request.session["session_data"]["email"]) \
                    .fav_offers.all()
    return render(request, "offers.html", {"form": form, "session": session_, "offers": lst})


def offer_detail(request, offer_id):
    session = False
    if "session_data" in request.session:
        session = True

    try:
        offer = Offer.objects.get(id=offer_id)
        return render(request, "offer.html", {"offer": offer, "session": session})
    except:
        return render(request, "error.html", {"error": "This offer does not exist."})
