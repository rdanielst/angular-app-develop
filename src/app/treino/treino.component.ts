import { Component, OnInit, HostListener, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { SharedService } from '../shared.service';
import { timer, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TesteService } from '../teste.service';

@Component({
  selector: 'app-treino',
  templateUrl: './treino.component.html',
  styleUrls: ['./treino.component.scss']
})
export class TreinoComponent implements OnInit, OnDestroy {

  playlist = [];


  contatdor = 0;
  audioAtual = '';
  grupoMarcado = '';
  grupoCorreto = '';

  teste = [];
  reproduzindo = false;
  fim = false;

  horaAudio: any;
  horaClick: any;
  progress = 0;
  clickCerto = false;
  subscription: Subscription;

  @ViewChild('grupo') grupo: ElementRef;



  constructor(private shared: SharedService, private ts: TesteService) {
    this.shared.updatedDataSelection('TREINO');
  }

  ngOnInit(): void {
    // this.tocarSequencia();
    this.playlist = [...this.ts.playlist];
    const indice = Math.floor(Math.random() * this.playlist.length);
    this.grupoCorreto = this.playlist[indice].name;
    console.log(this.playlist.length);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


  tocarSequencia() {
    // checa se já em uma reprodução
    if (this.reproduzindo) { return; }

    // Previne qualquer clique caso o teste tnha terminado
    if ( this.fim ) { return; }

    const intervalo = timer(0, 4250);
    const audio = new Audio();
    let i = 0;
    this.reproduzindo = true;
    this.subscription = intervalo.pipe(
    tap(t => {
        i = Math.floor( Math.random() * this.playlist.length );
        // console.log('tocou', this.playlist[i]);
        this.audioAtual = this.playlist[i].name;
        audio.src = this.playlist[i].url;
        audio.load();
      })
      ).subscribe(() => {
      this.contatdor += 1;
      this.progress = (this.contatdor * 100) / 21;
      this.horaAudio = new Date().getTime();
      // console.log('reproduziu', this.horaAudio);

      if (this.contatdor === 21) {
        this.subscription.unsubscribe();
        const timeFim = setInterval(() => {
          this.reproduzindo = false;
          console.log('fim');
          this.fim = true;
          clearInterval(timeFim);
        }, 1000);

      } else {
        this.playlist.splice(i, 1);
        audio.play().then(a => {
          this.grupo.nativeElement.classList.remove('certo', 'errado');
        });
      }

    });
  }

  @HostListener('document:keydown', ['$event'])
  marcador(event: KeyboardEvent) {
    if (!this.reproduzindo ) {
      return;
    }

    this.grupoMarcado = this.audioAtual;
    this.horaClick = new Date().getTime();
    const dif = this.horaClick - this.horaAudio;
    // console.log(event.key, dif);

    if (this.grupoCorreto === this.grupoMarcado) {
      this.clickCerto = true;
      this.toogleClass(true);

      this.teste.push(
        { grupoMarcado: this.grupoMarcado, correto: true }
        );
      } else {

        this.clickCerto = false;
        this.toogleClass(false);

        this.teste.push(
          { grupoMarcado: this.grupoMarcado, correto: false }
          );
        }
  }

  // Adiciona a classe de acordo com o click: certo ou errado
  toogleClass(click: boolean) {
    if (click) {
      this.grupo.nativeElement.classList.add('certo');
    } else {
      this.grupo.nativeElement.classList.add('errado');
    }
  }


  resetTeste() {
    this.playlist = [...this.ts.playlist];
    this.fim = false;
    this.contatdor = 0;
    this.progress = 0;
    const indice = Math.floor(Math.random() * this.playlist.length);
    this.grupoCorreto = this.playlist[indice].name;

  }


}
