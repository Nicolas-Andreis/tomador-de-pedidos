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