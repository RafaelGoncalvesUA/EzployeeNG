from django import forms
from app.models import *


# ----------- register forms -----------
class UserRegisterForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ("first_name", "last_name", "email", "password")

        labels = {
            "first_name": "Nome",
            "last_name": "Apelido",
            "email": "Email",
            "password": "Password"
        }


class CompanyRegisterForm(forms.ModelForm):
    class Meta:
        model = Company
        fields = ("name", "email", "password", "location", "description", "logo")

        labels = {
            "name": "Nome",
            "email": "Email",
            "password": "Password",
            "location": "Localização",
            "description": "Descrição",
            "logo": "Logo"
        }


# # ----------- login forms -----------
class LoginForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ("email", "password")

        labels = {
            "email": "Email",
            "password": "Password",
        }


# # ----------- post forms -----------
class PostOfferForm(forms.ModelForm):
    class Meta:
        model = Offer
        fields = ("title", "description", "salary_h", "hours_per_week", "role", "area",
                  "location", "years_xp", "work_model", "contract_type", "date_expires")

        labels = {
            "title": "Título",
            "description": "Descrição",
            "salary_h": "Salário/hora",
            "hours_per_week": "Horas/semana",
            "role": "Cargo",
            "area": "Área",
            "location": "Localização",
            "years_xp": "Anos de experiência",
            "work_model": "Modelo de trabalho",
            "contract_type": "Tipo de contrato",
            "date_expires": "Validade"
        }


class CommentForm(forms.Form):
    text = forms.CharField(
        required=True,
        label="Insira um Comentário",
        widget=forms.Textarea()
    )
    select = [
        (0, "Selecione"),
        (1, "1 estrela"),
        (2, "2 estrelas"),
        (3, "3 estrelas"),
        (4, "4 estrelas"),
        (5, "5 estrelas"),
    ]
    rating = forms.ChoiceField(choices=select, required=False, label="Avaliação")


# ----------- search forms -----------

class SearchCompanyForm(forms.Form):
    name = forms.CharField(max_length=40, required=False, label="Nome da empresa")
    select1 = [
        (0, "Selecione"),
        (1, "1 estrela"),
        (2, "2 estrelas"),
        (3, "3 estrelas"),
        (4, "4 estrelas"),
        (5, "5 estrelas"),
    ]
    rating = forms.ChoiceField(choices=select1, required=False, label="Avaliação")
    select2 = [
        (0, "↑ Alfabetica"),
        (1, "↓ Alfabetica"),
        (2, "↑ Avaliação"),
        (3, "↓ Avaliação"),
        (4, "↑ Numero de avaliações"),
        (5, "↓ Numero de avaliações"),
    ]
    order = forms.ChoiceField(choices=select2, required=False, label="Ordenar por")


class SearchOfferForm(forms.Form):
    title = forms.CharField(max_length=50, required=False, initial="", label="Título da oferta")
    salary_max = forms.IntegerField(required=False, initial=300, label="Salário máximo (€/h)")
    salary_min = forms.IntegerField(required=False, initial=0, label="Salário mínimo (€/h)")
    # role client side
    # area client side
    # location client side
    select1 = [
        (0, "0-3 anos"),
        (1, "3-5 anos",),
        (2, "5-10 anos"),
        (3, "10+ anos"),
    ]
    years_xp = forms.MultipleChoiceField(
        choices=select1,
        required=False,
        widget=forms.CheckboxSelectMultiple,
        initial=[0, 1, 2, 3],
        label="Anos de experiência"
    )
    # checkbox multiple choice
    select2 = [
        (0, "Remoto"),
        (1, "Presencial"),
        (2, "Híbrido")
    ]
    work_model = forms.MultipleChoiceField(
        choices=select2,
        widget=forms.CheckboxSelectMultiple,
        required=False,
        initial=[0, 1, 2],
        label="Modelo de trabalho"
    )
    select3 = [
        (0, "Tempo inteiro"),
        (1, "Meia jornada"),
        (2, "Estágio")
    ]
    contract_type = forms.MultipleChoiceField(
        choices=select3,
        required=False,
        initial=[0, 1, 2],
        widget=forms.CheckboxSelectMultiple,
        label="Tipo de contrato",
    )
    select4 = [
        (0, "↑ Título"),
        (1, "↓ Título"),
        (2, "↑ Salário"),
        (3, "↓ Salário"),
        (4, "↑ Data de postagem"),
        (5, "↓ Data de postagem"),
        (6, "↑ Data de expiração"),
        (7, "↓ Data de expiração")
    ]
    order = forms.ChoiceField(
        choices=select4,
        required=False,
        label="Ordenar por"
    )

# query set
#https://medium.com/swlh/django-forms-for-many-to-many-fields-d977dec4b024