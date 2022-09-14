import { Modelo } from "../interfaces/modelo.js";
import { Negociacao } from "./negociacao.js";

/* The Negociacoes class has a private property called negociacoes, which is an array of Negociacao
objects. It has a method called adiciona, which adds a Negociacao object to the negociacoes array.
It also has a method called lista, which returns a copy of the negociacoes array. */
export class Negociacoes implements Modelo<Negociacoes>{
    private negociacoes: Negociacao[] = [];

    public adiciona(negociacao: Negociacao) {
        this.negociacoes.push(negociacao);
    }

    public lista(): readonly Negociacao[] {
        return [...this.negociacoes];
    }

    public paraTexto(): string {
        return JSON.stringify(this.negociacoes, null, 2);
    }

    ehIgual(negociacoes: Negociacoes): boolean {
        return JSON.stringify(this.negociacoes) === JSON.stringify(negociacoes);
    }
}
