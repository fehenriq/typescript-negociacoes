import { DiasDaSemana } from "../enums/dias-da-semana.js";
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { MensagemView } from "../views/mensagem-view.js";
import { NegociacoesView } from "../views/negociacoes-views.js";

export class NegociacaoController {
    private inputData: HTMLInputElement;
    private inputQuantidade: HTMLInputElement;
    private inputValor: HTMLInputElement;
    private negociacoes = new Negociacoes;
    private negociacoesView = new NegociacoesView('#negociacoesView', true);
    private mensagemView = new MensagemView('#mensagemView');

    constructor() {
        this.inputData = document.querySelector('#data') as HTMLInputElement;
        this.inputQuantidade = document.querySelector('#quantidade') as HTMLInputElement;
        this.inputValor = document.querySelector('#valor') as HTMLInputElement;
        this.negociacoesView.update(this.negociacoes);
    }

    /**
     * The first thing we do is create a new negotiation. Then we check if the date is a business day.
     * If it is not, we show a message and return. If it is, we add the negotiation to the list and
     * update the view.
    */
    public adiciona(): void {
        const negociacao = Negociacao.criaDe(
            this.inputData.value,
            this.inputQuantidade.value,
            this.inputValor.value
        );
        if (!this.diaUtil(negociacao.data)) {
            this.mensagemView.update('Apenas negociações em dias úteis são aceitas');
            return;
        }

        this.negociacoes.adiciona(negociacao);
        this.limpaFormulario();
        this.atualizaView();
    }

    /* This function clears the form fields. */
    private limpaFormulario(): void {
        this.inputData.value = '';
        this.inputQuantidade.value = '';
        this.inputValor.value = '';
        this.inputData.focus();
    }

    /**
     * The function atualizaView() is a private function that updates the view with the new negociacoes
     * and mensagemView.
     */
    private atualizaView(): void {
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update('Negociação adicionada com sucesso!')
    }

    /* * It returns true if the day of the week is greater than Sunday and less than Saturday. */
    private diaUtil(data: Date) {
        return data.getDay() > DiasDaSemana.domingo 
            && data.getDay() < DiasDaSemana.sabado;
    }
}

