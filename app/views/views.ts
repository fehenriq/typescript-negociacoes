export abstract class View<T> {
    protected element: HTMLElement;
    private escapar = false

    /*
     * If the element exists, then set the element to the elemento variable, otherwise throw an error.
    */
    constructor(seletor: string, escapar?: boolean) {
        const elemento = document.querySelector(seletor);
        if (elemento) {
            this.element = elemento as HTMLElement
        } else {
            throw Error(`Seletor ${seletor} não existe no DOM. Verifique.`)
        }
        if (escapar) {
            this.escapar = escapar;
        }
    }

    /* A method that is not implemented in the class, but in the subclasses. */
    protected abstract template(model: T): string;

    /* * The update function takes a model of type T and returns a template of type string */
    public update(model: T): void {
        let template = this.template(model);
        if (this.escapar) {
            template = template.replace(/<script>[\s\S]*?<\/script>/, '');
        }
        this.element.innerHTML = template;
    }
}