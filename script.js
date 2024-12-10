let codigosValidos = [];
const codigosUrl = 'https://raw.githubusercontent.com/madri308/SNT-INVITATION/main/codigos.txt';

const apiUrl = 'https://hidden-harbor-87161-dd9f6998dbed.herokuapp.com';
const codeUrl = apiUrl + '/api/codes';
const mailUrl = apiUrl + '/api/decision';

function verificarCodigo() {
  const codigoIngresado = document.getElementById('codigo').value.trim();

  fetch(codeUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.API_KEY
    },
    body: JSON.stringify({
      code: codigoIngresado
    }),
  })
    .then(response => response.json())
    .then(data => {
      if (data.message) {
        if (data.message === "correcto") {
          document.getElementById('respuesta').style.display = 'block';
          document.getElementById('mensaje-error').style.display = 'none';
        } else {
          document.getElementById('mensaje-error').style.display = 'block';
          document.getElementById('respuesta').style.display = 'none';
        }
      }
    })
    .catch(error => {
      console.error('Error sending decision:', error);
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
      'Authorization': process.env.API_KEY
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
        document.getElementById('gracias-message').style.display = 'flex';
        const videoSource = document.getElementById('bg-video-source');

        if (decision === 'aceptar') {
          videoSource.src = 'bg4.mp4'; // Change to background 1
        } else if (decision === 'rechazar') {
          videoSource.src = 'bg2.mp4'; // Change to background 2
        }
        const video = document.getElementById('background-video');
        video.load();
        video.play(); // Start playing the new video
      }
    })
    .catch(error => {
      console.error('Error sending decision:', error);
    });
}