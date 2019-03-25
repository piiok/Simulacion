function normalDist(media) {
	normal = [
		0.00135 * media,
		0.0214 * media,
		0.1359 * media,
		0.3413 * media,
		media,
		media + 0.3413 * media,
		media + 0.1359 * media,
		media + 0.0214 * media,
		media + 0.00135 * media
	];
	return normal;
}

function randomInRange(start, end) {
	return Math.floor(Math.random() * (end - start + 1) + start);
}

class Aguacate {
	constructor() {
		this.alturas = [ 0 ];
		this.altura = 0;
		this.meses = [ 0 ];
		this.mes = 1;
		this.ph = 6;
		this.tc = 1;
		this.contadorViva = 0;
		this.produccion = [ 0 ];
		this.produccion_total = 0;
	}

	pH(agua, abono) {
		const idealAgua = 34;
		const desvAgua = normalDist(idealAgua);

		const idealAbono = this.mes > 144 ? 12245.2 : 250 + 83.3 * this.mes;
		const desvAbono = normalDist(idealAbono);

		this.phAgua(agua, idealAgua, desvAgua);
		this.phAbono(abono, idealAbono, desvAbono);
	}

	phAgua(agua, idealAgua, desvAgua) {
		if (agua == idealAgua) {
			this.ph = this.ph;
		} else if (desvAgua[3] <= agua && agua <= desvAgua[5]) {
			this.ph = desvAgua[3] <= agua && agua <= desvAgua[4] ? this.ph * 1.025 : this.ph * 0.975;
		} else if ((desvAgua[2] <= agua && agua < desvAgua[3]) || (desvAgua[5] < agua && agua <= desvAgua[6])) {
			if (desvAgua[2] <= agua && agua < desvAgua[3]) {
				this.ph = this.ph * 1.075;
			} else if (desvAgua[5] < agua && agua <= desvAgua[6]) {
				this.ph = this.ph * 0.925;
			}
		} else if ((desvAgua[1] <= agua && agua < desvAgua[2]) || (desvAgua[6] < agua && agua <= desvAgua[7])) {
			if (desvAgua[1] <= agua && agua < desvAgua[2]) {
				this.ph = this.ph * 1.13;
			} else if (desvAgua[6] < agua && agua <= desvAgua[7]) {
				this.ph = this.ph * 0.87;
			}
		} else if ((desvAgua[0] <= agua && agua < desvAgua[1]) || (desvAgua[7] < agua && agua <= desvAgua[8])) {
			if (desvAgua[0] <= agua && agua < desvAgua[1]) {
				this.ph = this.ph * 1.2;
			} else if (desvAgua[7] < agua && agua <= desvAgua[8]) {
				this.ph = this.ph * 0.8;
			}
		}
	}

	phAbono(abono, idealAbono, desvAbono) {
		if (abono == idealAbono) {
			this.ph = this.ph;
		} else if (desvAbono[3] <= abono && abono <= desvAbono[5]) {
			this.ph = desvAbono[3] <= abono && abono <= desvAbono[4] ? this.ph * 1.025 : this.ph * 0.975;
		} else if ((desvAbono[2] <= abono && abono < desvAbono[3]) || (desvAbono[5] < abono && abono <= desvAbono[6])) {
			if (desvAbono[2] <= abono && abono < desvAbono[3]) {
				this.ph = this.ph * 1.075;
			} else if (desvAbono[5] < abono && abono <= desvAbono[6]) {
				this.ph = this.ph * 0.925;
			}
		} else if ((desvAbono[1] <= abono && abono < desvAbono[2]) || (desvAbono[6] < abono && abono <= desvAbono[7])) {
			if (desvAbono[1] <= abono && abono < desvAbono[2]) {
				this.ph = this.ph * 1.13;
			} else if (desvAbono[6] < abono && abono <= desvAbono[7]) {
				this.ph = this.ph * 0.87;
			}
		} else if ((desvAbono[0] <= abono && abono < desvAbono[1]) || (desvAbono[7] < abono && abono <= desvAbono[8])) {
			if (desvAbono[0] <= abono && abono < desvAbono[1]) {
				this.ph = this.ph * 1.2;
			} else if (desvAbono[7] < abono && abono <= desvAbono[8]) {
				this.ph = this.ph * 0.8;
			}
		}
	}

