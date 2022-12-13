from django.shortcuts import render, redirect
from app.models import *
from app.forms import *
from django.contrib.auth.hashers import make_password, check_password


def login(request):
    #check if is logged in
    if "session_data" in request.session:
        return redirect("/")

    if request.method == "POST":
        form = LoginForm(request.POST)
        if form.is_valid():
            email = form.cleaned_data["email"]
            password = form.cleaned_data["password"]

            # check users table
            try:
                user = User.objects.get(email=email)
            except User.DoesNotExist:
                user = None

            if user is not None:
                if check_password(password, user.password):
                    request.session["session_data"] = {
                        "type": "user",
                        "first_name": user.first_name,
                        "last_name": user.last_name,
                        "email": user.email
                    }
                    return redirect("/")
                return render(request, "login.html", {"error_pass": True, "form": LoginForm()})

            # check companies table
            try:
                company = Company.objects.get(email=email)
            except Company.DoesNotExist:
                company = None

            if company is not None:
                if check_password(password, company.password):
                    request.session["session_data"] = {
                        "type": "company",
                        "name": company.name,
                        "email": company.email
                    }
                    return redirect("/")
                return render(request, "login.html", {"error_pass": True, "form": LoginForm()})
            return render(request, "login.html", {"error_account": True, "form": LoginForm()})
    return render(request, "login.html", {"form": LoginForm()})


def logout(request):
    # check if user is logged in
    if "session_data" in request.session:
        del request.session["session_data"]
    else:
        print("There is no one logged in")
    return redirect("/")


def register(request):
    if request.method == "POST":
        form = UserRegisterForm(request.POST)
        if form.is_valid():

            # check if this email already exists
            email_ = form.cleaned_data["email"]
            if len(User.objects.filter(email=email_)) != 0 or len(Company.objects.filter(email=email_)) != 0:
                return render(request, "register.html", {"error_account": True, "form": UserRegisterForm()})

            user = form.save(commit=False)
            user.password = make_password(user.password)
            user.save()
            return redirect("/login")
        return render(request, "register.html", {"form": UserRegisterForm()})
    return render(request, "register.html", {"form": UserRegisterForm()})


def register_company(request):
    if request.method == "POST":
        form = CompanyRegisterForm(request.POST, request.FILES)
        if form.is_valid():

            email_ = form.cleaned_data["email"]
            if len(Company.objects.filter(email=email_)) != 0 or len(User.objects.filter(email=email_)) != 0:
                return render(request, "register_company.html", {"error_account": True, "form": CompanyRegisterForm()})

            company = form.save(commit=False)
            company.password = make_password(company.password)
            company.save()
            return redirect("/login")
        return render(request, "register_company.html", {"form": CompanyRegisterForm()})
    return render(request, "register_company.html", {"form": CompanyRegisterForm()})
