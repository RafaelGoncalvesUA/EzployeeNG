from django.db import models
from datetime import datetime
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from django.core.exceptions import ValidationError

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)

class Company(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=40)
    email = models.EmailField()
    password = models.CharField(max_length=200) # hash + salt
    description = models.TextField()
    location = models.CharField(max_length=40)
    logo = models.ImageField(upload_to="images/logos", blank=True, null=True) # requires pillow
    avg_rating = models.FloatField(default=0.0, blank=True, null=True)
    num_ratings = models.IntegerField(default=0, blank=True, null=True)

class Offer(models.Model):
    class ContractType(models.TextChoices):
        TEMPO_INTEIRO = "Tempo inteiro"
        MEIA_JORNADA = "Meia jornada"
        ESTAGIO = "Estágio"

    class WorkModel(models.TextChoices):
        REMOTO = "Remoto"
        PRESENCIAL = "Presencial"
        HIBRIDO = "Híbrido"

    class YearsXpRanges(models.TextChoices):
        ZERO_A_TRES = "0-3 anos"
        TRES_A_CINCO = "3-5 anos"
        CINCO_A_DEZ = "5-10 anos"
        DEZ_OU_MAIS = "10+ anos"

    id = models.AutoField(primary_key=True)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    description = models.TextField()
    salary_h = models.DecimalField(max_digits=6, decimal_places=2)
    hours_per_week = models.IntegerField()
    role = models.CharField(max_length=30)
    area = models.CharField(max_length=30)
    location = models.CharField(max_length=30)
    years_xp = models.CharField(max_length=20, choices=YearsXpRanges.choices)
    work_model = models.CharField(max_length=10, choices=WorkModel.choices, default=WorkModel.PRESENCIAL)
    contract_type = models.CharField(max_length=20, choices=ContractType.choices, default=ContractType.TEMPO_INTEIRO)
    date_posted = models.DateField(auto_now_add=True)
    date_expires = models.DateField(blank=True, null=True)
    is_active = models.BooleanField(default=True, null=True)


class User(models.Model):
    id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    email = models.EmailField()
    password = models.CharField(max_length=200) # hash + salt
    profile_pic = models.ImageField(upload_to="images/profile_pics", blank=True, null=True) # requires pillow
    fav_companies = models.ManyToManyField(Company, db_table="app_user_fav_companies")
    fav_offers = models.ManyToManyField(Offer, db_table="app_user_fav_offers")

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Comment(models.Model):
    id = models.AutoField(primary_key=True)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.IntegerField()
    time = models.TimeField(auto_now=datetime.now())
    text = models.TextField()


class Reply(models.Model):
    id = models.AutoField(primary_key=True)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE)
    # author is a user or a company
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    if user is None and company is None:
        raise ValidationError("Reply must have an author")
    time = models.TimeField(auto_now=datetime.now())
    text = models.TextField()