import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Reply } from 'src/app/classes/Reply';
import { Input } from '@angular/core';
import { User } from 'src/app/classes/User';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css']
})
export class ReplyComponent implements OnInit {

  @Input() reply: Reply;
  user: User;

  constructor() { }

  ngOnInit(): void {
    this.getUser(this.reply.user);
  }

  getUser(id: number) {
    //TODO: API call to get user by id
    this.user = {id: 1, first_name: "John", last_name: "Doe", email: "john@gmail.com", profile_pic: "https://www.w3schools.com/howto/img_avatar.png"};
  }

}
