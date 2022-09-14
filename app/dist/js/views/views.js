export class View {
    constructor(seletor) {
        const elemento = document.querySelector(seletor);
        if (elemento) {
            this.element = elemento;
        }
        else {
            throw Error(`Seletor ${seletor} não existe no DOM. Verifique.`);
        }
    }
    update(model) {
        let template = this.template(model);
        this.element.innerHTML = template;
    }
}
//# sourceMappingURL=views.js.map