import { domInjector } from "../decorators/dom-injector.js";
import { inspect } from "../decorators/inspect.js";
import { logarTempoExe } from "../decorators/logar-tempo-exe.js";
import { DiasDaSemana } from "../enums/dias-da-semana.js";
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { NegociacoesService } from "../services/negociacoes-service.js";
import { imprimir } from "../utils/imprimir.js";
import { MensagemView } from "../views/mensagem-view.js";
import { NegociacoesView } from "../views/negociacoes-views.js";

export class NegociacaoController {
    @domInjector('#data')
    private inputData: HTMLInputElement;
    @domInjector('#quantidade')
    private inputQuantidade: HTMLInputElement;
    @domInjector('#valor')
    private inputValor: HTMLInputElement;
    private negociacoes = new Negociacoes;
    private negociacoesView = new NegociacoesView('#negociacoesView');
    private mensagemView = new MensagemView('#mensagemView');
    private negociacoesService = new NegociacoesService;

    constructor() {
        this.negociacoesView.update(this.negociacoes);
    }

    @inspect
    @logarTempoExe()
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
        imprimir(negociacao, this.negociacoes);
        this.limpaFormulario();
        this.atualizaView();
    }

    /*
     * "The function obterNegociacoesDoDia() returns a promise, which is then filtered to remove any
     * duplicates, and then the filtered list is iterated over to add each item to the list of
     * negociacoes, and then the view is updated."
     */
    public importaDados(): void {
        this.negociacoesService
            .obterNegociacoesDoDia()
            .then(negociacoesDeHoje => {
                return negociacoesDeHoje.filter(negociacoesDeHoje => {
                    return !this.negociacoes
                    .lista()
                    .some(negociacao => negociacao.ehIgual(negociacoesDeHoje))
                });
            })
            .then(negociacoesDeHoje => {
                for(let negociacao of negociacoesDeHoje) {
                    this.negociacoes.adiciona(negociacao);
                }
                this.negociacoesView.update(this.negociacoes);
            });
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
        this.mensagemView.update('Negociação adicionada com sucesso!');
    }

    /* * It returns true if the day of the week is greater than Sunday and less than Saturday. */
    private diaUtil(data: Date) {
        return data.getDay() > DiasDaSemana.domingo 
            && data.getDay() < DiasDaSemana.sabado;
    }
}
