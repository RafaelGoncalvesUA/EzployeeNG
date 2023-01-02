export interface CompanyInterface {
    id: number;
    name: string;
    email: string;
    description: string;
    location: string;
    logo: null;
    avg_rating: number;
    num_ratings: number;
    fav: boolean;
}

export class Company {
    id: number;
    name: string;
    email: string;
    description: string;
    location: string;
    logo: null;
    avg_rating: number;
    num_ratings: number;
    fav: boolean;
    
    constructor(company: CompanyInterface) {
        this.id = company.id;
        this.name = company.name;
        this.email = company.email;
        this.description = company.description;
        this.location = company.location;
        this.logo = company.logo;
        this.avg_rating = company.avg_rating;
        this.num_ratings = company.num_ratings;
        this.fav = company.fav;
    }
}
