import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-test',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.scss']
})
export class ResultadoComponent implements OnInit {
  @Input() selectedAudio: string;
  @Input() questionAudio: string;

  testeUsuario = [
    {
      id: 1,
      grupoMarcado: 'comida',
      correto: false,
      click: 1300,
      grupoCerto: 'animais',
      grupoReproduzido: 'comida'
    },
    {
      id: 2,
      grupoMarcado: null,
      correto: null,
      click: null,
      grupoCerto: 'animais',
      grupoReproduzido: 'comida'
    },
    {
      id: 3,
      grupoMarcado: 'animais',
      correto: true,
      click: 1008,
      grupoCerto: 'animais',
      grupoReproduzido: 'animais'
    },
    {
      id: 4,
      grupoMarcado: 'animais',
      correto: true,
      click: 1244,
      grupoCerto: 'animais',
      grupoReproduzido: 'animais'
    },
    {
      id: 5,
      grupoMarcado: 'objeto',
      correto: false,
      click: 1082,
      grupoCerto: 'animais',
      grupoReproduzido: 'objeto'
    },
    {
      id: 6,
      grupoMarcado: 'animais',
      correto: true,
      click: 1091,
      grupoCerto: 'animais',
      grupoReproduzido: 'animais'
    },
    {
      id: 7,
      grupoMarcado: 'animais',
      correto: true,
      click: 1850,
      grupoCerto: 'animais',
      grupoReproduzido: 'animais'
    },
    {
      id: 8,
      grupoMarcado: 'comida',
      correto: false,
      click: 1846,
      grupoCerto: 'animais',
      grupoReproduzido: 'comida'
    },
    {
      id: 9,
      grupoMarcado: null,
      correto: null,
      click: null,
      grupoCerto: 'animais',
      grupoReproduzido: 'comida'
    },
    {
      id: 10,
      grupoMarcado: 'comida',
      correto: false,
      click: 1924,
      grupoCerto: 'animais',
      grupoReproduzido: 'comida'
    },
    {
      id: 11,
      grupoMarcado: null,
      correto: null,
      click: null,
      grupoCerto: 'animais',
      grupoReproduzido: 'objeto'
    },
    {
      id: 12,
      grupoMarcado: null,
      correto: null,
      click: null,
      grupoCerto: 'animais',
      grupoReproduzido: 'objeto'
    },
    {
      id: 13,
      grupoMarcado: 'animais',
      correto: true,
      click: 814,
      grupoCerto: 'animais',
      grupoReproduzido: 'animais'
    },
    {
      id: 14,
      grupoMarcado: 'animais',
      correto: true,
      click: 782,
      grupoCerto: 'animais',
      grupoReproduzido: 'animais'
    },
    {
      id: 15,
      grupoMarcado: 'animais',
      correto: true,
      click: 1020,
      grupoCerto: 'animais',
      grupoReproduzido: 'animais'
    },
    {
      id: 16,
      grupoMarcado: null,
      correto: null,
      click: null,
      grupoCerto: 'animais',
      grupoReproduzido: 'objeto'
    },
    {
      id: 17,
      grupoMarcado: null,
      correto: null,
      click: null,
      grupoCerto: 'animais',
      grupoReproduzido: 'comida'
    },
    {
      id: 18,
      grupoMarcado: 'animais',
      correto: true,
      click: 959,
      grupoCerto: 'animais',
      grupoReproduzido: 'animais'
    },
    {
      id: 19,
      grupoMarcado: null,
      correto: null,
      click: null,
      grupoCerto: 'animais',
      grupoReproduzido: 'animais'
    },
    {
      id: 20,
      grupoMarcado: null,
      correto: null,
      click: null,
      grupoCerto: 'animais',
      grupoReproduzido: 'objeto'
    },
    {
      id: 21,
      grupoMarcado: null,
      correto: null,
      click: null,
      grupoCerto: 'animais',
      grupoReproduzido: 'objeto'
    },
    {
      id: 22,
      grupoMarcado: 'comida',
      correto: false,
      click: 742,
      grupoCerto: 'animais',
      grupoReproduzido: 'comida'
    },
    {
      id: 23,
      grupoMarcado: null,
      correto: null,
      click: null,
      grupoCerto: 'animais',
      grupoReproduzido: 'comida'
    },
    {
      id: 24,
      grupoMarcado: null,
      correto: null,
      click: null,
      grupoCerto: 'animais',
      grupoReproduzido: 'objeto'
    },
    {
      id: 25,
      grupoMarcado: 'objeto',
      correto: false,
      click: 1132,
      grupoCerto: 'animais',
      grupoReproduzido: 'objeto'
    },
    {
      id: 26,
      grupoMarcado: null,
      correto: null,
      click: null,
      grupoCerto: 'animais',
      grupoReproduzido: 'objeto'
    },
    {
      id: 27,
      grupoMarcado: null,
      correto: null,
      click: null,
      grupoCerto: 'animais',
      grupoReproduzido: 'objeto'
    },
    {
      id: 28,
      grupoMarcado: null,
      correto: null,
      click: null,
      grupoCerto: 'animais',
      grupoReproduzido: 'comida'
    },
    {
      id: 29,
      grupoMarcado: 'animais',
      correto: true,
      click: 704,
      grupoCerto: 'animais',
      grupoReproduzido: 'animais'
    }
  ];

