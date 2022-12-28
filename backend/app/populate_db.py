from app.models import Company, Offer, User, Comment
from django.contrib.auth.hashers import make_password, check_password

import csv

def populate_companies():
    reader = csv.reader(open('data/Company.csv', 'r'))
    next(reader, None)  # skip the headers

    for row in reader:
        id_,name,email,password,description,location = row
        company = Company(
            id=id_,
            name=name,
            email=email,
            password=password,
            description=description,
            location=location
        )
        company.save()

def populate_offers():
    reader = csv.reader(open('data/Offer.csv', 'r'))
    next(reader, None)  # skip the headers

    for row in reader:
        id_,company_id,role,title,description,salary_h,hours_per_week,area,location,years_xp,work_model,contract_type,date_expires = row
        offer = Offer(
            id=id_,
            company_id=company_id,
            role=role,
            title=title,
            description=description,
            salary_h=salary_h,
            hours_per_week=hours_per_week,
            area=area,
            location=location,
            years_xp=years_xp,
            work_model=work_model,
            contract_type=contract_type,
            date_expires=date_expires
        )
        offer.save()

def populate_users():
    reader = csv.reader(open('data/User.csv', 'r'))
    next(reader, None)  # skip the headers

    for row in reader:
        id_,first_name,last_name,email,password = row
        user = User(
            id=id_,
            first_name=first_name,
            last_name=last_name,
            email=email,
            password=make_password(password)
        )
        user.save()

def populate_comments():
    reader = csv.reader(open('data/Comment.csv', 'r'))
    next(reader, None)  # skip the headers

    for row in reader:
        id_,company_id,user_id,rating,text = row
        comment = Comment(
            id=id_,
            company_id=company_id,
            user_id=user_id,
            rating=rating,
            text=text
        )
        comment.save()
        company = Company.objects.get(id=company_id)
        if comment.rating != '0':
            company.num_ratings += 1
            company.avg_rating = (company.avg_rating * (company.num_ratings - 1) + int(rating)) / company.num_ratings
            company.save()

populate_companies()
populate_offers()
populate_users()
populate_comments()
