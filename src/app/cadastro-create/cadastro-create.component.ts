import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Cadastro } from '../model/cadastro.model';
import { CadastroService } from 'src/app/shared/cadastro.service';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators, FormBuilder} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { SharedService } from '../shared.service';


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


  cadastroForm: FormGroup = this.fb.group({
    nome: ['', Validators.required],
  email:  ['', Validators.required],
  idade: ['', Validators.required],
  iDHM: [''],
  instrucao: ['', Validators.required],
  anosdeescolaridade: ['', Validators.required],
  genero: ['', Validators.required],
  later: ['', Validators.required],
  duracao: ['', Validators.required],
  });

  // matcher = new MyErrorStateMatcher();

  constructor(
    private cadastroService: CadastroService,
    private router: Router,
    private fb: FormBuilder, private shared: SharedService) {

      this.shared.updatedDataSelection('Teste Computadorizado de Atenção auditiva');

    }

    ngOnInit(): void {


    }


  get form() {
    return this.cadastroForm.controls;
  }


  onFormSubmit(cadastro: Cadastro) {

        this.cadastroService.createCadastro(cadastro).subscribe((resp) => {
        this.cadastroService.showMessage('Criado!');
        console.log(resp);
        const usuarioId = cadastro.id;
        this.router.navigate([`/treino/${usuarioId}`]);
      });
    }
}

