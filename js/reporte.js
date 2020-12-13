class Fila {

    constructor() {
        this.fila = [];
    }

    enqueu(nombre, sueldo) {
        this.fila.push([nombre, sueldo]);
    }

    deenqueu() {
        return this.fila.shift();
    }

    peekSueldo() {
        return this.fila[0][1];
    }

    isEmpty() {
        if (this.fila.length === 0) {
            return true;
        }
        return false;
    }

    size() {
        return this.fila.length;
    }

    print() {

        let datos = `
            <table class="table">
                <tr>
                    <th>#</th> 
                    <th>Nombre</th>      
                    <th>Sueldo</th>      
                </tr>      
            <tr>`;
        for (let i = 0; i < this.fila.length; i++) {
            datos += `
                <td>${i+1}</td>  
                <td>${this.fila[i][0]}</td>  
                <td> $ ${this.fila[i][1]}</td>
                </tr>`
        }
        `</table>`;

        return datos;
    }

    search(nombre) {
        let res;
        for (let i = 0; i < this.fila.length; i++) {
            if (this.fila[i][0] == nombre) {
                return true;
            }
        }
        return false;
    }

    aPagar() {
        let monto = 0;
        for (let i = 0; i < this.fila.length; i++) {
            monto += parseFloat(this.fila[i][1]);
            console.log(monto);
        }

        return monto;
    }

}


const fila = new Fila();
const pagado = new Fila();

fila.enqueu('Charles Darwin', 1500);
fila.enqueu('Keanu Reeves', 1600);
fila.enqueu('Carlos Hermosillo', 7500);

let fondo = 10600;

function empleado() {

    if (fila.isEmpty()) {
        document.getElementById(`pagar`).innerHTML = 'No hay empleados por pagar';
    } else {
        document.getElementById(`pagar`).innerHTML = fila.print();
    }

    if (pagado.isEmpty()) {
        document.getElementById(`pagados`).innerHTML = 'No hay empleados pagados';
    } else {
        document.getElementById(`pagados`).innerHTML = pagado.print();
    }

    if (fondo <= 0) {
        document.getElementById(`fondo-res`).innerHTML = ' <p class="none"> No hay fondos disponibles </p>';
    } else {
        document.getElementById(`fondo-res`).innerHTML = `$${fondo} MXN`;
    }


}

function agregar() {

    Swal.mixin({
        input: 'text',
        confirmButtonText: 'Siguiente &rarr;',
        showCancelButton: true,
        inputValidator: (value) => {
            if (!value) {
                return 'Necesitas llenar este campo!'
            }
        },
        progressSteps: ['1', '2']
    }).queue([{
            title: 'Nombre del empleado',
        },
        {
            input: 'number',
            title: 'Sueldo del empleado',
            inputValidator: (value) => {
                if (!value) {
                    return 'Necesitas llenar este campo!'
                } else if (value <= 0) {
                    return 'Sueldo debe ser mayor a $0'
                }
            }
        },


    ]).then((result) => {
        if (result.value) {
            const answers = (result.value)
            Swal.fire({
                icon: 'success',
                title: 'Empleado agregado',
                showConfirmButton: false,
                timer: 1000,
                showClass: {
                    popup: 'animate__animated animate__bounceIn'
                },
            })
            let sueldo = answers[1];
            fila.enqueu(answers[0], sueldo);
            document.getElementById(`pagar`).innerHTML = fila.print();

        }
    })

}

function eliminar() {

    if (fila.isEmpty() && pagado.isEmpty()) {
        res = Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No hay empleados para eliminar',
            showConfirmButton: false,
            timer: 1800,
            showClass: {
                popup: 'animate_animated animate_bounceIn'
            },
        });
    } else {
        if (!fila.isEmpty()) {
            fila.deenqueu();
        } else {
            pagado.deenqueu();
        }
        res = Swal.fire({
            icon: 'success',
            title: 'Empleado eliminado',
            showConfirmButton: false,
            timer: 1000,
            showClass: {
                popup: 'animate_animated animate_bounceIn'
            },
        });
    }

    if (fila.isEmpty()) {
        document.getElementById(`pagar`).innerHTML = 'No hay empleados por pagar';
    } else {
        document.getElementById(`pagar`).innerHTML = fila.print();
    }

    if (pagado.isEmpty()) {
        document.getElementById(`pagados`).innerHTML = 'No hay empleados pagados';
    } else {
        document.getElementById(`pagados`).innerHTML = pagado.print();
    }
    return res;
}

