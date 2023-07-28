// // url
const url =
    "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// json
const dataPromise = d3.json(url);
    console.log("Data Promise: ", dataPromise);

d3.json(url).then(function(data){
    console.log(data);
});
// variables
var samples;
var metadata;
d3.json(url).then(function (data) {
    let selectId = d3.select("#selDataset");
    samples = data.samples;
    metadata = data.metadata;
    data.names.forEach((id) => {
        selectId.append("option").text(id).property("value", id);
    });
    barChart(samples[0]);
    bubble(samples[0]);
    demoInfo(metadata[0]);
});

function dropDown(value) {
    const currentId = samples.find((item) => item.id === value);
    const demographicInfo = metadata.find((item) => item.id == value);

    demoInfo(demographicInfo);
    barChart(currentId);
    bubble(currentId);

}
// bar chart
function barChart(currentId) {
    let xAxis = currentId.sample_values.slice(0, 10).reverse();
    let yAxis = currentId.otu_ids
        .slice(0, 10)
        .reverse()
        .map((item) => `OTU ${item}`);
    let text = currentId.otu_labels.slice(0, 10).reverse();

    barChart = {
        x: xAxis,
        y: yAxis,
        text: text,
        type: "bar",
        orientation: "h",
    };

    let chart = [barChart];

    let layout = {
        margin: {
            l: 100,
            r: 100,
            t: 0,
            b: 100,
        },
        height: 500,
        width: 600,
    };

    Plotly.newPlot("bar", chart, layout);
}
// bubble chart
function bubble(currentId) {
    let xAxis = currentId.otu_ids;
    let yAxis = currentId.sample_values;
    let text = currentId.otu_labels;
    let markerSize = currentId.sample_values;
    let color = currentId.otu_ids;
    
    bubbleTrace = {
        x: xAxis,
        y: yAxis,
        text: text,
        mode: "markers",
        marker: {
            color: color,
            colorscale: "Earth",
            size: markerSize,
        },
        type: "scatter",
    };
    let chart = [bubbleTrace];

    let layout = {
        xaxis: {
            title: { text: "OTU ID" },
        },
    };
    Plotly.newPlot("bubble", chart, layout);
}

//demographic info section
function demoInfo(demographicInfo) {
    let demoSelect = d3.select("#sample-metadata");

    demoSelect.html(
        `id: ${demographicInfo.id} <br>
      ethnicity: ${demographicInfo.ethnicity} <br>
    gender: ${demographicInfo.gender} <br>
    age: ${demographicInfo.age} <br>
    location: ${demographicInfo.location} <br>
    bbtype: ${demographicInfo.bbtype} <br>
    wfreq: ${demographicInfo.wfreq}`
    );
}

document.getElementById("selDataset").addEventListener("change", function () {
    const selectedValue = this.value;
    dropDown(selectedValue);
});
