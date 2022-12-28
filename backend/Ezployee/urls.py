from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from app.views.website import companies, index, auth, reserved, company, favorite, myfavorites, offers

from app.views.webservice import ws_auth, ws_offers, ws_companies, ws_comments, ws_offer_favs, ws_company_favs, ws_account


urlpatterns = [
    path('admin/', admin.site.urls),

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
