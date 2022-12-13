from django.shortcuts import render, redirect
from app.models import *
from app.forms import *

def company(request, id):
    session_ = False
    if "session_data" in request.session:
        session_= request.session["session_data"]["type"]

    if request.method == "GET":
        try:

            company = Company.objects.get(id=id)
            comments = Comment.objects.filter(company_id=id)
            company.avg_rating = f"{company.avg_rating:.2f}"
            
            return render(request, "company_page.html", {
                "company": company,
                "comments": comments,
                "form": CommentForm(),
                "session": session_
            })
        except:
            return render(request, "error.html", {"error": "Empresa não encontrada.", "session": session_})

    elif request.method == "POST":
        form = CommentForm(request.POST)
        if form.is_valid():
            data = form.cleaned_data
            user = User.objects.get(email=request.session["session_data"]["email"])
            comment = Comment.objects.create(
                text=data["text"],
                rating=data["rating"],
                user=user,
                company= Company.objects.get(id=id),
            )
            comment.save()
            company = Company.objects.get(id=id)

            if comment.rating != '0':
                company.num_ratings += 1
                company.avg_rating = (company.avg_rating * (company.num_ratings - 1) + int(data["rating"])) / company.num_ratings
                company.save()

        return redirect("company", id=id)


    