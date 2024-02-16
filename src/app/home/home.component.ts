import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserData } from './interface';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  email: string = "";
  name: string = "";
  dni: string = "";
  apellidopaterno: string = "";
  apellidomaterno: string = "";
  update: boolean = true;
  editar:string = "editar";
  userId:string = "userId";

  constructor(private http: HttpClient,private router: Router ,private _snackBar: MatSnackBar ){};

  ngOnInit(): void {
      this.checkLocalStorage();
  }

  checkLocalStorage(){
    const data: string | null = localStorage.getItem('userData');
    
    if (data !== null) {
      const datos = JSON.parse(data);
      this.userId = datos.user.userId;

      this.http.get<UserData>(`https://mychats-whd7.onrender.com/api/v1/user/perfil/${this.userId}`)
      .subscribe(data=>{
           this.name= data.name;
           this.email= data.email;
           this.dni= data.dni;
           this.apellidopaterno= data.apellidopaterno;
           this.apellidomaterno=data.apellidomaterno;
      })
    } else {
      this.router.navigate(['/login']);
    }
  }

  user (){
    if(this.editar === "editar"){
      this.editar = "listo";
      this.update=false;
    }else{
     this.http.post("https://mychats-whd7.onrender.com/api/v1/user/update",{userId:this.userId,dni:this.dni})
      .subscribe((response:any)=>{
       if(response === "Perfil actualizado exitosamente"){
                this._snackBar.open("modificado con exito", "exito", {
          duration: 2000,
        });
       }
      },(error)=>{
        this._snackBar.open(error.error.message, "fallo", {
          duration: 2000,
        });
      });
      this.editar="editar";
      this.update=true;
    }
  }

  Sign_off(){
    localStorage.removeItem('userData');
    this.router.navigate(['/login']);
  } 
}