	simulacion(agua, abono) {
		if (this.contadorViva != 3) {
			this.pH(agua, abono);
			this.Tc();
			switch (true) {
				// Etapa crecimiento
				case this.mes <= 48:
					this.alturas.push(
						this.alturas[this.mes - 1] +
							this.tc * (Math.exp(0.131 * this.mes) - 1 - this.alturas[this.mes - 1])
					);
					this.altura =
						this.alturas[this.mes - 1] +
						this.tc * (Math.exp(0.131 * this.mes) - 1 - this.alturas[this.mes - 1]);
					break;
				// Etapa produccion
				case this.mes <= 144:
					this.alturas.push(
						this.alturas[this.mes - 1] +
							this.tc * (1016 * Math.log(this.mes) - 3300 - this.alturas[this.mes - 1])
					);
					this.altura =
						this.alturas[this.mes - 1] +
						this.tc * (Math.exp(0.131 * this.mes) - 1 - this.alturas[this.mes - 1]);
					break;
				// Etapa adultez
				case this.mes <= 360:
					this.alturas.push(
						this.alturas[this.mes - 1] +
							this.tc * (1364 * Math.log(this.mes) - 5029.8 - this.alturas[this.mes - 1])
					);
					this.altura =
						this.alturas[this.mes - 1] +
						this.tc * (Math.exp(0.131 * this.mes) - 1 - this.alturas[this.mes - 1]);
					break;
			}
			this.producir();
		} else {
			this.alturas.push(this.altura);
		}
		this.meses.push(this.mes);
		this.mes++;
	}

	Tc() {
		if (5.5 <= this.ph && 6.5 >= this.ph) {
			//pH ideal y muy bueno
			this.tc = 1;
		} else if ((5 <= this.ph && this.ph < 5.5) || (6.5 < this.ph && this.ph <= 7)) {
			//pH bueno
			this.tc = 0.8;
		} else if ((4.5 <= this.ph && this.ph < 5) || (7 < this.ph && this.ph <= 7.5)) {
			//pH ragula
			this.tc = 0.6;
		} else if ((4 <= this.ph && this.ph < 4.5) || (7.5 < this.ph && this.ph <= 8)) {
			// pH malo
			this.tc = 0.5;
		} else {
			// pH muy malo
			this.tc = 0;
			this.contadorViva++;
		}
	}

	producir() {
		if (this.alturas[this.mes] >= 540) {
			if (this.mes % 12 <= 5) {
				const exito = randomInRange(43, 80) / 100;
				const produccion = exito * parseInt(812.5 / 5);
				this.produccion.push(produccion);
			} else {
				this.produccion.push(0);
			}
			this.aux++;
		} else if (this.alturas[this.mes] >= 1750) {
			if (this.mes % 12 <= 5) {
				const exito = randomInRange(20, 80) / 100;
				const produccion = exito * parseInt(812.5 / 5);
				this.produccion.push(produccion);
			} else {
				this.produccion.push(0);
			}
			this.aux++;
		} else {
			this.produccion.push(0);
		}
	}

	producido() {
		for (let index = 0; index < this.produccion.length; index++) {
			this.produccion_total += this.produccion[index];
		}
	}
}

var aguacateI = new Aguacate();
for (let index = 1; index <= 360; index++) {
	aguacateI.simulacion(34, 250 + index * 83.3);
}
aguacateI.producido();

var traceI = {
	x: aguacateI.meses,
	y: aguacateI.produccion,
	type: 'scatter',
	name: 'Produccion de aguacates'
};

var hI = {
	x: aguacateI.meses,
	y: aguacateI.alturas,
	type: 'scatter',
	name: 'Crecimiento planta de aguacate'
};

var layoutI = {
	title: 'Simulacion Ideal',
	xaxis: {
		title: 'Tiempo'
	},
	yaxis: {
		title: 'Altura/Produccion'
	}
};

var labelsI = [ 'Television', 'Newspaper', 'Internet', 'Radio' ];

var dataI = [ traceI , hI ];
