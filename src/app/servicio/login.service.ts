import { Injectable } from '@angular/core';
import { Usuarios } from './../Interfaces/Usuarios';
import { HttpClient } from '@angular/common/http';
import { delay, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly URL_LOGIN = "https://dummyjson.com/auth/login";
  private cargando = new BehaviorSubject<Boolean>(false);
  public $cargando = this.cargando.asObservable();
  public userActivo: Usuarios | null = null;

  constructor(
    private http: HttpClient
  ) { }

  public iniciarSesion(username: string, password: string){
    const cuerpo = {
      username: username,
      password: password
    }
    this.cargando.next(true);
    this.http.post<Usuarios>(this.URL_LOGIN, JSON.stringify(cuerpo),{
      headers:{

        "Content-Type": "application/json"
      }
    }
    )
    .pipe(delay(2000))
    .subscribe( datos => {
      this.userActivo = datos;
      this.cargando.next(false);
      console.log("Credenciales de usuario correctas")
      console.log(datos);
    });
  }
}
