export class Pessoa {
    id: number;
    nome: string;
    foto: string;

    constructor(pessoa: IPessoa) {
        this.id = pessoa.id,
        this.foto = pessoa.nome,
        this.foto = pessoa.foto
    }
}

export interface IPessoa {
    id: number;
    nome: string,
    foto: string
}