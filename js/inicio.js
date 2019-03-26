var aguacate = new Aguacate(); //Simulacion actual
var aguacateR = new Aguacate(); //Simulacion randomica

function imagen() {
	var altura = aguacate.alturas[aguacate.alturas.length - 1];
	var frutos = aguacate.produccion[aguacate.produccion.length - 1];
	var str = './imagenes/';

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
			} else {
				if (aguacate.mes == 0 && altura == 20) {
					str += 'Planta0';
				}
			}
		}
	}

	//Color de la planta segun pH
	//En contruccion

	return str + '.png';
}

function actualizar() {
	src = imagen();
	$('#planta').attr('src', src);
	imageZoom('planta', 'visor');
	$('#altura').html(' ' + aguacate.alturas[aguacate.alturas.length - 1] + ' cm');
	$('#nroFrutos').html(' ' + aguacate.produccion[aguacate.produccion.length - 1]);
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
	$('#preload').fadeOut();
	$('#body').css({'visibility':'visible'});
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
		aguacateR.simulacion(randomInRange(28, 40), 250 + (index - 1) * randomInRange(793, 873) / 10);
	}
	for (let index = 145; index <= 360; index++) {
		aguacateR.simulacion(randomInRange(28, 40), randomInRange(12241.2, 12249.2) / 10);
	}
	aguacateR.producido();

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
			title: 'Altura/Produccion'
		}
	};

	dataR = [ traceR, hR ];
	showRandom();
}

function sActual() {
	$('#randomB').css({ display: 'none' });
	aguacate.producido();
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
			title: 'Altura/Produccion'
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
