import { Component, AfterViewInit, ElementRef, ViewChild, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import Icon from 'ol/style/Icon';
import Style from 'ol/style/Style';
import Overlay from 'ol/Overlay';
import { fromLonLat } from 'ol/proj';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Database, ref, onValue } from '@angular/fire/database';

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  imports: [CommonModule]
})
export class MapComponent implements OnInit, AfterViewInit {

  @ViewChild('popup', { static: false }) popupRef!: ElementRef;

  map!: Map;
  overlay!: Overlay;
  markerLayer!: VectorLayer;

  lat: number | null = null;
  lng: number | null = null;

  constructor(private db: Database, private router: Router) {}

  ngOnInit(): void {
    // Listen to Firebase Realtime Database
    const dbRef = ref(this.db, 'gps');
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        this.lat = data.lat ?? null;
        this.lng = data.lng ?? null;
        console.log(`Latitude: ${this.lat}, Longitude: ${this.lng}`);

        // Update marker once we have valid coordinates
        if (this.lat !== null && this.lng !== null) {
          this.updateMarker();
        }
      }
    });
  }

  ngAfterViewInit(): void {
    const defaultCoords = fromLonLat([28.1408, -25.5255]); // Default location

    this.overlay = new Overlay({
      element: this.popupRef.nativeElement,
      autoPan: { animation: { duration: 250 } }
    });

    // Marker layer initialized empty
    this.markerLayer = new VectorLayer({
      source: new VectorSource({ features: [] })
    });

    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({ source: new OSM() }),
        this.markerLayer
      ],
      view: new View({
        center: defaultCoords,
        zoom: 12
      }),
      overlays: [this.overlay]
    });

    // Popup click handling
    this.map.on('singleclick', (evt) => {
      const feature = this.map.forEachFeatureAtPixel(evt.pixel, (feat) => feat);
      if (feature) {
        const fCoords = (feature.getGeometry() as Point).getCoordinates();
        const name = feature.get('name');
        const info = feature.get('info');
        const popup = this.popupRef.nativeElement;
        popup.innerHTML = `<b>${name}</b><br>${info}`;
        this.overlay.setPosition(fCoords);
      } else {
        this.overlay.setPosition(undefined);
      }
    });
  }

  /** Updates the marker when Firebase provides new coordinates */
  updateMarker(): void {
    if (this.lat === null || this.lng === null) return;
  
    const coords = fromLonLat([this.lng, this.lat]);
  
    const marker = new Feature({
      geometry: new Point(coords),
      name: 'Pet Location',
      info: 'This is a popup for your pet marker.'
    });
  
    marker.setStyle(new Style({
      image: new Icon({
        anchor: [0.5, 1],
        src: 'https://img.icons8.com/?size=100&id=123964&format=png&color=000000',
        scale: 0.36
      })
    }));
  
    // ✅ Safely clear previous features and add new marker
    const source = this.markerLayer.getSource();
    if (source) {
      source.clear();
      source.addFeature(marker);
    }
  
    this.map.getView().setCenter(coords);
  }
  
}
