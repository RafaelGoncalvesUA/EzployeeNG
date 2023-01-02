export interface OfferInterface {
    id: number;
    title: string;
    description: string;
    salary_h: number;
    hours_per_week: number;
    role: string;
    area: string;
    location: string;
    years_xp: string;
    work_model: string;
    contract_type: string;
    date_posted: string;
    date_expires: string;
    is_active: boolean;
    company: number;
    fav: boolean;
}


export class Offer {
    id: number;
    title: string;
    description: string;
    salary_h: number;
    hours_per_week: number;
    role: string;
    area: string;
    location: string;
    years_xp: string;
    work_model: string;
    contract_type: string;
    date_posted: string;
    date_expires: string;
    is_active: boolean;
    company: number;
    fav: boolean;

    constructor(data: OfferInterface) {
        this.id = data.id;
        this.title = data.title;
        this.description = data.description;
        this.salary_h = data.salary_h;
        this.hours_per_week = data.hours_per_week;
        this.role = data.role;
        this.area = data.area;
        this.location = data.location;
        this.years_xp = data.years_xp;
        this.work_model = data.work_model;
        this.contract_type = data.contract_type;
        this.date_posted = data.date_posted;
        this.date_expires = data.date_expires;
        this.is_active = data.is_active;
        this.company = data.company;
        this.fav = data.fav;
    }

}