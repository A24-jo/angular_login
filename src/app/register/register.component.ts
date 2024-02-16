import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
   nombre: string = '';
  apellidoPaterno: string = '';
  apellidoMaterno: string = '';
  correo: string = '';
  contrase: string = '';
  dni: string = '';

  constructor(private http: HttpClient,private router: Router,private _snackBar: MatSnackBar) {}

  register() {

    if( 
      this.nombre === '' ||
      this.apellidoMaterno === '' ||
      this.apellidoPaterno === '' ||
      this.correo === '' ||
      this.contrase === '' ||
      this.dni === ''
       ){
      this._snackBar.open('faltan datos', "fallo", {
        duration: 2000,
      });
     return
    }
    if (isNaN(Number(this.dni))) {
      this._snackBar.open('El DNI debe ser un número válido', 'Fallo', {
        duration: 2000,
      });
      return;
    }

   this.http.post("http://localhost:4000/api/v1/user/register",{
    email:this.correo,
    name:this.nombre,
    password:this.contrase,
    dni:this.dni,
    apellidomaterno:this.apellidoMaterno,
    apellidopaterno:this.apellidoPaterno
  })
  .subscribe((response:any)=>{

   if(response.message === 'register existing'){
    this.router.navigate(['/login']);
    this._snackBar.open("registrado con exito", "exito", {
      duration: 2000,
    });
   }

  },(error)=>{
    this._snackBar.open(error.error.message + ':  ya existe esta cuenta', "fallo", {
      duration: 2000,
    });
  })
  }
}
