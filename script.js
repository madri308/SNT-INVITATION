let codigosValidos = []; 
const codigosUrl = 'https://raw.githubusercontent.com/madri308/SNT-INVITATION/main/codigos.txt';

// Verifica si el código ingresado es válido
function verificarCodigo() {
  const codigoIngresado = document.getElementById("codigo").value;
  const mensajeError = document.getElementById("mensaje-error");
  const respuestaDiv = document.getElementById("respuesta");

  // Comprobamos si el código es válido
  if (codigosValidos.includes(codigoIngresado)) {
    // Si el código es correcto, mostramos las opciones de respuesta
    mensajeError.style.display = "none";
    respuestaDiv.style.display = "block";
  } else {
    // Si el código es incorrecto, mostramos un mensaje de error
    mensajeError.style.display = "block";
    respuestaDiv.style.display = "none";
  }
}

// Enviar la respuesta de aceptación o rechazo
function enviarRespuesta(respuesta) {
  const codigoIngresado = document.getElementById("codigo").value;

  // Aquí deberías enviar la respuesta y el código al correo del organizador.
  // Pero como esto no se puede hacer directamente con JavaScript sin un backend,
  // utilizaríamos una API o un servidor para realizar el envío del correo.

  // Simulación del envío de correo (aquí deberías integrar un servicio como Formspree, EmailJS, etc.)
  alert(`Código: ${codigoIngresado} - Respuesta: ${respuesta}`);

  // Redirigir o mostrar un mensaje de éxito
  alert("Tu respuesta ha sido registrada correctamente.");
  location.reload(); // Recarga la página para resetear el proceso
} 

function cargarCodigos() {
    fetch(codigosUrl)
      .then(response => response.text())
      .then(data => {
        // Convertir el contenido del archivo a una lista de códigos
        codigosValidos = data.split('\n').map(codigo => codigo.trim());
        console.log("Códigos cargados:", codigosValidos);  // Para verificar que se han cargado correctamente
      })
      .catch(error => {
        console.error("Error al cargar el archivo de códigos:", error);
      });
  }


  window.onload = function() {
    cargarCodigos();
    console.log(codigosValidos)
    var video = document.getElementById("background-video");
  
    // Verificar si el video existe y reproducirlo
    if (video) {
      video.play().catch(function(error) {
        console.error("Error al intentar reproducir el video:", error);
      });
    }
  };