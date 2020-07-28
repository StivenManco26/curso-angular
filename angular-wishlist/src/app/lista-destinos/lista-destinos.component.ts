import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DestinoViaje } from './../models/destino-viaje.model';
import { DestinosApiClient } from './../models/destinos-api-client.model';
import { DestinosViajesState } from './../models/destinos-viajes-state.model';
import { AppState } from '../app.module';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css']
})
export class ListaDestinosComponent implements OnInit {
  @Output() onItemAdded: EventEmitter<DestinoViaje>;
  updates: string[];
  
  constructor( public destinosApiClient:DestinosApiClient, private store: Store<AppState>) { 
    this.onItemAdded = new EventEmitter();
    this.updates = [];
  }

  ngOnInit() {
    this.store.select(state => state.destinos.favorito)
      .subscribe(data => {
        let f = data;
        if (f != null) {
          this.updates.push('Se eligió: ' + f.nombre);
        }
      });
  }

  agregado(d: DestinoViaje){
    this.destinosApiClient.add(d);
    this.onItemAdded.emit(d);
  }

  elegido(d:DestinoViaje){
    //con rxjs:
    this.destinosApiClient.elegir(d);
  }
}