import { Reply } from './Reply';

export class Comment {
    id: number;
    rating: number;
    time: string;
    text: string;
    company: number;
    user: number;
    img_url: string;
    name: string;
    replies: Reply[];
}
