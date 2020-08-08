import { Component, OnInit } from '@angular/core';
import { DestinosApiClient } from './../../models/destinos-api-client.model';
import { DestinoViaje } from './../../models/destino-viaje.model';
import { ActivatedRoute } from '@angular/router';
import { environment } from './../../../environments/environment';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-destino-detalle',
  templateUrl: './destino-detalle.component.html',
  styleUrls: ['./destino-detalle.component.css'],
  providers: [DestinosApiClient]
})

export class DestinoDetalleComponent implements OnInit {
  destino: DestinoViaje
  /*style = {
    sources: {
      world: {
        type: 'geojson',
        //data: 'https://cdn.jsdelivr.net/npm/@turf/turf@5/turf.min.js'
        data: 'https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json'
      }
    },
    version: 8,
    layers: [{
      'id': 'countries',
      'type': 'fill',
      'source': 'world',
      'layout': {},
      'paint': {
        'fill-color': '#6F788A'
      }
    }]
  };*/
  mapbox = (mapboxgl as typeof mapboxgl);
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 6.217698;
  lng = -75.579951;
  
  constructor(private route: ActivatedRoute, private destinosApiClient: DestinosApiClient) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.destino = this.destinosApiClient.getById(id);
    this.mapbox.accessToken = environment.accessToken;
      this.map = new mapboxgl.Map({
        container: 'map',
        style: this.style,
        zoom: 13,
        center: [this.lng, this.lat]
    });
    this.map.addControl(new mapboxgl.NavigationControl());
  }

}
