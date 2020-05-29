import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.scss']
})
export class ResultadoComponent implements OnInit {
  @Input() selectedAudio: string;
  @Input() questionAudio: string;

  constructor(private _route: ActivatedRoute) {
    this.questionAudio = this._route.snapshot.params.questionAudio;
    this.selectedAudio = this._route.snapshot.params.selectedAudio;
  }

  ngOnInit(): void {
  }

}