async function buscar() {

    const inputValue = '';
    const {
        value: nombre
    } = await Swal.fire({
        title: 'Buscar empleado',
        input: 'text',
        inputLabel: 'Nombre del empleado',
        inputValue: inputValue,
        confirmButtonText: 'Buscar',
        showCancelButton: true,
        inputValidator: (value) => {
            if (!value) {
                return 'Necesitas llenar este campo!'
            }
        }
    })
    Swal.close();
    console.log(nombre);
    if (nombre != undefined) {
        buscar2(nombre);
    }
    empleado();


}

function buscar2(nombre) {
    res = fila.search(nombre);
    if (res) {
        Swal.fire({
            icon: 'success',
            title: 'Empleado encontrado',
            showConfirmButton: false,
            timer: 1500,
            showClass: {
                popup: 'animate__animated animate__bounceIn'
            },
        });

    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se encuentra al empleado',
            showConfirmButton: false,
            timer: 1500,
            showClass: {
                popup: 'animate__animated animate__bounceIn'
            },
        });
    }
}


function pagar() {
    if (!fila.isEmpty()) {

        if (fondo >= fila.peekSueldo()) {
            let dinero = [] = fila.deenqueu();
            fondo = fondo - dinero[1];
            pagado.enqueu(dinero[0], dinero[1]);
            document.getElementById(`pagados`).innerHTML = pagado.print();
            document.getElementById(`fondo-res`).innerHTML = `$${fondo} USD`;
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No hay fondos suficientes',
                showClass: {
                    popup: 'animate__animated animate__bounceIn'
                },
            });
        }
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'No hay más que pagar',
            showClass: {
                popup: 'animate__animated animate__bounceIn'
            },

        });
    }
}

function pagarTodos() {

    if (!fila.isEmpty()) {
        if (fondo >= fila.aPagar()) {
            let tama = fila.size();
            for (let i = 0; i < tama; i++) {
                pagar();
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No hay fondos suficientes',
                showClass: {
                    popup: 'animate__animated animate__bounceIn'
                },

            });
        }
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'No hay más que pagar',
            showClass: {
                popup: 'animate__animated animate__bounceIn'
            },

        });
    }

}

function regresar() {
    if (!pagado.isEmpty()) {
        let dinero = [] = pagado.deenqueu();
        fila.enqueu(dinero[0], dinero[1]);
        document.getElementById(`pagar`).innerHTML = fila.print();
        if (pagado.isEmpty()) {
            document.getElementById(`pagados`).innerHTML = 'No hay empleados pagados';
        } else {
            document.getElementById(`pagados`).innerHTML = pagado.print();
        }
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'No hay empleados para regresar',
            showClass: {
                popup: 'animate__animated animate__bounceIn'
            },

        });
    }
}

function reiniciar() {
    if (!pagado.isEmpty()) {
        let tama = pagado.size();
        for (let i = 0; i < tama; i++) {
            regresar();
        }
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'No hay empleados para regresar',
            showClass: {
                popup: 'animate__animated animate__bounceIn'
            },

        });
    }
}

function fondos() {
    Swal.mixin({
        input: 'number',
        confirmButtonText: 'Aceptar',
        showCancelButton: true,
        inputValidator: (value) => {
            if (!value) {
                return 'Necesitas llenar este campo!'
            } else if (value <= 0) {
                return 'El fondo debe ser mayor a $0'
            }
        }
    }).queue([{
        title: 'Ingrese fondos',
        text: 'Para pago de empleados'
    }, ]).then((result) => {
        if (result.value) {
            const answers = parseFloat(result.value);
            fondo += answers;
            document.getElementById(`fondo-res`).innerHTML = `$${fondo} MXN`;
            Swal.fire({
                icon: 'success',
                title: 'Fondos Añadidos!',
                text: `$${answers} han sido añadidos `,
                showConfirmButton: false,
                timer: 1500,
                showClass: {
                    popup: 'animate__animated animate__bounceIn'
                },
            })
        }
    });
}