import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit  {
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient , private router: Router,private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.username = '';
    this.password = '';
}


  login() {
    this.http.post('https://mychats-whd7.onrender.com/api/v1/user/login', { email: this.username, password: this.password })
      .subscribe((response: any) => {
       
        if(response.token){
          localStorage.setItem('userData', JSON.stringify(response));
            this.router.navigate(['/home']);
        this._snackBar.open("ingresando", "exito", {
          duration: 2000,
        });
        }
       


      }, (error) => {
        this._snackBar.open(error.error.message, "fallo", {
          duration: 2000,
        });
      });
  }
}
