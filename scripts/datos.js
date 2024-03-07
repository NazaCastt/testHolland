

function enviarDatos() {

  // Obtiene los valores del formulario
  var ci = document.getElementById("ci").value;
  var nombres = document.getElementById("nombres").value;
  var apellidos = document.getElementById("apellidos").value;
  var telefono = document.getElementById("telefono").value;
  var fechaNac = document.getElementById("fechaNac").value;
  var correo = document.getElementById("correo").value;
  var colegio = document.getElementById("colegio").value;
  var ciudad = document.getElementById("ciudad").value;
  
  // Obtiene los valores de las carreras de interés
  var carrera1 = document.getElementById("carrera1").value;
  var carrera2 = document.getElementById("carrera2").value;
  var carrera3 = document.getElementById("carrera3").value;

  // Agrega un evento de cambio a cada menú desplegable
  for (var i = 1; i <= 3; i++) {
    $("#carrera" + i).change(function () {
        // Obtiene la opción seleccionada en el menú actual
        var opcionSeleccionada = $(this).val();

        // Deshabilita la opción seleccionada en los otros menús desplegables
        for (var j = 1; j <= 3; j++) {
            if (j !== i) {
                $("#carrera" + j + " option").prop("disabled", false); // Habilita todas las opciones primero
                $("#carrera" + j + " option[value='" + opcionSeleccionada + "']").prop("disabled", true);
            }
        }
    });
  }

  
  // Crea un objeto JSON con los datos del formulario
  var datosEstudiante = {
    ci: ci,
    nombres: nombres,
    apellidos: apellidos,
    telefono: telefono,
    fechaNacimiento: fechaNac,
    correo: correo,
    ciudad: ciudad,
    colegio: colegio,
    carrerasDeInteres: [carrera1, carrera2, carrera3]
  };
  
  // Realiza una solicitud POST al backend
  fetch('https://apitest.dev.404.codes/api/persona', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datosEstudiante)
  })
  .then(response => response.json())
  .then(data => {
    console.log('Respuesta del servidor:', data);
    // Aquí puedes manejar la respuesta del servidor según tus necesidades

    // Redirecciona a otra página después de enviar los datos
    window.location.href = '../view/test.html?ci=' + ci;

  })
  .catch(error => {
    console.error('Error al enviar datos:', error);
  });
    
}
  