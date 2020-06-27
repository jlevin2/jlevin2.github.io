$(document).ready(function(){
    var w = $(document).width();

    var width  = w;
    var height = 0.65*(w/2);


    var projection = d3.geoAlbersUsa()
        .translate([width/2, height/2])
        .scale([1000*(w/1500)]);

// Define path generator
    var path = d3.geoPath()
        .projection(projection);

    var color = d3.scaleLinear().range([["rgb(213,222,217)","rgb(69,173,168)","rgb(84,36,55)","rgb(217,91,67)"]]);

//Create SVG element and append map to the SVG
    var svg = d3.select("#map")
        .append("svg")
        .attr("width", width)
        .attr("height", height);


    d3.json("us-states.json").then(function(json) {
        svg.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("d", path)
            .style("stroke", "#000000")
            .style("stroke-width", "1")
            .style("fill", "rgb(87,87,87)")
    });


    d3.csv("locations.csv").then(function (data) {
        console.log(data)
        svg.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", function(d) {
                return projection([d.lon, d.lat])[0];
            })
            .attr("cy", function(d) {
                return projection([d.lon, d.lat])[1];
            })
            .attr("r", function(d) {
                return 2;
            })
            .style("fill", "rgb(217,91,67)")
            .style("opacity", 1.0)

    });

});


// // Append Div for tooltip to SVG
// var div = d3.select("body")
//     .append("div")
//     .attr("class", "tooltip")
//     .style("opacity", 0);