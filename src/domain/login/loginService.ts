import { Injectable }  from '@angular/core';
import { Http } from '@angular/http';
import { Usuario } from "../../domain/login/usuario";

@Injectable()
export class loginService{

    constructor(private _serve: Http){}

    private _usuarioLogado: Usuario;


    public efetuaLogin(email: string, senha: string){
        return this._serve
                      .get(`https://aluracar.herokuapp.com/login?email=${email}&senha=${senha}`)
                      .map(res => res.json().usuario)
                      .toPromise()
                      .then(
                            dado =>{
                            let usuario = new Usuario(dado.nome,dado.dataNascimento,dado.email,dado.telefone);
                            this._usuarioLogado = usuario;
                            return usuario;
                            } 
                      )
    }

    public obtemUsuarioLogado (){
        return this._usuarioLogado;
    }
}