from django.shortcuts import render, redirect
from app.models import *
from app.forms import *
from django.db.models.functions import Lower


def companies(request, name, rating, order):
    session_ = False
    if "session_data" in request.session:
        session_ = request.session["session_data"]["type"]
    
    if request.method == "POST":
        form = SearchCompanyForm(request.POST)
        if form.is_valid():
            data = form.cleaned_data
            if data['name'] == '':
                data['name'] = 'all'
            return redirect("companies",name=data["name"], rating=data["rating"], order=data["order"])

    elif request.method == "GET":
        order_ = [
            Lower('name'),
            Lower('name').desc(),
            'avg_rating',
            '-avg_rating',
            '-num_ratings',
            '-num_ratings',
        ]
        if name == "all":
            name = ""
        form = SearchCompanyForm()
        companies = Company.objects.filter(name__icontains=name, avg_rating__gte=rating).order_by(order_[order])

        for company in companies:
            company.avg_rating = f"{company.avg_rating:.2f}"
            if session_ != "user":
                company.fav = False
            else:
                company.fav = company in User.objects.get(email=request.session["session_data"]["email"])\
                                        .fav_companies.all()

        return render(request, "companies.html", {"companies": companies, "form": form, "session": session_})