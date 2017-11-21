import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Agendamento } from './agendamento';
import { Carro } from '../carro';

@Injectable()
export class AgendamentoDao{
    constructor( private _store: Storage){}

    private _get(agendamento: Agendamento){
        return agendamento.email+ agendamento.data.substr(0,10);
    }

    salva(agendamento: Agendamento){
        return this._store.set(this._get(agendamento),agendamento);
    }

    ehAgendamentoDuplicado(agendamento: Agendamento) {
        
                let key = this._get(agendamento);
        
                return this._store
                    .get(key)
                    .then(dado => {
                        return dado ? true : false;
                    });
    }

    listaTodos(){
        let agendamentos = [];
        return this._store.forEach(dados => {
            let carro = new Carro(dados.carro.nome,dados.carro.preco);
            let agendamento = new Agendamento(
                carro,
                dados.valor,
                dados.nome,
                dados.endereco,
                dados.email,
                dados.data,
                dados.valida
            );
            agendamentos.push(agendamento);
        })
        .then(()=> agendamentos)
    }

   

} 