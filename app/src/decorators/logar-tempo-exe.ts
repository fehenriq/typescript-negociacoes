export function logarTempoExe(segundos: boolean = false) {
    return function(
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const metodoOriginal = descriptor.value;
        descriptor.value = function(...args: any[]) {
            let divisor = 1;
            let unidade = 'ms';
            if (segundos) {
                divisor = 1000;
                unidade = 's';
            }
            const t1 = performance.now();
            const retorno = metodoOriginal.apply(this, args);
            const t2 = performance.now();
            console.log(`Tempo de execução do '${propertyKey}': ${(t2 - t1)/divisor} ${unidade}`);
            return retorno;
        }
        return descriptor;
    }
}