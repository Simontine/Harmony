import { Component, Input } from '@angular/core';
import { MapComponent } from "../map/map.component";
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-pet',
  imports: [MapComponent,FormsModule],
  templateUrl: './pet.component.html',
  styleUrl: './pet.component.scss'
})
export class PetComponent {
  // Input property to make the component reusable with different numbers
@Input() displayPhoneNumber: string = '(071) 549-6360';
  
// The actual number used in the href (best practice: include country code and no formatting)
@Input() phoneNumber: string = '+27715496360';

  color: string = '00ff00';
  state: boolean = true;
  geo: string = "Enabled";
  value = 50;
  petName: string = "Buddy";

  constructor(private router: Router) { }
  
  goBack() {
    window.history.back();
  }

  // color = "#000000"; // default

  changeColor() {
    const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffa500", "#800080"];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  changeState() {
    this.state = !this.state;
    this.geo = this.state ? "Enabled" : "Disabled";
  }

  setGeofence() {
    console.log('Geofence set to:', this.value);
    // Add your logic here to save or use the geofence value
  }

   goBackAndNavigate() {
    this.router.navigate(['/setting']);
  }
  
}
