import { Component } from '@angular/core';
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

    // try {
    //   const autoRef = ref(this.db, "sensorData/auto");
    //   await set(autoRef, this.rescrict); // Write 'ON' or 'OFF'
    //   console.log(`Automation state set to: ${this.rescrict}`);
    // } catch (error) {
    //   console.error("Error updating automation state in Firebase:", error);
    // }
  }

  async toggleGeo() {
    this.geo = !this.geo;
    if (this.geo) {
      this.geoFence = "Active";
      this.rescrict = true;
      this.fenceRadius = this.fenceRadius;
      console.log("Geofencing activated with radius:", this.fenceRadius);
    }

    // try {
    //   const autoRef = ref(this.db, "sensorData/auto");
    //   await set(autoRef, this.rescrict); // Write 'ON' or 'OFF'
    //   console.log(`Automation state set to: ${this.rescrict}`);
    // } catch (error) {
    //   console.error("Error updating automation state in Firebase:", error);
    // }
  }

  goBack() {
    window.history.back();
  }

  

  async trackPet() {
    // Check if we have valid coordinates before trying to open the map
    if (this.latitudeStr !== null && this.longitudeStr !== null) {
      
      // 1. Define the Google Maps search URL structure
      // The `q=` parameter is used for a direct search query,
      // which is often a specific coordinate pair.
      const mapUrl = `https://www.google.com/maps/search/?api=1&query=${this.latitudeStr},${this.longitudeStr}`;
      
      // 2. Open the URL in a new browser tab/window
      window.open(mapUrl, '_blank');
      
      console.log('Opening external map for coordinates:', this.latitudeStr, this.longitudeStr);
    } else {
      console.warn('Cannot track pet: Latitude or Longitude is not yet available.');
      // Optionally, show a notification to the user
      alert('Location data is not yet available. Please wait a moment.');
    }
  }

  goToPet(){
    this.router.navigate(['/pet']);
  }

}
