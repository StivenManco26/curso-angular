import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DestinoViaje } from '../models/destino-viaje.model';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';


@Component({
  selector: 'app-form-destino-viaje',
  templateUrl: './form-destino-viaje.component.html',
  styleUrls: ['./form-destino-viaje.component.css']
})
export class FormDestinoViajeComponent implements OnInit {
  @Output() onItemAdded: EventEmitter<DestinoViaje>;
  fg: FormGroup;
  minLongitud: 3;
  searchResults: string[];

  constructor(fb: FormBuilder) { 
    this.onItemAdded = new EventEmitter();
    this.fg = fb.group({
      nombre: ['', Validators.compose([
        Validators.required,
        this.nombreValidator,
        this.nombreValidatorParametrizable(this.minLongitud)
      ])],
      url: ['']
    });

    this.fg.valueChanges.subscribe(
      (form: any) => {
        console.log('form cambió:', form);
      }
    );
    
    this.fg.controls['nombre'].valueChanges.subscribe(
      (value: string) => {
        console.log('nombre cambió:', value);
      }
    );
  }

  ngOnInit(): void {
    let elemNombre = <HTMLInputElement>document.getElementById('nombre');
    fromEvent(elemNombre, 'input') //fromEvent escucha cada vez que se toca una tecla
    .pipe(
      map((e: KeyboardEvent) => (e.target as HTMLInputElement).value),
      filter(text => text.length > 2),
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(() => ajax('/assets/datos.json'))
    ).subscribe(ajaxResponse => {
      console.log(ajaxResponse);
      console.log(ajaxResponse.response);
      this.searchResults = ajaxResponse.response;
    });
  }

  guardar(nombre: string, url: string): boolean{
    let d = new DestinoViaje(nombre,url);
    this.onItemAdded.emit(d);
    return false; 
  }

  nombreValidator(control: FormControl): {[s: string]: boolean }{
    const l = control.value.toString().trim().length;
    if(l>0 && l<5){
      return { invalidNombre: true };
    }
    return null;
  }

  nombreValidatorParametrizable(minLong: number): ValidatorFn {
    return (control: FormControl): {[s: string]: boolean} | null => {
      const l = control.value.toString().trim().length;
      if(l>0 && l<minLong){
        return { minLongNombre: true };
      }
      return null;
    }
  }

}
