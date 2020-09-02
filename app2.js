function displayMetaData(samples) {
    d3.json("samples.json").then((dataSet) => {
        var metadata = dataSet.metadata;
        console.log(metadata);
        var result_arr = metadata.filter(samplesobj => samplesobj.id == samples);
        var results = result_arr[0];
        var display = d3.select("#sample-metadata"); 
        display.html("");

        Object.entries(results).forEach(([key, value]) => {
            display.append("h6").text(`${key.toUpperCase()}: ${value}`)
            
        });

    });

}

function init(){
    var selectid = d3.select("#selDataset");

    d3.json("samples.json").then((dataSet) => {
        var names = dataSet.names;
        console.log(names)
        names.forEach((samples) => {
            selectid.append("option")
            .text(samples)
            .property("values", samples);
        });

        var firstsample = names[0];
        displayMetaData(firstsample);
        displayCharts(firstsample);
        displayBarChart(firstsample);
        
        
    });
}

init();

function optionChanged(samples) {
    displayMetaData(samples);
    displayCharts(samples);
    displayBarChart(samples);
}

function displayCharts(samples) {
    d3.json("samples.json").then((dataSet) => {
        var chartsamples = dataSet.samples;
        var result_arr = chartsamples.filter(samplesobj => samplesobj.id == samples);
        var results = result_arr[0];
        var otu_ids = results.otu_ids;
        var otu_labels = results.otu_labels;
        var samples_values = results.sample_values;

        var bubble_data = [{
            x: otu_ids,
            y: samples_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: samples_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        }];
        
        Plotly.newPlot("bubble", bubble_data);

    
});
}

function displayBarChart(samples) {
    d3.json("samples.json").then((dataSet) => {
        var barchartsamples = dataSet.samples;
        var result_arr = barchartsamples.filter(samplesobj => samplesobj.id == samples);
        var results = result_arr[0];
        var otu_id = results.otu_ids.slice(0, 10);
        var otu_label = results.otu_labels.slice(0, 10);
        var samples_value = results.sample_values.slice(0, 10);

        var barchart = [{
            x: samples_value,
            y: otu_id,
            text: otu_label,
            type: "bar",
            marker: {
                color: "#1978B5"
            },
            orientation: "h"    
                
        }];
        var data = barchart;

        var layout = {
            title: "Top 10 Microbes (OTUs) Found",
            showlegend: false,
            height: 600,
            width: 400,
            
        yaxis: {
          autorange: "reversed" 
        }
    };
    
    Plotly.newPlot("bar", data, layout);


});
}