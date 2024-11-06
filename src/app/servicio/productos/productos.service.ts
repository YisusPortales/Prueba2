import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './../login.service';
import { Producto } from './../interfaces/Producto';
import { RespuestasApi } from './../interfaces/RespuestaApi';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private readonly URL_PRODUCTOS = 'https://dummyjson.com/auth/products';
  private total = 0;
  private saltar = 0;
  private cantidad = 8;
  private $productos = new BehaviorSubject<Producto[]>([]);
  public producto = this.$productos.asObservable();

  constructor(
    private http: HttpClient;
    private login: LoginService;
  ) { }

  public nextProduct(){
    this.saltar = this.saltar + this.cantidad;
    const new_url = '${this.URL_PRODUCTOS}?limit=${this.cantidad}$skip=${this.saltar}';
    this.http.get<RespuestasApi>(new_url,{
      headers: { 
        'Authoritation': "Bearer"+this.login.userActivo,
        'Content-Type': "aplication/json"
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
    const new_url = '${this.URL_PRODUCTOS}?limit=${this.cantidad}$skip=${this.saltar}';
    this.http.get<RespuestasApi>(new_url,{
      headers: { 
        'Authoritation': "Bearer"+this.login.userActivo,
        'Content-Type': "aplication/json"
      }
    })
    .subscribe(datos => {
      this.$productos.next(datos.products);
      this.total= datos.total;
    });


  }

  public listProduct(){
    const new_url = '${this.URL_PRODUCTOS}?limit=${this.cantidad}$skip=0';
    this.http.get<RespuestasApi>(new_url,{
      headers: { 
        'Authoritation': "Bearer"+this.login.userActivo,
        'Content-Type': "aplication/json"
      }
    })
    .subscribe(datos => {
      this.$productos.next(datos.products);
      this.total= datos.total;
    });


  }
}
