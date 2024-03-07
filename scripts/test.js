

$(document).ready(function () {
    const resultadosCategorias = {
        R: {
            descripcion: "<strong>Tipo Realista.</strong> En cuanto a las características de su personalidad, podrían ser poco sociables, materialistas, retraídos, conformistas, naturales, estables, sinceros, ahorrativos, auténticos, persistentes, con falta de perspicacia, tácticos y no complicados.",
            actividades: "Personas que se enfrentan a su ambiente de forma objetiva y concreta. Se inclinan a ocupaciones relacionadas con el manejo de instrumentos, máquinas, etc. Prefieren actividades que impliquen dinamismo, capacidad manual y motora.",
            aptitudes: "Pueden tener aptitudes en el área de las Matemáticas, psicomotrices y de tipo mecánico.",
            carreras: "Carreras recomendadas de la UCB que se relacionan con tus gustos y personalidad: Mecatrónica, ingeniería industrial, Ing. ambiental, Ingeniería en energía, ingeniería civil, ingeniería biomédica, psicología.",

        },
        I: {
            descripcion: "<strong>Tipo Intelectual.</strong> En cuanto a las características de su personalidad, se caracterizan por ser analíticos, racionales, cautelosos, introvertidos, reservados, críticos, metódicos, modestos, curiosos, pasivos, poco populares, independientes, pesimistas, intelectuales y precisos. Se enfrentan al ambiente mediante el uso de la inteligencia, resuelven los problemas a través de las ideas, lenguaje, los símbolos y evitan las situaciones que requieren poner en práctica actividades físicas, sociales y comerciales. Prefieren profesiones de tipo científico relacionadas con problemas teóricos.",
            actividades: "Evita situaciones que requieran poner en práctica actividades físicas, sociales y comerciales.",
            aptitudes: "Puede tener aptitudes en áreas científicas y teóricas.",
            carreras: "Carreras recomendadas de la UCB que se relacionan con tus gustos y personalidad: Derecho, psicología y medicina.",

        },
        A: {
            descripcion: "<strong>Tipo Artístico.</strong> En cuanto a las características de su personalidad, pueden ser complicados, imaginativos, intuitivos, desordenados, poco prácticos, no conformistas, emocionales, impulsivos, originales, independientes e idealistas.",
            actividades: "Emplean los sentimientos, intuición e imaginación. Evitan situaciones convencionales, se interesan por el contenido artístico. Dan poco valor a las profesiones de tipo económico o realista.",
            aptitudes: "Pueden tener aptitudes verbales, perceptivas y motoras.",
            carreras: "Carreras recomendadas de la UCB que se relacionan con tus gustos y personalidad: Diseño gráfico y comunicación visual, arquitectura.",

        },
        S: {
            descripcion: "<strong>Tipo Social.</strong> En cuanto a su personalidad, pueden ser influyentes, serviciales, responsables, cooperativos, idealistas, sociables, perspicaces, discretos, amistosos, amables, comprensivos, generosos y persuasivos.",
            actividades: "Se enfrenta a su entorno a través de destrezas que favorecen la comunicación y el entendimiento con los otros, muestran sus deseos de prestar ayuda. Poseen habilidades sociales y necesitan interactuar. Tienen una autoimagen positiva y se consideran líderes. Prefiere actividades en las que tiene la oportunidad de ayudar a otros. Evita actividades motrices, peligrosas o que requieran habilidad manual.",
            aptitudes: "Puede tener aptitudes verbales y escasa aptitud matemática.",
            carreras: "Carreras recomendadas de la UCB que se relacionan con tus gustos y personalidad: Psicología, derecho y comunicación social.",

        },
        E: {
            descripcion: "<strong>Tipo Emprendedor.</strong> En cuanto a las características de su personalidad, puede ser optimista, aventurero, enérgico, hedonista, ambicioso, confiado en sí mismo y discutidor. Actitud audaz, dominante, enérgica e impulsiva. Evita situaciones de tipo intelectual y estético. Le da gran valor a situaciones arriesgadas como pueden ser el liderazgo, los aspectos políticos y económicos.",
            actividades: "Prefiere actividades que le permitan satisfacer sus necesidades de dominio, tales como el deporte, la organización de actividades de otro, las ventas, los negocios.",
            aptitudes: "Puede tener inteligencia práctica y aptitud verbal.",
            carreras: "Carreras recomendadas de la UCB que se relacionan con tus gustos y personalidad: Administración de empresas, Ing. comercial, marketing y medios digitales.",

        },
        C: {
            descripcion: "<strong>Tipo Convencional.</strong> En cuanto a las características de personalidad, puede ser conformista, inhibido, obediente, controlado, defensivo, ordenado, poco imaginativo, eficiente, persistente, inflexible y práctico. Escoge objetivos con aprobación social en lugar de los de tipo ético o estético. Prefiere actividades pasivas, ordenadas y muy organizadas. Prefiere tareas administrativas, de oficina y de asuntos económicos.",
            actividades: "Prefiere actividades pasivas, ordenadas y muy organizadas.",
            aptitudes: "Puede tener aptitudes para el cálculo y de tipo administrativo.",
            carreras: "Carreras recomendadas de la UCB que se relacionan con tus gustos y personalidad: Administración de empresas, Ingeniería comercial.",

        }
    };

    // Evento para calcular puntajes
    $("#calcularBtn").click(function () {  
        
        // Verifica que haya al menos 3 grupos con 2 o más resultados
        const gruposConSuficientesResultados = [];
        for (let i = 1; i <= 9; i++) {
            const respuestasGrupo = $(`input[name="grupo${i}[]"]:checked`).length;
            if (respuestasGrupo >= 2) {
                gruposConSuficientesResultados.push(i);
            }
        }

        if (gruposConSuficientesResultados.length < 3) {
            // Muestra un mensaje de error y evita continuar con el cálculo
            alert("Debe seleccionar al menos 2 respuestas en 3 grupos diferentes para realizar el test.");
            return;
        }
        
        // Verifica que no se pueda seleccioanar todos los resultados
        if ($('input[type=checkbox]:checked').length === 90) {
            alert('No es posible calcular los puntajes.');
            return;
        }  

        // Continúa con el cálculo de puntajes
        const respuestasSeleccionadas = [];

        // Recopila las respuestas seleccionadas de todos los grupos
        for (let i = 1; i <= 9; i++) {
            $(`input[name="grupo${i}[]"]:checked`).each(function () {
                respuestasSeleccionadas.push(parseInt($(this).val()));
            });
        }

        // Muestra las respuestas seleccionadas en la consola
        //console.log("Respuestas seleccionadas:", respuestasSeleccionadas);


        // Define las categorías y sus números asociados
        const puntajes = {
            R: [1, 7, 13, 19, 25, 31, 37, 43, 49, 55, 61, 67, 73, 79, 85],
            I: [2, 8, 14, 20, 26, 32, 38, 44, 50, 56, 62, 68, 74, 80, 86],
            A: [3, 9, 15, 21, 27, 33, 39, 45, 51, 57, 63, 69, 75, 81, 87],
            S: [4, 10, 16, 22, 28, 34, 40, 46, 52, 58, 64, 70, 76, 82, 88],
            E: [5, 11, 17, 23, 29, 35, 41, 47, 53, 59, 65, 71, 77, 83, 89],
            C: [6, 12, 18, 24, 30, 36, 42, 48, 54, 60, 66, 72, 78, 84, 90]
        };

        // Inicializa los puntajes totales
        const puntajesTotales = {
            R: 0,
            I: 0,
            A: 0,
            S: 0,
            E: 0,
            C: 0
        };

        // Calcula los puntajes totales para cada categoría
        for (const categoria in puntajesTotales) {
            puntajesTotales[categoria] = respuestasSeleccionadas.reduce((total, numeroPregunta) => {
                if (puntajes[categoria].includes(numeroPregunta)) {
                    return total + 1;
                }
                return total;
            }, 0);
        }

        // Encuentra y muestra los tres mayores puntajes
        const tresMayoresPuntajes = Object.entries(puntajesTotales)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 3);

        // Muestra los resultados en la interfaz
        let resultadosHTML = '';
        for (const categoria in puntajesTotales) {
            resultadosHTML += `${categoria}: ${puntajesTotales[categoria]}<br>`;
        }

        // Muestra los resultados de las tres categorías con los puntajes más altos
        const resultadosCategoriasHTML = tresMayoresPuntajes.map(([categoria, puntaje]) => {
            const resultadoCategoria = resultadosCategorias[categoria];
            return `<p><strong>${categoria}:</strong> ${resultadoCategoria.descripcion}<br>${resultadoCategoria.aptitudes || ''}<br>${resultadoCategoria.actividades || ''}<br>${resultadoCategoria.carreras}</p>`;
        }).join("");

        // Muestra los tres mayores puntajes en la interfaz
        const tresMayoresPuntajesHTML = tresMayoresPuntajes.map(([categoria, puntaje]) => `${categoria}: ${puntaje}`).join(', ');
        resultadosHTML += `<br>Tres mayores puntajes: ${tresMayoresPuntajesHTML}`;
        $("#resultados").html(resultadosHTML);

        // Muestra los resultados de las categorías con los puntajes más altos
        $("#significadoResultados").html(resultadosCategoriasHTML);


        // Obtiene los valores de los menús desplegables de carreras
        var carrera1 = $("#carrera1").val();
        var carrera2 = $("#carrera2").val();
        var carrera3 = $("#carrera3").val();


        // Obtiene los valores del formulario

        var rSeleccionadas = respuestasSeleccionadas; // Cambiado de .value a la variable directamente
        var urlParams = new URLSearchParams(window.location.search);
        var ci = urlParams.get('ci');
        console.log('Valor de ci:', ci);
    
        // Crea un objeto JSON con los datos del formulario
        var datosTest = {
            ci: ci,
            nrPregunta: rSeleccionadas,            
            puntajesTotales: [
                puntajesTotales.R, 
                puntajesTotales.I, 
                puntajesTotales.A,
                puntajesTotales.S,
                puntajesTotales.E,
                puntajesTotales.C
            ],

            carrerasDeInteres: [carrera1, carrera2, carrera3]  // Agrega las carreras seleccionadas aquí

        };
        console.log(datosTest);
    
        // Realiza una solicitud POST al backend
        fetch('https://apitest.dev.404.codes/api/test', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosTest)
        })
        .then(response => response.json())
        .then(data => {
        console.log('Respuesta del servidor:', data);
        // Aquí puedes manejar la respuesta del servidor según tus necesidades

        // Redirecciona a otra página después de enviar los datos
        //window.location.href = '../view/test.html';

        })
        .catch(error => {
        console.error('Error al enviar datos:', error);
        });


    });

    // Maneja el evento del botón "Limpiar"
    $(".limpiarBtn").click(function () {
        // Restablece el formulario a su estado inicial
        $("#formulario")[0].reset();

        // Oculta todos los grupos de preguntas excepto el primero
        $(".grupo-pregunta").not(":first").hide();

        // Deshabilita el botón "Calcular Puntajes"
        $(".calcularBtn").prop("disabled", true);

        // Limpia los resultados anteriores
        $("#resultados").html("");
        $("#significadoResultados").html(""); // Agrega esta línea para limpiar los resultados de las categorías
    });

});