import {
  Component,
  Input,
  ViewChild,
  OnInit, HostListener
} from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router'; // add this 1 of 4
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-treinar',
  templateUrl: './treinar.component.html',
  styleUrls: ['./treinar.component.scss']
})
export class TreinarComponent implements OnInit {

  files_in_directories = [];
  userId: number;
  title = 'testes';
  currentTime = 0;
  duration = 0;

  // Material Style Advance Audio Player Playlist
  playlist = [
    {name: 'animais', url: '/../assets/audios/a1.mp3', isActive: false},
    {name: 'animais', url: '/../assets/audios/a2.mp3', isActive: false},
    {name: 'animais', url: '/../assets/audios/a3.mp3', isActive: false},
    {name: 'animais', url: '/../assets/audios/a4.mp3', isActive: false},
    {name: 'animais', url: '/../assets/audios/a5.mp3', isActive: false},
    {name: 'animais', url: '/../assets/audios/a6.mp3', isActive: false},
    {name: 'animais', url: '/../assets/audios/a7.mp3', isActive: false},
    {name: 'objeto', url: '/../assets/audios/o1.mp3', isActive: false},
    {name: 'objeto', url: '/../assets/audios/o2.mp3', isActive: false},
    {name: 'objeto', url: '/../assets/audios/o3.mp3', isActive: false},
    {name: 'objeto', url: '/../assets/audios/o4.mp3', isActive: false},
    {name: 'objeto', url: '/../assets/audios/o5.mp3', isActive: false},
    {name: 'objeto', url: '/../assets/audios/o6.mp3', isActive: false},
    {name: 'objeto', url: '/../assets/audios/o7.mp3', isActive: false},
    {name: 'comida', url: '/../assets/audios/c1.mp3', isActive: false},
    {name: 'comida', url: '/../assets/audios/c2.mp3', isActive: false},
    {name: 'comida', url: '/../assets/audios/c3.mp3', isActive: false},
    {name: 'comida', url: '/../assets/audios/c4.mp3', isActive: false},
    {name: 'comida', url: '/../assets/audios/c5.mp3', isActive: false},
    {name: 'comida', url: '/../assets/audios/c6.mp3', isActive: false},
    {name: 'comida', url: '/../assets/audios/c7.mp3', isActive: false},
  ];


  audio_contagem = 0;
  audio = new Audio();
  selectedAudio: string;
  questionAudio: string;
  n_audio;
  tempox;
  xaudio_a;
  xaudio_c;
  xaudio_o;
  @Input() contagem;

  total_audio_a = 0;
  total_audio_c = 0;
  total_audio_o = 0;

  /* 5 min */
  temporizador = 60; /* conversão em segundos */

  public keypressed;

  constructor(private route: ActivatedRoute, private router: Router, private shared: SharedService) {
    this.shared.updatedDataSelection('TREINO');
    this.n_audio = Math.floor(Math.random() * this.playlist.length - 1);
    this.questionAudio = this.playlist[this.n_audio].name;

    // this.route.paramMap.subscribe(x => {
    console.log(`param: ${this.route.snapshot.params.id}`);
    this.userId = this.route.snapshot.params.id;

    this.tocarSequencia();
  }



  ngOnInit(): void {

  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.keypressed = event.key;
    if (event.key.toLowerCase() === 'enter'.toLowerCase()) {
      clearTimeout(this.tempox);
      this.playlist.forEach(x => {
        if (x.isActive) {
          this.selectedAudio = x.name;
        }
      });
      console.log(`teste`);
      this.selectedAudio = 'animais';
      this.router.navigate(['resultado', 1, this.questionAudio, this.selectedAudio], {skipLocationChange: false});
    }
  }


  /* toca audio */
  tocarSequencia(): Promise<boolean> {
    return new Promise(resolve => {
      this.tempox = setInterval(() => {
        resolve(true);

        /* 5min */
        if (this.audio_contagem >= this.temporizador) {
          clearTimeout(this.tempox);
        } else {
          this.audio_contagem++;
          this.contagem = this.audio_contagem;

          /* sorteio dos audios*/
          this.n_audio = Math.floor(Math.random() * this.playlist.length - 1);
          this.playlist.forEach(x => {
            if (x.isActive) {
              x.isActive = false;
            }
          });

          if (this.playlist[this.n_audio]) {
            /* chamarei audio a */
            this.selectedAudio = this.playlist[this.n_audio].name;
            this.total_audio_a++;
            this.xaudio_a = Math.floor(Math.random() * 8);
            // audioa.innerText = "audio a: "+this.xaudio_a + " total audio :" + this.total_audio_a;
            this.audio.src = this.playlist[this.n_audio].url;
            this.audio.load();
            this.audio.play();

          }
        }
      }, 3000);
    });
  }
}
