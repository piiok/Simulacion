var aguacate = new Aguacate(); //Simulacion actual

function actualizar(){
    $("#altura").html(" "+aguacate.alturas[aguacate.alturas.length - 1]+" Cm");
    $("#nroFrutos").html(" "+aguacate.produccion[aguacate.produccion.length - 1]);
    $("#tc").html(" "+aguacate.tc);
    $("#viva").html(" "+(aguacate.contadorViva>=3)?" No":" Si");
    $("#numMes").html(""+aguacate.mes); 
}

function iterar(){
    aguacate.simulacion( parseFloat($("#agua").value) , parseFloat($("#abono").value ));
    actualizar();
    return false;
}

function reset(){
    aguacate = new Aguacate();
    actualizar();
}

$(document).ready(function(){

    document.getElementById('form').addEventListener('submit',function(){ iterar(); return false; });

    sRandom();

    $("#estadisticas").click(function(){
        [data , layout] = sActual();
        
        Plotly.newPlot('grafica', data, layout);
        $("#myModal").modal();
    });
});

// ---------------------------- Graficas--------------------
var dataR, layoutR;

function sRandom(){
    var aguacateR = new Aguacate();
    for (let index = 1; index <= 360; index++) {
        aguacateR.simulacion(randomInRange(28,40), 250 + index * 83.3);
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

    var labelsR = [ 'Television', 'Newspaper', 'Internet', 'Radio' ];

    dataR = [ traceR , hR ];
    showRandom();
}

function sActual(){
    $("#randomB").css({'display':'none'});
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
    
    var labels = [ 'Television', 'Newspaper', 'Internet', 'Radio' ];
    
    var data = [ trace, h ];

    return [data, layout]
}

function showRandom(){
    $("#randomB").css({'display':'block'});
    Plotly.newPlot('grafica', dataR, layoutR);
}

function showIdeal(){
    $("#randomB").css({'display':'none'});
    Plotly.newPlot('grafica', dataI, layoutI);
}

function showActual(){
    [data , layout] = sActual();
    Plotly.newPlot('grafica', data, layout);
}

