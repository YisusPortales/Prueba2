import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './../login.service';
import { Productos } from './../../Interfaces/Productos';
import { RespuestaApi } from './../../Interfaces/RespuestaApi';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private readonly URL_PRODUCTOS = 'https://dummyjson.com/auth/products';
  private total = 0;
  private saltar = 0;
  private cantidad = 10;
  private $productos = new BehaviorSubject<Productos[]>([]);
  public producto = this.$productos.asObservable();

  constructor(
    private http: HttpClient,
    private login: LoginService
  ) { }

  public listProduct(){
    const new_url = `${this.URL_PRODUCTOS}?limit=${this.cantidad}&skip=`;
    this.http.get<RespuestaApi>(new_url,{
      headers: { 
        'Authorization': 'Bearer '+this.login.userActivo?.accessToken,
        'Content-Type': 'application/json'
      }
    })
    .subscribe(datos => {
      this.$productos.next(datos.products);
      this.total = datos.total;
    });
  }


  public nextProduct(){
    this.saltar = this.saltar + this.cantidad;
    const new_url = `${this.URL_PRODUCTOS}?limit=${this.cantidad}&skip=${this.saltar}`;
    this.http.get<RespuestaApi>(new_url,{
      headers: { 
        'Authorization': 'Bearer '+this.login.userActivo?.accessToken,
        'Content-Type': "application/json"
      }
    })
    .subscribe(datos => {
      this.$productos.next(datos.products);
      this.total= datos.total;
      
    });

  }

  public prevProduct(){
    const menos = this.saltar - this.cantidad;
    if(menos<0){
      this.saltar = 0 
    }
    else{
      this.saltar = this.saltar - this.cantidad;
    }
    const new_url = `${this.URL_PRODUCTOS}?limit=${this.cantidad}&skip=${this.saltar}`;
    this.http.get<RespuestaApi>(new_url,{
      headers: { 
        'Authorization': 'Bearer '+this.login.userActivo?.accessToken,
        'Content-Type': 'application/json'
      }
    })
    .subscribe(datos => {
      this.$productos.next(datos.products);
      this.total= datos.total;
    });
  }
}
