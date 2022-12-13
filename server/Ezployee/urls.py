from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from app.views import companies, index, auth, reserved, company, favorite, myfavorites, offers


urlpatterns = [
    path('admin/', admin.site.urls),
    path("", index.index, name="index"),
    path("register/", auth.register, name="register"),
    path("register_company/", auth.register_company, name="register_company"),
    path("login/", auth.login, name="login"),
    path("logout/", auth.logout, name="login"),
    path("reserved/", reserved.reserved, name="reserved_area"),
    path("reserved/edit", reserved.edit, name="edit"),
    path("reserved/offer", reserved.add_offer, name="add_offer"),
    path("reserved/offers", reserved.company_offers, name="offers"),
    path("reserved/offers/<int:offer_id>", reserved.edit_offer, name="edit_offer"),
    path("reserved/comments", reserved.company_comments, name="comments"),
    path("companies/<str:name>/<int:rating>/<int:order>/", companies.companies, name="companies"),
    path("company/<int:id>/", company.company, name="company"),
    path("favorite/<str:action>/<str:type>/<int:id>/", favorite.favorite, name="favorite"),
    path("myfavorites/", myfavorites.myfavorites, name="myfavorites"),
    path("offers/<int:offer_id>", offers.offer_detail, name="offer_detail"),
    path("offers/", offers.offers, name="offers")
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
