import { Component } from '@angular/core';
import { NavController, NavParams,AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { loginService } from '../../domain/login/loginService';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public email: string = 'joao@alura.com.br';
  public senha: string = 'alura123';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private _serve: loginService,
    private _alert: AlertController

  ) {
  }

  efetuaLogin(){
    this._serve.efetuaLogin(this.email,this.senha).then(()=> {
      this.navCtrl.setRoot(HomePage);
    }).catch(()=> {
    this._alert.create({
      title:'Não foi possivel logar',
      subTitle:'Erro no Login ou senha',
      buttons:[{text:'ok'}]
    }).present();
    } );
    
  }
}
