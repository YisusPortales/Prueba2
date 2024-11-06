import { Component, OnInit } from '@angular/core';
import { ViewWillEnter, ViewDidLeave } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Productos } from './../Interfaces/Productos'
import { ProductosService } from './../servicio/productos/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements ViewDidLeave, ViewWillEnter {
  public productos: Productos[] = [];
  private subProducto!: Subscription;
  constructor(
    private prodServ: ProductosService,
  ) { 
  }

  ionViewWillEnter(): void {
    this.subProducto = this.prodServ.producto.subscribe(productos => {
      this.productos = productos;
    });
    this.prodServ.listProduct()
    
  }

  ionViewDidLeave(): void {
    if(this.subProducto){
      this.subProducto.unsubscribe();
    }
  }

  public next(){
    this.prodServ.nextProduct();
  }

  public prev(){
    this.prodServ.prevProduct();
  }

  ngOnInit() {
  }

}
