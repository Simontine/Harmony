import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

  userName: string = 'Simon Ntini';
  email: string = 'simon.ntini@ampl.tech'
}
