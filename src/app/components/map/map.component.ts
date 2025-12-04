import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import Icon from 'ol/style/Icon';
import Style from 'ol/style/Style';
import Overlay from 'ol/Overlay';

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  imports: []
})

export class MapComponent implements AfterViewInit {
  @ViewChild('popup', { static: false }) popupRef!: ElementRef;



  map!: Map;
  overlay!: Overlay;

  latitude: number = -25.5255;  longitude: number = 28.1408;
  geoFenceRadius: number = 0;

  ngOnit(): void {
    console.log('popupRef:', this.popupRef);
console.log(this.popupRef?.nativeElement);

  }

  ngAfterViewInit(): void {

    // ❗ MUST be [lon, lat], not [lat, lon]
    const coords = fromLonLat([this.longitude, this.latitude]);

    const marker = new Feature({
      geometry: new Point(coords),
      name: 'Pet Location',
      info: 'This is a popup for your pet marker.'
    });

    marker.setStyle(
      new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
          scale: 0.06
        })
      })
    );

    const markerLayer = new VectorLayer({
      source: new VectorSource({ features: [marker] })
    });

    // Popup overlay
    this.overlay = new Overlay({
      element: this.popupRef.nativeElement,
      autoPan: { animation: { duration: 250 } }
    });

    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({ source: new OSM() }),
        markerLayer
      ],
      view: new View({
        center: coords,
        zoom: 12
      }),
      overlays: [this.overlay]
    });

    // Handle click events
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
}
