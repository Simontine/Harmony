import { Component, Input } from '@angular/core';
import { BottomNavComponent } from "../bottom-nav/bottom-nav.component";
import { NavbarComponent } from "../navbar/navbar.component";
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  imports: [BottomNavComponent, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  

  geo: boolean = false;
  geoFence: string = "Disabled";
  rescrict: boolean = false;
  fenceRadius: number = 20;
  petName: string = "Buddy";

  latitude: number | null = null;
  longitude: number | null = null;
  distance: number | null = null;
  bodyHeat: number | null = null;
  heartRate: number | null = null;
  name:string | null = null;

  latitudeStr: number = -25.5236;
  longitudeStr: number = 28.1123;

  location = '7982/93 aganang str, soshanguve, pretoria';
  

  constructor(private router: Router) { }

  img1Color = '000000';
  img2Color = 'BEBEC1';

  changeColor(img: number) {
    if (img === 1) {
      this.img1Color = this.img1Color === '000000' ? 'FF0000' : '000000';
    }
    if (img === 2) {
      this.img2Color = this.img2Color === 'BEBEC1' ? '00AAFF' : 'BEBEC1';
    }
  }

  onRadiusChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.fenceRadius = Number(input.value);
  }

  async clearGeo() {
    this.geo = false;
    this.geoFence = "Not Active";
    this.rescrict = false;
  }

  async toggleGeo() {
    this.geo = !this.geo;
    if (this.geo) {
      this.geoFence = "Active";
      this.rescrict = true;
      this.fenceRadius = this.fenceRadius;
      console.log("Geofencing activated with radius:", this.fenceRadius);
    }

  }

  goBack() {
    window.history.back();
  }

  

  async trackPet() {
    if (this.latitudeStr !== null && this.longitudeStr !== null) {
      
      const mapUrl = `https://www.google.com/maps/search/?api=1&query=${this.latitudeStr},${this.longitudeStr}`;
      
      window.open(mapUrl, '_blank');
      
      console.log('Opening external map for coordinates:', this.latitudeStr, this.longitudeStr);
    } else {
      console.warn('Cannot track pet: Latitude or Longitude is not yet available.');
      alert('Location data is not yet available. Please wait a moment.');
    }
  }

  goToPet(){
    this.router.navigate(['/pet']);
  }

}
