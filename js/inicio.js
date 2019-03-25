
$(document).ready(function(){
    var aguacate = new Aguacate();
    
    $("#estadisticas").click(function(){
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
            title: 'Proyecto de simulacion',
            xaxis: {
                title: 'Tiempo'
            },
            yaxis: {
                title: 'Altura/Produccion'
            }
        };
        
        var labels = [ 'Television', 'Newspaper', 'Internet', 'Radio' ];
        
        var data = [ trace, h ];
        
        Plotly.newPlot('myDiv', data, layout);
        $("#myModal").modal();
    });
});