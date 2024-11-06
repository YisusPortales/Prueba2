import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { LoginService } from './../servicio/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public formulario: FormGroup;
  constructor(
    private fb: FormBuilder,
    public login: LoginService
  ) {
    this.formulario = fb.group({
      username: ["Usuario", [Validators.required], []], 
      password: ["Contrasena", [Validators.required, Validators.minLength(5)], []]
    });
   }

   public obtenerDatosDelFormulario(){
    const esValido = this.formulario.valid;
    if(!esValido){
      alert("El formulario ingresado no es valido ");
      return
    }
    const username = this.formulario.getRawValue()?.username;
    const password = this.formulario.getRawValue()?.password;
    this.login.iniciarSesion(username, password);
    console.log("El formulario esta correcto: ", this.formulario.valid);
    console.log("Los datos son: ", this.formulario.getRawValue());
    console.log("Los datos erroneos son: ", this.formulario.errors);
    console.log(this.formulario.get("username")?.errors);
    console.log(this.formulario.get("password")?.errors);
   }

  ngOnInit() {
  }

}
