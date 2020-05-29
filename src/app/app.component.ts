import {
  Component,
  Input,
  ViewChild,
  OnInit, HostListener
} from '@angular/core';
import {
  Observable,
  BehaviorSubject,
  Subject
} from 'rxjs';

import * as moment from 'moment';
import {
  StreamState
} from './stream-state';
import {
  takeUntil
} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router'; // add this 1 of 4
import { SharedService } from './shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent implements OnInit {

  tituloPagina = '';

  constructor(private shared: SharedService) {

  }

  ngOnInit() {
    this.shared.atual.subscribe( p => this.tituloPagina = p);
  }

}