    resultado = {
      menor_tempo_certo: 0,
      maior_tempo_certo: 0,
      media_acertos: 0,
      menor_tempo_erro: 0,
      maior_tempo_erro: 0,
      media_erros: 0,
      menor_tempo_global: 0,
      maior_tempo_global: 0,
      media_global: 0,
      erros_comissao: '0',
      erros_omissao: '0',
      disparados: 0,
      desvio_padrao_certo: 0,
      desvio_padrao_erro: 0,
      desvio_padrao_global: 0,
    };

  constructor(private route: ActivatedRoute, private shared: SharedService) {
    // this.shared.updatedDataSelection('Questionário Áudio');
    // this.questionAudio = this.route.snapshot.params.questionAudio;
    // this.selectedAudio = this.route.snapshot.params.selectedAudio;

    // console.log(this.shared.getLocalStorage('teste'));

    const t = this.shared.getLocalStorage('teste');
    if (t) {
      this.testeUsuario = JSON.parse(t);
    }

  }

  ngOnInit(): void {

    const minCerto = this.testeUsuario.reduce((acc, t) => t.click < acc && t.correto ? t.click : acc, this.testeUsuario[0].click );
    const maxCerto = this.testeUsuario.reduce((acc, t) => t.click > acc && t.correto ? t.click : acc, this.testeUsuario[0].click );

    const minErro = this.testeUsuario.reduce((acc, t) => t.click < acc && t.correto === false ? t.click : acc, this.testeUsuario[0].click );
    const maxErro = this.testeUsuario.reduce((acc, t) => t.click > acc && t.correto === false ? t.click : acc, this.testeUsuario[0].click );

    const minGlobal = this.testeUsuario.reduce((acc, t) => t.click < acc && t.click !== null ? t.click : acc, this.testeUsuario[0].click);
    const maxGlobal = this.testeUsuario.reduce((acc, t) => t.click > acc && t.click !== null ? t.click : acc, this.testeUsuario[0].click);




    this.resultado.menor_tempo_certo = minCerto;
    this.resultado.maior_tempo_certo = maxCerto;

    this.resultado.menor_tempo_erro = minErro;
    this.resultado.maior_tempo_erro = maxErro;

    this.resultado.menor_tempo_global = minGlobal;
    this.resultado.maior_tempo_global = maxGlobal;

    this.calcularResultado();

  }




  calcularResultado() {
    let mediaCerto = 0;
    let mediaErro = 0;
    let mediaGlobal = 0;
    let qtdCerto = 0;
    let qtdErro = 0;
    let qtdErroNull = 0;
    let qtdGlobal = 0;

    const listaCerto = [];
    const listaErro = [];
    const listaGlobal = [];

    this.testeUsuario.forEach((r, i) => {
      // let minCerto = 0;
      // let maxCerto = 0;

      if (r.correto) {
        qtdCerto += 1;
        mediaCerto += r.click;
        listaCerto.push(r.click);
      } else if (r.correto === false) {
        console.log(r);
        qtdErro += 1;
        mediaErro += r.click;
        listaErro.push(r.click);
      } else if (r.grupoCerto === r.grupoReproduzido && r.click === null) {
        qtdErroNull += 1;
      }

      if (r.click !== null) {
        qtdGlobal += 1;
        mediaGlobal += r.click;
      }

      listaGlobal.push(r.click);

    });


    mediaCerto = mediaCerto / qtdCerto;
    mediaErro = mediaErro / qtdErro;
    mediaGlobal = mediaGlobal / qtdGlobal;

    this.resultado.media_acertos = mediaCerto;
    this.resultado.media_erros = mediaErro;
    this.resultado.media_global = mediaGlobal;
    this.resultado.erros_comissao = qtdErro + ' - ' + this.getPorcentagem(qtdErro, this.testeUsuario.length) + '%';
    this.resultado.erros_omissao = `${qtdErroNull} - ${ this.getPorcentagem(qtdErroNull, this.testeUsuario.length) }%` ;
    this.resultado.disparados = this.testeUsuario.length;
    this.resultado.desvio_padrao_certo = this.desvioPadrao(listaCerto);
    this.resultado.desvio_padrao_erro = this.desvioPadrao(listaErro);
    this.resultado.desvio_padrao_global = this.desvioPadrao(listaGlobal);


    console.log(mediaCerto, mediaErro);

  }

  getPorcentagem(qtd: number, total: number) {
    return ((qtd * 100) / total).toFixed(2);
  }

  desvioPadrao(lista: any[]) {

    const media = lista.reduce((total, valor) => total + valor / lista.length, 0);
    const variancia = lista.reduce((total, valor) => total + Math.pow(media - valor, 2) / lista.length, 0);
    const desvioPadrao = Math.sqrt(variancia);

    return desvioPadrao;

  }


}
