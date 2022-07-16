import {Component, OnInit} from '@angular/core';

import * as L from 'leaflet'
import {map, popup} from "leaflet";



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  response = false;
   x:number = 1;

  constructor() {
  }

  ngOnInit(): void {

    L.Icon.Default.imagePath = "assets/leaflet/"


    var map = L.map('map').setView([48.745170, 9.107060], 15);

    var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

 //   var marker = L.marker([48.745170, 9.107060]).addTo(map)
    var circle = L.circle([48.745170, 9.107060], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 50
    }).addTo(map).on('click', this.circleClick)       //.bindPopup(' Patrick.').openPopup();
    /*
      var circle = L.circle([51.508, -0.11], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 500
      }).addTo(map).bindPopup('I am a circle.');

      var polygon = L.polygon([
        [51.509, -0.08],
        [51.503, -0.06],
        [51.51, -0.047]
      ]).addTo(map).bindPopup('I am a polygon.');


      var popup = L.popup()
        .setLatLng([51.513, -0.09])
        .setContent('I am a standalone popup.')
        .openOn(map);
    */

  }


   circleClick() {
     console.log(this.response)
     this.x = 10;
    this.response = true;
     console.log(this.response)

   }



}
