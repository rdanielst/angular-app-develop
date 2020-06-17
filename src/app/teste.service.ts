import { Injectable, HostListener } from '@angular/core';
import { Subscription, timer, Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TesteService {

  playlist = [
    { name: 'animais', url: '/../assets/audios/a1.mp3', isActive: false },
    { name: 'animais', url: '/../assets/audios/a2.mp3', isActive: false },
    { name: 'animais', url: '/../assets/audios/a3.mp3', isActive: false },
    { name: 'animais', url: '/../assets/audios/a4.mp3', isActive: false },
    { name: 'animais', url: '/../assets/audios/a5.mp3', isActive: false },
    { name: 'animais', url: '/../assets/audios/a6.mp3', isActive: false },
    { name: 'animais', url: '/../assets/audios/a7.mp3', isActive: false },
    { name: 'objeto', url: '/../assets/audios/o1.mp3', isActive: false },
    { name: 'objeto', url: '/../assets/audios/o2.mp3', isActive: false },
    { name: 'objeto', url: '/../assets/audios/o3.mp3', isActive: false },
    { name: 'objeto', url: '/../assets/audios/o4.mp3', isActive: false },
    { name: 'objeto', url: '/../assets/audios/o5.mp3', isActive: false },
    { name: 'objeto', url: '/../assets/audios/o6.mp3', isActive: false },
    { name: 'objeto', url: '/../assets/audios/o7.mp3', isActive: false },
    { name: 'comida', url: '/../assets/audios/c1.mp3', isActive: false },
    { name: 'comida', url: '/../assets/audios/c2.mp3', isActive: false },
    { name: 'comida', url: '/../assets/audios/c3.mp3', isActive: false },
    { name: 'comida', url: '/../assets/audios/c4.mp3', isActive: false },
    { name: 'comida', url: '/../assets/audios/c5.mp3', isActive: false },
    { name: 'comida', url: '/../assets/audios/c6.mp3', isActive: false },
    { name: 'comida', url: '/../assets/audios/c7.mp3', isActive: false },
  ];

  contatdor = 0;
  audioAtual = '';
  grupoMarcado = '';
  grupoCorreto = '';

  teste = [];
  reproduzindo = false;
  reprAudio = false;
  fim = false;

  horaAudio: any;
  horaClick: any;
  progress = 0;
  clickCerto = false;

  // sequencia de audios
  subscription: Subscription;

  // tempo
  sourceTimer: Subscription;

  // timer
  controle = 0;
  tempoDecorrido = 0;
  minutos = 0;
  segundos = 0;
  segundosTotal = 0;
  minTotal = 5;


  private tempo = new BehaviorSubject<string>('00:00');
  tempoTeste: Observable<string> = this.tempo.asObservable();


  private audioTocando = new BehaviorSubject<boolean>(false);
  tocando: Observable<boolean> = this.audioTocando.asObservable();

  constructor(private router: Router) {}


  getGrupoCerto() {
    const i = Math.floor(Math.random() * this.playlist.length);
    this.grupoCorreto = this.playlist[i].name;
    return this.grupoCorreto;
  }

  tocarSequencia() {
    // checa se já em uma reprodução
    if (this.reproduzindo) { return; }

    // Previne qualquer clique caso o teste tnha terminado
    if (this.fim) { return; }

    const intervalo = timer(0, 4250);
    const audio = new Audio();
    let i = 0;
    this.reproduzindo = true;
    this.subscription = intervalo.pipe(
      tap(t => {
        this.grupoMarcado = null;
        this.reprAudio = true;
        i = Math.floor(Math.random() * this.playlist.length);
        this.audioAtual = this.playlist[i].name;
        audio.src = this.playlist[i].url;
        audio.load();
      })
    ).subscribe(() => {
      this.contatdor += 1;
      this.horaAudio = new Date().getTime();
      audio.play().then(a => {
        this.reprAudio = true;
        this.audioTocando.next(true);
        this.registroListaReproducao();
      });

    });
  }


  iniciarTesteTempo(duracao?: number) {

    if (this.reproduzindo) { return; }


    const source = timer(0, 1000);

    if (duracao) {
      this.minTotal = duracao;
    }

    if (this.controle === 0) {
      this.segundosTotal = this.minTotal * 60;
      this.tempoDecorrido = -1;
    }
    this.tocarSequencia();
    this.sourceTimer = source.pipe(
      tap()
    ).subscribe(t => {
      this.controle = t;
      this.tempoDecorrido++;
      this.minutos = Math.floor(this.segundosTotal-- / 60);
      this.segundos = this.pad(this.segundosTotal - this.minutos * 60 + 1);

      this.tempo.next(`${this.minutos}:${this.segundos}`);

      this.checkTimer(this.minutos, this.segundos);

    });
  }

  private checkTimer(min, seg) {
    if (min === 0 && seg === '00') {
      this.finalizaTimer();
    }
  }

  finalizaTimer() {
    if (this.sourceTimer) { this.sourceTimer.unsubscribe(); }
    if (this.subscription) { this.subscription.unsubscribe(); }

    localStorage.setItem('teste', JSON.stringify(this.teste));

    this.router.navigate(['/resultado']);

  }

  registroListaReproducao() {
    this.teste.push(
      { id: this.contatdor, grupoMarcado: null,
        correto: null, click: null, grupoCerto:
        this.grupoCorreto, grupoReproduzido: this.audioAtual }
    );
  }


  marcador(event: KeyboardEvent) {

    if ( !this.reproduzindo ) { return; }

    this.grupoMarcado = this.audioAtual;
    this.horaClick = new Date().getTime();
    const dif = this.horaClick - this.horaAudio;
    // console.log(event.key, dif);
    // console.log(this.grupoCorreto, this.audioAtual);

    this.addResultado();

  }


  addResultado() {
    if (this.reproduzindo) {

      if (this.reprAudio) {
        this.reprAudio = false;
        this.audioTocando.next(false);

        const x = this.getUltimoAudio();

        if (this.grupoCorreto === this.grupoMarcado) {
          this.clickCerto = true;
          x.grupoMarcado = this.grupoMarcado;
          x.click = this.horaClick - this.horaAudio;
          x.correto = true;
        } else {
          this.clickCerto = false;
          x.grupoMarcado = this.grupoMarcado;
          x.click = this.horaClick - this.horaAudio;
          x.correto = false;
        }

      }
    }
  }

  getUltimoAudio() {
    let i = this.teste.length;
    if (i > 0) {
      i = i - 1;
    }
    console.log(this.teste[i]);
    return this.teste[i];
  }

  desvioPadrao(lista: []) {

    const media = lista.reduce((total, valor) => total + valor / lista.length, 0);
    const variancia = lista.reduce((total, valor) => total + Math.pow(media - valor, 2) / lista.length, 0);
    const desvioPadrao = Math.sqrt(variancia);

    return desvioPadrao;

  }


  private pad(digit: any) {
    return digit <= 9 ? '0' + digit : digit;
  }


}
