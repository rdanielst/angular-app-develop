import { Cadastro } from './../model/cadastro.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError, EMPTY  } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {


 readonly rootUrl = 'http://localhost:5000/api';
 list: Cadastro[];

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError ? ['msg-error'] : ['msg-success'],
    });
  }

   createCadastro(data: Cadastro): Observable<any> {
   const API_URL = `${this.rootUrl}/Cadastro/salvar-cadastro`;
   const reqHeader = new HttpHeaders().set('Content-Type', 'application/json')
   .set('Accept', 'application/json');
   console.log(data);
   return this.http.post(API_URL, JSON.stringify(data), { headers : reqHeader});

   }


   errorHandler(e: any): Observable<any> {
    this.showMessage('Ocorreu um erro!', true);
    return EMPTY;
  }

    // Handle Errors
  error(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}


