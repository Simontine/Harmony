import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { NgFor, CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bottom-nav',
  // Import necessary directives and CommonModule (since we're still using *ngFor for now)
  imports: [RouterLink, RouterLinkActive, CommonModule], 
  standalone: true, 
  templateUrl: './bottom-nav.component.html',
  styleUrl: './bottom-nav.component.scss'
})
export class BottomNavComponent implements OnInit {
  // Use the actual route paths as the target
  navItems = [
    { target: '', icon: 'home.png', alt: 'Home', isActive: true },
    { target: '/saved', icon: 'bookmark-ribbon--v1.png', alt: 'Saved', isActive: false },
    { target: '/analytics', icon: 'combo-chart--v1.png', alt: 'Analytics', isActive: false },
    { target: '/user', icon: 'user.png', alt: 'Profile', isActive: false }
  ];

  // Store the currently active route path for manual checks
  currentRoute: string = '';
  private routerSubscription: Subscription | undefined;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // 1. Initialize currentRoute based on the initial URL
    this.currentRoute = this.router.url;
    this.updateActiveState(this.currentRoute);

    // 2. Subscribe to router events to update active state on navigation
    this.routerSubscription = this.router.events.pipe(
      // Only listen to successful navigation end events
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentRoute = event.urlAfterRedirects;
      this.updateActiveState(this.currentRoute);
    });
  }

  ngOnDestroy(): void {
    // Clean up subscription when the component is destroyed
    this.routerSubscription?.unsubscribe();
  }
  
  /**
   * Updates the isActive property based on the current URL.
   * This is used for custom styling beyond what routerLinkActive provides.
   * @param url The current URL path.
   */
  updateActiveState(url: string): void {
    this.navItems.forEach(item => {
      // Check if the current URL matches the target route exactly
      item.isActive = url === item.target;
    });
  }

  /**
   * Navigates to the specified route path.
   * @param path The route path to navigate to.
   */
  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}