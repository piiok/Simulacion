var aguacate = new Aguacate(); //Simulacion actual
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
    Plotly.newPlot('sActual', dataR, layoutR);
}

function showIdeal(){
    $("#randomB").css({'display':'none'});
    Plotly.newPlot('sActual', dataI, layoutI);
}

function showActual(){
    [data , layout] = sActual();
    Plotly.newPlot('sActual', data, layout);
}

$(document).ready(function(){
    
    sRandom();

    $("#estadisticas").click(function(){
        [data , layout] = sActual();
        
        Plotly.newPlot('sActual', data, layout);
        $("#myModal").modal();
    });
});