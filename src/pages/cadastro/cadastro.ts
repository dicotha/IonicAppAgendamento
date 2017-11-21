import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Alert } from 'ionic-angular';
import { Carro } from "../../domain/carro";

import { HomePage } from '../home/home';
import { Agendamento } from '../../domain/agendamento/agendamento';
import { AgendamentoService } from '../../domain/agendamento/agendamento-service';





@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  public carro: Carro;
  public precoTotal : number;


  public agendamento: Agendamento;
  private _alerta: Alert;

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      private _alertCtrl: AlertController,
      private _service: AgendamentoService
    ){

      this.carro = this.navParams.get('carro');
      this.precoTotal = this.navParams.get('preco');

      this.agendamento = new Agendamento(this.carro, this.precoTotal);

      this._alerta = this._alertCtrl.create({
        title:'Alerta.',
        buttons: [{text:'ok', handler: () => {navCtrl.setRoot(HomePage)}}]
      });
    }

    

  agenda(){

    if(!this.agendamento.nome || !this.agendamento.email || !this.agendamento.endereco){
      this._alertCtrl.create({
        title: 'Erro!',
        subTitle: 'É Necessario colocar todas as informações para finalizar o agendamento',
        buttons: [{text: 'ok'}]
      }).present();
      return
    }



    this._service
        .agenda(this.agendamento)
        .then(confirmado => {
          confirmado ? 
            this._alerta.setSubTitle('Agendamento realizado com sucesso!') :
            this._alerta.setSubTitle('Não foi possível realizar o agendamento. Tente mais tarde');
          this._alerta.present();         
        })
        .catch(err => {
          this._alerta.setSubTitle(err.message);
          this._alerta.present(); 
        });
        
  }

}
