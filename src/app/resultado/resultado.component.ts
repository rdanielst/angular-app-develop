import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { SharedService } from '../shared.service';
import { min } from 'moment';

@Component({
  selector: 'app-test',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.scss']
})
export class ResultadoComponent implements OnInit {
  @Input() selectedAudio: string;
  @Input() questionAudio: string;

  testeUsuario = [];

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

    console.log(this.testeUsuario);

    const maxCerto = this.testeUsuario.reduce((acc, t) => t.click > acc && t.correto ? t.click : acc, this.testeUsuario[0].click );
    const maxErro = this.testeUsuario.reduce((acc, t) => t.click > acc && t.correto === false ? t.click : acc, this.testeUsuario[0].click );
    const maxGlobal = this.testeUsuario.reduce((acc, t) => t.click > acc && t.click !== null ? t.click : acc, this.testeUsuario[0].click);

    this.resultado.maior_tempo_certo = maxCerto;
    this.resultado.maior_tempo_erro = maxErro;
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
    let minErr = 4250;
    let minCer = 4250;
    let minGlo = 4250;

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

        const v = this.testeUsuario[i].click;
        minCer = (v < minCer) ? v : minCer;

      } else if (r.correto === false) {

        qtdErro += 1;
        mediaErro += r.click;
        listaErro.push(r.click);

        const v = this.testeUsuario[i].click;
        minErr = (v < minErr) ? v : minErr;

      } else if (r.grupoCerto === r.grupoReproduzido && r.click === null) {
        qtdErroNull += 1;
      }

      if (r.click !== null) {
        qtdGlobal += 1;
        mediaGlobal += r.click;

        const v = this.testeUsuario[i].click;
        minGlo = (v < minGlo) ? v : minGlo;

      }

      listaGlobal.push(r.click);

    });

    console.log(minErr);

    mediaCerto = mediaCerto / qtdCerto;
    mediaErro = mediaErro / qtdErro;
    mediaGlobal = mediaGlobal / qtdGlobal;

    this.resultado.menor_tempo_certo = minCer;
    this.resultado.menor_tempo_erro = minErr;
    this.resultado.menor_tempo_global = minGlo;
    this.resultado.media_acertos = mediaCerto;
    this.resultado.media_erros = mediaErro;
    this.resultado.media_global = mediaGlobal;
    this.resultado.erros_comissao = qtdErro + ' - ' + this.getPorcentagem(qtdErro, this.testeUsuario.length) + '%';
    this.resultado.erros_omissao = `${qtdErroNull} - ${ this.getPorcentagem(qtdErroNull, this.testeUsuario.length) }%` ;
    this.resultado.disparados = this.testeUsuario.length;
    this.resultado.desvio_padrao_certo = this.desvioPadrao(listaCerto);
    this.resultado.desvio_padrao_erro = this.desvioPadrao(listaErro);
    this.resultado.desvio_padrao_global = this.desvioPadrao(listaGlobal);


    // console.log(mediaCerto, mediaErro);

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
