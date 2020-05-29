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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {


}
