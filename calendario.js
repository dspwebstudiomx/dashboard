// Función para obtener los días del siguiente mes
function obtenerDiasDelSiguienteMes() {
    const mesesEnEspañol = [
        "enero", "febrero", "marzo", "abril", "mayo", "junio",
        "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];

    const fechaActual = new Date();
    const mesActual = fechaActual.getMonth();
    const añoActual = fechaActual.getFullYear();

    // Calcular el siguiente mes
    const siguienteMes = mesActual === 11 ? 0 : mesActual + 1;
    const añoSiguienteMes = mesActual === 11 ? añoActual + 1 : añoActual;

    // Obtener el primer y último día del siguiente mes
    const primerDiaSiguienteMes = new Date(añoSiguienteMes, siguienteMes, 1);
    const ultimoDiaSiguienteMes = new Date(añoSiguienteMes, siguienteMes + 1, 0);

    // Crear un arreglo con los días del mes
    const diasDelMes = [];
    for (let dia = 1; dia <= ultimoDiaSiguienteMes.getDate(); dia++) {
        diasDelMes.push(dia);
    }

    // Mostrar el mes en español y los días
    console.log(`Mes: ${mesesEnEspañol[siguienteMes]}`);
    console.log(`Días: ${diasDelMes.join(", ")}`);
}

// Llamar a la función
obtenerDiasDelSiguienteMes();