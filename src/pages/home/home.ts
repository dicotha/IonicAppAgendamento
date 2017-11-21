import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
// import http do angular
import { Http  } from '@angular/http';

import { Detalhes } from '../detalhes/detalhes';
import { Carro } from '../../domain/carro';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  
  public carros: Carro[];

  

  constructor( 
        public navCtrl: NavController,
        private _http: Http, 
        private _loadingCtrl:LoadingController,
        private _AlertCrtl: AlertController
      ) { }

  ngOnInit(){
    let loading = this._loadingCtrl.create({
      content: "Buscando Carros, Aguarde ...",
    });

    loading.present();
    this._http.get('https://aluracar.herokuapp.com')
              .map(res => res.json())
              .toPromise()
              .then(carros => {
                loading.dismiss();
                this.carros = carros;
              }).catch( err => {
                  loading.dismiss();
                  this._AlertCrtl.create({
                    title: "Falha de Conexão!",
                    buttons: [{text:"ok"}],
                    subTitle: "Não foi possivel obter as informações, tente novamente novamente mais tarde.",
                  }).present();
                  
                });
  }

  public seleciona(carro){
      this.navCtrl.push(Detalhes,{ CarroSelecionado: carro});
  }

}
