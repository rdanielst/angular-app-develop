import { Component, OnInit, HostListener, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { TesteService } from '../teste.service';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teste',
  templateUrl: './teste.component.html',
  styleUrls: ['./teste.component.scss']
})
export class TesteComponent implements OnInit, OnDestroy {

  grupoCerto = '';
  tempoTeste = '';
  resultadoTeste = [];
  duracaoTeste = 5;

  @ViewChild('grupo') grupo: ElementRef;

  constructor(public ts: TesteService, private shared: SharedService) {
    this.shared.updatedDataSelection('Teste Computadorizado de Atenção auditiva');
  }

  ngOnInit(): void {
    this.grupoCerto = this.ts.getGrupoCerto();
    this.duracaoTeste =  JSON.parse(this.shared.getLocalStorage('duracao'));
    this.duracaoTeste = Number.parseInt(this.duracaoTeste['duracao']);
    console.log(this.duracaoTeste);

  }

  ngOnDestroy() {
    this.ts.finalizaTimer();
  }

  iniciarTeste() {
    this.ts.iniciarTesteTempo(this.duracaoTeste);
    this.ts.tempoTeste.subscribe( t => {
      this.tempoTeste = t;
    });

    this.ts.tocando.subscribe(t => {
      if (t) {
        this.grupo.nativeElement.classList.remove('certo', 'errado');
      }
    });
  }

  @HostListener('document:keydown', ['$event'])
  marcador(event: KeyboardEvent) {
    this.ts.marcador(event);
    this.resultadoTeste = this.ts.teste;

    const ultimo = [... this.resultadoTeste].pop();

    if (ultimo.correto) {
      this.grupo.nativeElement.classList.add('certo');
    } else {
      this.grupo.nativeElement.classList.add('errado');
    }

  }


}
