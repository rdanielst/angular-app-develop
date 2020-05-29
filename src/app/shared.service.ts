import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {


  private tituloPagina = new BehaviorSubject<string>('Teste Computadorizado de Atenção auditiva');
  atual: Observable<string> = this.tituloPagina.asObservable();
  constructor() { }

  updatedDataSelection(titulo: string){
    this.tituloPagina.next(titulo);
  }
}
