
function validarCarrerasDiferentes() {
  var opcionesInvalidas = [];

  for (var i = 1; i <= 3; i++) {
    var opcionSeleccionada = $("#carrera" + i).val();
    for (var j = 1; j <= 3; j++) {
      if (j !== i) {
        var otraOpcionSeleccionada = $("#carrera" + j).val();
        if (otraOpcionSeleccionada === opcionSeleccionada) {
          alert("Por favor, selecciona carreras diferentes para cada opción.");
          $("#carrera" + i).val(""); // Restablece la selección del menú desplegable actual
          return false;
        }
        opcionesInvalidas.push(otraOpcionSeleccionada);
      }
    }
  }

  for (var i = 1; i <= 3; i++) {
    for (var j = 1; j <= 3; j++) {
      if (j !== i) {
        $("#carrera" + j + " option").prop("disabled", false);
        opcionesInvalidas.forEach(function (opcionInvalida) {
          $("#carrera" + j + " option[value='" + opcionInvalida + "']").prop("disabled", true);
        });   
      }
    }
  }

  return true;
}

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

  // Validar que se haya seleccionado una carrera diferente en cada opción
  if (!validarCarrerasDiferentes()) {
    return;
  }

  // Validar que todos los campos estén completos
  if (!ci || !nombres || !apellidos || !telefono || !fechaNac || !correo || !colegio || !ciudad || !carrera1 || !carrera2 || !carrera3) {
    alert("Por favor, completa todos los campos del formulario.");
    return;
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
  