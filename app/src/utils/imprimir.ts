import { Imprimivel } from "../interfaces/imprimivel.js";

/* * It takes an array of objects that implement the Imprimivel interface and prints them out */
export function imprimir(...objetos: Imprimivel[]) {
    for (let objeto of objetos) {
        console.log(objeto.paraTexto());
    }
}