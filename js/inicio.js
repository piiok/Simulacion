var aguacate = new Aguacate(); //Simulacion actual
var aguacateR = new Aguacate(); //Simulacion randomica

function imagen() {
	var altura = aguacate.alturas[aguacate.alturas.length - 1];
	var frutos = aguacate.produccion[aguacate.produccion.length - 1];
	var str = './imagenes/';
	if (aguacate.mes == 0 && altura == 20) {
		str += 'Planta0';
	} else {
		//Tipo de planta segun altura
		if (altura >= 540) {
			if (frutos > 0) {
				str += 'Planta4';
			} else {
				str += 'Planta3';
			}
		} else {
			if (altura >= 260 && altura < 540) {
				str += 'Planta2';
			} else {
				if (altura > 20 && altura < 260) {
					str += 'Planta1';
				}
			}
		}

		var ph = aguacate.ph;

		if (aguacate.contadorViva >= 3) {
			str += '-4';
		} else {
			//Color de la planta segun pH
			if ((ph >= 6.6 && ph < 7.0) || (ph > 5.0 && ph <= 5.5)) {
				str += '-1';
			}
			if ((ph >= 7.0 && ph < 8.0) || (ph > 4.0 && ph <= 5.0)) {
				str += '-2';
			}
			if (ph >= 8.0 || ph <= 4.0) {
				str += '-3';
			}
			//Si no cumple con ninguan es ideal, entonces no debe añadira nada. Las plantas sanas no llevan sufijo Ejemplo: Planta1.png
		}
	}
	return str + '.png';
}

function actualizar() {
	src = imagen();
	$('#planta').attr('src', src);
	$('#planta').css({
		height:
			'calc( ( ( 100% - 70px ) / 3000 ) * ' + (aguacate.alturas[aguacate.alturas.length - 1] - 50) + ' + 50px )'
	});
	$('#planta').css({ left: 'calc( 50% + 200px - ' + document.getElementById('planta').clientWidth / 2 + 'px )' });
	imageZoom('planta', 'visor');
	$('#altura').html(' ' + aguacate.alturas[aguacate.alturas.length - 1] + ' cm');
	$('#tFrutos').html(' ' + parseInt(aguacate.produccion_total));
	$('#nroFrutos').html(' ' + parseInt(aguacate.produccion[aguacate.produccion.length - 1]));
	$('#tc').html(' ' + aguacate.tc);
	vida = aguacate.contadorViva >= 3 ? ' Muerta <i class="fas fa-skull"></i>' : ' Viva <i class="fas fa-grin-beam">';
	$('#vida').html(' ' + vida);
	$('#numMes').html('' + aguacate.mes);
}

function iterar() {
	aguacate.simulacion(parseFloat($('#agua').val()), parseFloat($('#abono').val()));
	actualizar();
	return false;
}

function reset() {
	aguacate = new Aguacate();
	actualizar();
}

$(document).ready(function() {
	setTimeout(function() {
		$('#preload').fadeOut();
		$('#body').css({ visibility: 'visible' });
	}, 1000);
	document.getElementById('form').addEventListener('submit', function() {
		iterar();
		return false;
	});
	sRandom();

	$('#resetB').click(function() {
		$('#confirm').modal();
	});

	$('#estadisticas').click(function() {
		[ data, layout ] = sActual();

		Plotly.newPlot('grafica', data, layout);
		$('#myModal').modal();
	});
	$('#tool1').tooltip();
	$('#tool2').tooltip();
});

// ---------------------------- Graficas--------------------
var dataR, layoutR;

function sRandom() {
	aguacateR = new Aguacate();
	for (let index = 1; index <= 144; index++) {
		aguacateR.simulacion(randomInRange(28, 40), (index == 1 ? -83 : 0) + randomInRange(83, 90));
	}
	for (let index = 145; index <= 360; index++) {
		aguacateR.simulacion(randomInRange(28, 40), randomInRange(0, 5));
	}
	// aguacateR.producido();

	var traceR = {
		x: aguacateR.meses,
		y: aguacateR.produccion,
		type: 'scatter',
		name: 'Produccion de aguacates'
	};

	var hR = {
		x: aguacateR.meses,
		y: aguacateR.alturas,
		type: 'scatter',
		name: 'Crecimiento planta de aguacate'
	};

	layoutR = {
		title: 'Simulacion Randomica',
		xaxis: {
			title: 'Tiempo'
		},
		yaxis: {
			title: 'Altura (CM)/Produccion'
		}
	};

	dataR = [ traceR, hR ];
	showRandom();
}

function sActual() {
	$('#randomB').css({ display: 'none' });
	var trace = {
		x: aguacate.meses,
		y: aguacate.produccion,
		type: 'scatter',
		name: 'Produccion de aguacates'
	};

	var h = {
		x: aguacate.meses,
		y: aguacate.alturas,
		type: 'scatter',
		name: 'Crecimiento planta de aguacate'
	};

	var layout = {
		title: 'Simulacion Actual',
		xaxis: {
			title: 'Tiempo'
		},
		yaxis: {
			title: 'Altura (CM)/Produccion'
		}
	};

	var data = [ trace, h ];

	return [ data, layout ];
}

function showRandom() {
	$('#randomB').css({ display: 'block' });
	Plotly.newPlot('grafica', dataR, layoutR);
}

function showIdeal() {
	$('#randomB').css({ display: 'none' });
	Plotly.newPlot('grafica', dataI, layoutI);
}

function showActual() {
	[ data, layout ] = sActual();
	Plotly.newPlot('grafica', data, layout);
}
