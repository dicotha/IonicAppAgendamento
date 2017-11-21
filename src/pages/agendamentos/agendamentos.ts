import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular'; 
import { AgendamentoDao } from '../../domain/agendamento/agendamento-dao';
import { Agendamento } from '../../domain/agendamento/agendamento';
import { AgendamentoService } from '../../domain/agendamento/agendamento-service';

@Component({
  selector: 'page-agendamentos',
  templateUrl: 'agendamentos.html',
})
export class AgendamentosPage {

  public agendamentos: Agendamento[];


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private _server: AgendamentoDao,
    private _service: AgendamentoService,
    public alertCtrl: AlertController
  ) {
    this._server.listaTodos().then(agendamentos =>this.agendamentos = agendamentos);
  }

  reenvia(agendamento: Agendamento){
    this._service
        .reenviaAgendamento(agendamento)
        .then(confirmado => {
          confirmado?
            this.alertCtrl.create({
              title: 'Reenvio',
              subTitle: 'Reenviado com sucesso',
              buttons: [{text:'ok'}]
            }).present():
            this.alertCtrl.create({
              title: 'Reenvio',
              subTitle: 'Erro ao reenviar, tente novamente mais tarde',
              buttons: [{text:'ok'}]
            }).present();
        });
  }
}
