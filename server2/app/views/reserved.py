from django.shortcuts import redirect, render
from django.contrib.auth.hashers import make_password
from app.models import *
from app.forms import *


# ---------------- RESERVED AREA ----------------
def reserved(request):
    if "session_data" not in request.session:
        return redirect("/login")

    session_data = request.session["session_data"]

    if session_data["type"] == "company":
        return company_area(request, session_data)

    if session_data["type"] == "user":
        return user_area(request, session_data)


def user_area(request, session_data):
    try:
        user = User.objects.get(email=session_data["email"])
    except:
        return render(request, "error.html", {"error": "This account does not exist in the database"})

    context = {
        "session": session_data,
        "user": user
    }
    return render(request, "reserved.html", context)


def company_area(request, session_data):
    try:
        company = Company.objects.get(email=session_data["email"])
    except:
        return render(request, "error.html", {"error": "This account does not exist in the database"})

    context = {
        "session": session_data,
        "company": company
    }
    return render(request, "reserved.html", context)


# ---------------- EDIT ACCOUNT ----------------
def edit(request):
    if "session_data" not in request.session:
        return redirect("/login")

    session_data = request.session["session_data"]

    if session_data["type"] == "company":
        return edit_company(request, session_data)

    if session_data["type"] == "user":
        return edit_user(request, session_data)


def edit_user(request, session_data):
    user = User.objects.get(email=session_data["email"])
    form_data = {
        "first_name": user.first_name,
        "last_name": user.last_name,
        "email": user.email,
        "password": None
    }

    if request.method == "POST":
        form = UserRegisterForm(request.POST)
        if form.is_valid():

            email = form.cleaned_data["email"]
            if len(User.objects.filter(email=email)) == 1 and request.session["session_data"]["email"] != email:
                return render(request, "edit.html",
                              {"error_email": True, "form": UserRegisterForm(form_data), "session": session_data})

            user.first_name = form.cleaned_data["first_name"]
            user.last_name = form.cleaned_data["last_name"]
            user.email = email
            user.password = make_password(form.cleaned_data["password"])
            user.save()

            # update session data
            request.session["session_data"] = {
                "type": "user",
                "first_name": user.first_name,
                "last_name": user.last_name,
                "email": user.email
            }

            return redirect("/reserved")

    return render(request, "edit.html", {"form": UserRegisterForm(form_data), "session": session_data})


def edit_company(request, session_data):
    company = Company.objects.get(email=session_data["email"])
    form_data = {
        "name": company.name,
        "email": company.email,
        "password": None,
        "location": company.location,
        "description": company.description,
        "location": company.location,
        "logo": None
    }

    if request.method == "POST":
        form = CompanyRegisterForm(request.POST, request.FILES)
        if form.is_valid():

            email = form.cleaned_data["email"]
            if len(Company.objects.filter(email=email)) == 1 and request.session["session_data"]["email"] != email:
                return render(request, "edit.html",
                              {"error_email": True, "form": CompanyRegisterForm(form_data), "session": session_data})

            company.name = form.cleaned_data["name"]
            company.email = email
            company.password = make_password(form.cleaned_data["password"])
            company.location = form.cleaned_data["location"]
            company.description = form.cleaned_data["description"]

            if form.cleaned_data["logo"] is not None:
                company.logo = form.cleaned_data["logo"]

            company.save()

            # update session data
            request.session["session_data"] = {
                "type": "company",
                "name": company.name,
                "email": company.email
            }

            return redirect("/reserved")

    return render(request, "edit.html", {"form": CompanyRegisterForm(form_data), "session": session_data})


# ---------------- VIEWS JUST FOR COMPANIES ----------------
def add_offer(request):
    if "session_data" not in request.session or request.session["session_data"]["type"] != "company":
        return redirect("/login")

    session_data = request.session["session_data"]
    if request.method == "POST":
        form = PostOfferForm(request.POST)
        print(request.POST)

        if form.is_valid():
            session_data = request.session["session_data"]
            company = Company.objects.get(email=session_data["email"])

            offer = form.save(commit=False)
            offer.company = company
            offer.save()

            return redirect("/reserved")

    return render(request, "add_offer.html", {"form": PostOfferForm(), "session": session_data})


def company_offers(request):
    if "session_data" not in request.session or request.session["session_data"]["type"] != "company":
        return redirect("/login")

    session_data = request.session["session_data"]
    company = Company.objects.get(email=session_data["email"])
    offers = Offer.objects.filter(company=company)

    return render(request, "company_offers.html", {"offers": offers, "reserved": True, "session": session_data})


def company_comments(request):
    if "session_data" not in request.session or request.session["session_data"]["type"] != "company":
        return redirect("/login")

    session_data = request.session["session_data"]
    company = Company.objects.get(email=session_data["email"])
    comments = Comment.objects.filter(company=company)
    return render(request, "company_comments.html", {"comments": comments, "session": session_data})


def edit_offer(request, offer_id):
    if "session_data" not in request.session or request.session["session_data"]["type"] != "company":
        return redirect("/login")

    session_data = request.session["session_data"]
    offer = Offer.objects.get(id=offer_id)

    if request.method == "POST":
        form = PostOfferForm(request.POST, instance=offer)

        if form.is_valid():

            if "delete" in request.POST:
                offer.delete()

            elif "save" in request.POST:
                offer = form.save(commit=False)
                offer.company = Company.objects.get(email=session_data["email"])
                offer.save()

        return redirect("/reserved")

    return render(request, "edit_offer.html", {"form": PostOfferForm(instance=offer), "session": session_data, "offer": offer})
