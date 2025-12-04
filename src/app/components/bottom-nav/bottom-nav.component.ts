import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { NgFor, CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bottom-nav',
  imports: [RouterLink, RouterLinkActive, CommonModule], 
  standalone: true, 
  templateUrl: './bottom-nav.component.html',
  styleUrl: './bottom-nav.component.scss'
})
export class BottomNavComponent implements OnInit {
  // --- UPDATED navItems ARRAY ---
  navItems = [
    { target: '/', icon: 'https://img.icons8.com/?size=100&id=1iF9PyJ2Thzo&format=png&color=000000', alt: 'Home', isActive: true },
    { target: '/setting', icon: 'https://img.icons8.com/?size=100&id=cCn0QxQ2NGpW&format=png&color=000000', alt: 'Setting', isActive: false },
    { target: '/pet', icon: 'https://img.icons8.com/?size=100&id=DkOvFLIzvQ4L&format=png&color=000000', alt: 'Analytics', isActive: false },
    { target: '/user', icon: 'https://img.icons8.com/?size=100&id=14736&format=png&color=000000', alt: 'Profile', isActive: false }
  ];
  // ------------------------------

  currentRoute: string = '';
  private routerSubscription: Subscription | undefined;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.currentRoute = this.router.url;
    this.updateActiveState(this.currentRoute);

    this.routerSubscription = this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentRoute = event.urlAfterRedirects;
      this.updateActiveState(this.currentRoute);
    });
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
  }
  
  updateActiveState(url: string): void {
    this.navItems.forEach(item => {
      // Check for exact match, handling the root path '/' correctly
      item.isActive = url === item.target;
    });
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}