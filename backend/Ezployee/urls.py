from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from app.views.website import companies, index, auth, reserved, company, favorite, myfavorites, offers

from app.views.webservice import ws_auth, ws_offers, ws_companies, ws_comments, ws_offer_favs, ws_company_favs, ws_account


urlpatterns = [
    path('admin/', admin.site.urls),

    # website
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
    path("offers/", offers.offers, name="offers"),

    # api
    path("api/login/", ws_auth.login),
    path("api/user/register/", ws_auth.register_user),
    path("api/company/register/", ws_auth.register_company),
    path("api/offers/", ws_offers.ws_offers),
    path("api/companies/", ws_companies.ws_companies),
    path("api/comments/", ws_comments.ws_comments),
    path("api/offer/favs/", ws_offer_favs.ws_offer_favs),
    path("api/company/favs/", ws_company_favs.ws_company_favs),
    path("api/account/", ws_account.put_account),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
