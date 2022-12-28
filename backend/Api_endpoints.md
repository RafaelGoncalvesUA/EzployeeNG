## Endpoints

| Endpoint | Method | Body | Description |
| --- | --- | --- | --- |
| /api/login/ | POST | { "username": "string", "password": "string" } | Login |
| /api/user/register/ | POST | UserSerializer | Register |
| /api/company/register/ | POST | CompanySerializer | Register |
| /api/offers/ | GET | - | ?id=x -> get offer with id x, else get all offers (with filters)?title=&min=0&max=300&years=0-3 anos&years=3-5 anos&model=Remoto&type=Tempo inteiro&order=0|
| /api/offers/ | POST | OfferSerializer | Create offer |
| /api/offers/ | PUT | OfferSerializer | ?id=x -> update offer with id x |
| /api/offers/ | DELETE | - | ?id=x -> delete offer with id x |
| /api/companies/ | GET | - | ?id=x -> get company with id x, else get all companies (with filters) ?name=&rating=0&order=0|
| /api/companies/ | POST | CompanySerializer | Create company |
| /api/companies/ | PUT | CompanySerializer | ?id=x -> update company with id x |
| /api/companies/ | DELETE | - | ?id=x -> delete company with id x |
| /api/comments/ | GET | - | ?id=x -> get comments from company with id x |
| /api/comments/ | POST | CommentSerializer | Create comment |
| /api/comments/ | PUT | CommentSerializer | ?id=x -> update comment with id x |
| /api/comments/ | DELETE | - | ?id=x -> delete comment with id x |
| /api/offer/favs/ | GET | - | ?id=x -> get favourite offers from user with id x |
| /api/offer/favs/ | POST | { "offer_id": "int", "user_id": "int" } | Add offer to user's favorites |
| /api/offer/favs/ | DELETE| { "offer_id": "int", "user_id": "int" } | Remove offer from user's favorites |
| /api/company/favs/ | GET | - | ?id=x -> gets favourite companies from user with id x |
| /api/company/favs/ | POST | { "company_id": "int", "user_id": "int" } | Add company to user's favorites |
| /api/company/favs/ | DELETE| { "company_id": "int", "user_id": "int" } | Remove company from user's favorites |
| /api/account/ | PUT | UserSerializer | update user account |

TODO:
- [] filters
- [] security
- [] ajustar PUT (tirar o ?id=x ?)