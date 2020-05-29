import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ResultadoComponent } from './resultado/resultado.component';
import {CadastroCreateComponent} from './cadastro-create/cadastro-create.component';
import { TreinarComponent } from './treinar/treinar.component';
import {HttpClientModule} from '@angular/common/http';

import {MatSnackBarModule } from '@angular/material/snack-bar';
import {MatListModule } from '@angular/material/list';
import {MatSidenavModule } from '@angular/material/sidenav';
import {MatToolbarModule } from '@angular/material/toolbar';
import {MatInputModule } from '@angular/material/input';
import {MatMenuModule } from '@angular/material/menu';
import {MatCardModule } from '@angular/material/card';
import {MatButtonModule } from '@angular/material/button';
import {MatIconModule } from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {LayoutModule} from '@angular/cdk/layout';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTooltipModule} from '@angular/material/tooltip';
import { SharedService } from './shared.service';



@NgModule({
   declarations: [
      AppComponent,
      ResultadoComponent,
      CadastroCreateComponent,
      TreinarComponent,

   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      ReactiveFormsModule,
      FormsModule,
      HttpClientModule,
      FormsModule,
      MatSnackBarModule,
      MatToolbarModule,
      MatButtonModule,
      MatMenuModule,
      MatSidenavModule,
      MatListModule,
      MatInputModule,
      MatIconModule,
      MatCardModule,
      MatSnackBarModule,
      MatFormFieldModule,
      MatRadioModule,
      MatSelectModule,
      LayoutModule,
      MatGridListModule,
      MatTooltipModule
   ],
   providers: [SharedService],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
