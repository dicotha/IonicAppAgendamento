import { Http } from '@angular/http';
import { Agendamento } from './agendamento';
import { Injectable } from '@angular/core';
import { AgendamentoDao } from '../agendamento/agendamento-dao';


@Injectable()
export class AgendamentoService{
     constructor(private _http:Http, private _storage: AgendamentoDao ){}

     agenda(agendamento: Agendamento){

        let api = `https://aluracar.herokuapp.com/salvarpedido?carro=${agendamento.carro.nome}&nome=${agendamento.nome}&preco=${agendamento.valor}&endereco=${agendamento.endereco}&email=${agendamento.email}&dataAgendamento=${agendamento.data}`;
        return this._storage
            .ehAgendamentoDuplicado(agendamento)
            .then(duplicado => {
                if(duplicado) throw new Error('Este agendamento já foi realizado. Verifique');
                return this._http.get(api).toPromise()
                      .then(() => agendamento.valida = true, err => console.log(err))
                      .then(() => this._storage.salva(agendamento))
                      .then(() => agendamento.valida);
            });
     }

     reenviaAgendamento(agendamento: Agendamento){
        let api = `https://aluracar.herokuapp.com/salvarpedido?carro=${agendamento.carro.nome}&nome=${agendamento.nome}&preco=${agendamento.valor}&endereco=${agendamento.endereco}&email=${agendamento.email}&dataAgendamento=${agendamento.data}`;
        return this._http.get(api).toPromise()
                    .then(() => agendamento.valida = true, err => console.log(err))
                    .then(() => this._storage.salva(agendamento))
                    .then(() => agendamento.valida);
                   
     }
}