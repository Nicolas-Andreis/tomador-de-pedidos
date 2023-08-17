// codigo para cambiar retiro a delivery
const deliveryButton = document.getElementById('delivery-button');
const retiroButton = document.getElementById('retiro-button');
const deliveryContenido = document.getElementById('delivery-contenido');
const retiroContenido = document.getElementById('retiro-contenido');

deliveryButton.addEventListener('click', () => {
    deliveryButton.classList.add('active');
    retiroButton.classList.remove('active');
    deliveryContenido.classList.add('active');
    retiroContenido.classList.remove('active');
});

retiroButton.addEventListener('click', () => {
    retiroButton.classList.add('active');
    deliveryButton.classList.remove('active');
    retiroContenido.classList.add('active');
    deliveryContenido.classList.remove('active');
}); 
// codigo para cambiar retiro a delivery


//horario de apertura 
const abiertoDiv = document.querySelector('.abierto');
const horaActual = new Date();
const horaActualNumero = horaActual.getHours() + horaActual.getMinutes() / 60;

const horariosAbierto = [
    { inicio: 11.9833, fin: 14.25 }, // 11:59 am - 2:15 pm
    { inicio: 19.5, fin: 23.25 }    // 7:30 pm - 11:15 pm
];

let abierto = false;

for (const horario of horariosAbierto) {
    if (horaActualNumero >= horario.inicio && horaActualNumero <= horario.fin) {
        abierto = true;
        break;
    }
}

if (abierto) {
    abiertoDiv.innerHTML = '<p>abierto</p>';
} else {
    abiertoDiv.innerHTML = '<p>cerrado</p>';
}

// horario de apertura


//modal de horarios
const verHorariosButton = document.getElementById('ver-horarios-button');
const horariosModal = document.getElementById('horariosModal');
const closeBtn = horariosModal.querySelector('.close');

verHorariosButton.addEventListener('click', () => {
  horariosModal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
  horariosModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target === horariosModal) {
    horariosModal.style.display = 'none';
  }
});

//modal de horarios


//corazon card


//corazon card