import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ResultadoComponent} from './resultado/resultado.component';
import {CadastroCreateComponent} from './cadastro-create/cadastro-create.component';
import {TreinarComponent} from './treinar/treinar.component';

import {AppComponent} from './app.component';



const routes: Routes = [
  {path: 'resultado/:id/:questionAudio/:selectedAudio', component: ResultadoComponent},
  {path: 'treinar/:id', component: TreinarComponent},
  {path: 'cadastro', component: CadastroCreateComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
