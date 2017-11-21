import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { loginService } from "../../domain/login/loginService";

@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private _usuario: loginService ) {
  }

  

  public usuario = this._usuario.obtemUsuarioLogado();

  public nome: string = this.usuario.nome;
  public email: string = this.usuario.email;
  

}
