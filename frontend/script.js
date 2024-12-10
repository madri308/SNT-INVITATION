let codigosValidos = []; 
const codigosUrl = 'https://raw.githubusercontent.com/madri308/SNT-INVITATION/main/codigos.txt';

const apiUrl = 'https://hidden-harbor-87161-dd9f6998dbed.herokuapp.com';
const codeUrl = apiUrl+'/api/codes';
const mailUrl = apiUrl+'/api/decision';

// Verifica si el código ingresado es válido
function verificarCodigo() {
  const codigoIngresado = document.getElementById('codigo').value.trim();
  
  if (codigosValidos.includes(codigoIngresado)) {
    document.getElementById('respuesta').style.display = 'block';
    document.getElementById('mensaje-error').style.display = 'none';
  } else {
    document.getElementById('mensaje-error').style.display = 'block';
    document.getElementById('respuesta').style.display = 'none';
  }
}

function cargarCodigos() {
  fetch(codeUrl)
    .then(response => response.json())
    .then(data => {
      codigosValidos = data;
      console.log('Códigos cargados:', codigosValidos); // For debugging
    })
    .catch(error => {
      console.error('Error al cargar los códigos:', error);
    });
}

// Function to send decision to the backend
function enviarRespuesta(decision) {
  const codigoIngresado = document.getElementById('codigo').value.trim();

  if (!codigoIngresado) {
    alert('Please enter a valid code.');
    return;
  }

  // Send POST request with decision to backend
  fetch(mailUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      decision: decision,
      code: codigoIngresado
    }),
  })
  .then(response => response.json())
  .then(data => {
    if (data.message) {
      console.log(data.message);  // For debugging

      document.getElementById('codigo-section').style.display = 'none';
      document.getElementById('respuesta').style.display = 'none';
    
      // Show "Gracias" message
      document.getElementById('gracias-message').style.display = 'block';
      const videoSource = document.getElementById('bg-video-source');
  
      if (decision === 'aceptar') {
        videoSource.src = 'bg2.mp4'; // Change to background 1
      } else if (decision === 'rechazar') {
        videoSource.src = 'bg3.mp4'; // Change to background 2
      }
    }
  })
  .catch(error => {
    console.error('Error sending decision:', error);
  });
}


window.onload = function() {
  cargarCodigos();
};