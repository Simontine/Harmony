import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- New Import

@Component({
  selector: 'app-bottom-nav',
  imports: [CommonModule], // <-- Added CommonModule here
  standalone: true,
  templateUrl: './bottom-nav.component.html',
  styleUrl: './bottom-nav.component.scss'
})
export class BottomNavComponent {
  // Component logic remains the same
  navItems = [
    { target: 'home', icon: 'home.png', alt: 'Home', isActive: true },
    { target: 'saved', icon: 'bookmark-ribbon--v1.png', alt: 'Saved', isActive: false },
    { target: 'analytics', icon: 'combo-chart--v1.png', alt: 'Analytics', isActive: false },
    { target: 'profile', icon: 'user.png', alt: 'Profile', isActive: false }
  ];

  

  activeView: string = 'home';

  setActiveView(target: string): void {
    this.activeView = target;
    this.navItems.forEach(item => {
      item.isActive = item.target === target;
    });
  }
}