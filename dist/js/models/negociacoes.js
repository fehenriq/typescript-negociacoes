/* The Negociacoes class has a private property called negociacoes, which is an array of Negociacao
objects. It has a method called adiciona, which adds a Negociacao object to the negociacoes array.
It also has a method called lista, which returns a copy of the negociacoes array. */
export class Negociacoes {
    constructor() {
        this.negociacoes = [];
    }
    adiciona(negociacao) {
        this.negociacoes.push(negociacao);
    }
    lista() {
        return [...this.negociacoes];
    }
}
