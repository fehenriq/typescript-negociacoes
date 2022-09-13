import { Negociacoes } from "../models/negociacoes.js";
import { View } from "./views.js";

/* The NegociacoesView class is responsible for rendering the HTML template of the table that will
display the list of Negociacoes. */
export class NegociacoesView extends View<Negociacoes> {
    protected template(model: Negociacoes): string {
        return `
            <table class="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th>DATA</th>
                        <th>QUANTIDADE</th>
                        <th>VALOR</th>
                    </tr>
                </thead>
                <tbody>
                    ${model.lista().map(negociacao => {
                        return `
                            <tr>
                                <td>${this.formatar(negociacao.data)}</td>
                                <td>${negociacao.quantidade}</td>
                                <td>${negociacao.valor}</td>
                            </tr>
                        `;
                    }).join(' ')}
                </tbody>
            </table>
        `;
    }

    private formatar(data: Date) {
        return new Intl.DateTimeFormat().format(data)
    }
}
