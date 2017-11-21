import { Component } from "@angular/core";
import { NavParams, NavController } from "ionic-angular";

import { Carro } from "../../domain/carro";
import { Acessorios } from "../../domain/acessorios";
import { CadastroPage } from "../cadastro/cadastro";
@Component({
    templateUrl: 'detalhes.html',
    selector: 'detalhes'
})


export class Detalhes{

    public carro:Carro;
    public items: Acessorios[];
    private _precoTotal: number;

    constructor(public _navParamsCtrl: NavParams, public NavCtrl:NavController){
            

            this.carro = _navParamsCtrl.get('CarroSelecionado');
            this._precoTotal = this.carro.preco;
            this.items = [
                {nome: 'Freio', preco: 17.50},
                {nome: 'Trava', preco: 100.00},
                {nome: 'Direção', preco:500.00},
            ];
    }

    get PrecoTotal(){
        return this._precoTotal;
    }


    atualizaTotal(Ligado: boolean, item){
            Ligado ?
                this._precoTotal += item.preco:
                this._precoTotal -= item.preco;
    }

    public avancar(){
        this.NavCtrl.push(CadastroPage,{
            carro: this.carro,
            preco: this._precoTotal
        });
    }

}