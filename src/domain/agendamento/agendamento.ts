import { Carro } from '../carro';


export class Agendamento {
    constructor(
        public carro: Carro ,
        public valor: number,
        public nome: string = '',
        public endereco: string = '',
        public email: string = '',
        public data: string = new Date().toISOString(),
        public valida: boolean = false
    ){}
}