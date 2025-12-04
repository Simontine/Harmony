import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  @ViewChild('logoutModal') logoutModal!: ElementRef;

  constructor(private router: Router) {}


  bootstrap: any;

  notifications: number = 13;
  username: string | null = 'Simon Ntini';
  email: string | null = localStorage.getItem('username');
  maskedEmail: string = '';

  maskEmail(email: string | null): string {
    if (!email || !email.includes('@')) return '';
  
    const [user, domain] = email.split('@');
    const firstLetter = user.charAt(0);
  
    return `${firstLetter}*****@${domain}`;
  }

  ngOnInit() {
    this.maskedEmail = this.maskEmail(this.email);
  }

  isModalOpen = true;

logout() {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('username');

  this.isModalOpen = false; // hides modal
  this.router.navigate(['/login']);
}


addDevice(){
  this.router.navigate(['/add']);
}

}
