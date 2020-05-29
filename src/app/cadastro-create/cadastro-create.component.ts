import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cadastro } from '../model/cadastro.model';
import { CadastroService } from 'src/app/shared/cadastro.service';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';


@Component({
  selector: 'app-cadastro-create',
  templateUrl: './cadastro-create.component.html',
  styleUrls: ['./cadastro-create.component.css']
})
export class CadastroCreateComponent implements OnInit {
  instrucaoList = [
    {value: '0', name: 'Selecione' },
    {value: '1', name: 'Analfabeto' },
    {value: '2', name: 'Ensino Fundamental' },
    {value: '3', name: 'Ensino Médio' },
    {value: '4', name: 'Superior completo' },
    {value: '5', name: 'Pós-Graduação' },
    {value: '6', name: 'Mestrado' },
    {value: '7', name: 'Doutorado' },
    {value: '8', name: 'Pós Doutorado' },

  ];

  generoList = [
    {value: '0', name: 'Selecione' },
    {value: '1', name: 'M' },
    {value: '2', name: 'F' },
  ];


  cadastroForm = new FormGroup({
  nome: new FormControl(),
  email:  new FormControl(),
  idade: new FormControl(),
  iDHM: new FormControl(),
  instrucao: new FormControl(),
  anosdeescolaridade: new FormControl(),
  genero: new FormControl(),
  later: new FormControl(),
  duracao: new FormControl(),
  });

  // matcher = new MyErrorStateMatcher();

  constructor(private cadastroService: CadastroService, private router: Router) { }
  ngOnInit(): void {
  }


  onFormSubmit(cadastro: Cadastro) {

        this.cadastroService.createCadastro(cadastro).subscribe((resp) => {
        this.cadastroService.showMessage('Criado!');
        const usuarioId = cadastro.id;
        this.router.navigate([`/treinar/${usuarioId}`]);
      });
    }
}

