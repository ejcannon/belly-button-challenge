// Read in the JSON
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

let bioDiversity = d3.json(url);
console.log(bioDiversity);

// Initialized arrays
//let sample_values = []
//let otu_ids = []
//let otu_labels = []

let data = bioDiversity.samples;
//let result = data[0];
//let otu_ids = result.otu_ids;

console.log(data)
// For loop to populate arrays
//for (let i = 0; i<bioDiversity.length; i++){
  //  row = bioDiversity.samples[i];
    //otu_ids.push(row.otu_ids);
    //sample_values.push(row.sample_values);
    //otu_labels.push(row.otu_labels);
//}
//console.log(sample_values, otu_ids, otu_labels)