import { Component, OnInit, HostListener } from '@angular/core';
import { TesteService } from '../teste.service';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-teste',
  templateUrl: './teste.component.html',
  styleUrls: ['./teste.component.scss']
})
export class TesteComponent implements OnInit {

  grupoCerto = '';
  tempoTeste = '';
  resultadoTeste = [];

  constructor(private ts: TesteService, private shared: SharedService) {
    this.shared.updatedDataSelection('Teste Computadorizado de Atenção auditiva');
  }

  ngOnInit(): void {
    this.grupoCerto = this.ts.getGrupoCerto();
  }

  iniciarTeste() {
    this.ts.iniciarTesteTempo();
    this.ts.tempoTeste.subscribe( t => {
      this.tempoTeste = t;
    });
  }

  @HostListener('document:keydown', ['$event'])
  marcador(event: KeyboardEvent) {
    this.ts.marcador(event);
    this.resultadoTeste = this.ts.teste;
  }


}
