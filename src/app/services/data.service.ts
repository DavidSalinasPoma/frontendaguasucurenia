import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  idSocio$ = new EventEmitter<any>();

  constructor() { }
}
