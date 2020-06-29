$('#mapcol').ready(function(){
    var width = $('#mapcol').width();
    var height = $('#mapcol').height();

    // var width  = w/2.5;
    // var height = 0.55*(w/2);
    var geoscale = Math.min(1000*(width/850), 1000*(height/475))
    var projection = d3.geoAlbersUsa()
        .translate([width/2, height/2])
        .scale([geoscale]);

    var smalldot = Math.round(geoscale / 150);
    var star = Math.round(geoscale / 75);

// Define path generator
    var path = d3.geoPath()
        .projection(projection);

    var color = d3.scaleLinear().range([["rgb(213,222,217)","rgb(69,173,168)","rgb(84,36,55)","rgb(217,91,67)"]]);

//Create SVG element and append map to the SVG
    var svg = d3.select("#map")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    var div = d3.select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);


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
        // console.log(data)
        svg.selectAll("circle")
            .data(data)
            .enter()
            .append("a")
            .attr("href", function (d) {
                return "#" +d.link;
            })
            .attr("id", function (d) {
                return d.link + "dot";
            })
            .append("circle")
            .attr("cx", function(d) {
                return projection([d.lon, d.lat])[0];
            })
            .attr("cy", function(d) {
                return projection([d.lon, d.lat])[1];
            })
            .attr("r", function(d) {
                return smalldot;
            })
            .style("fill", "rgb(217,91,67)")
            .style("opacity", 1.0)
            // .on("mouseover", function(d) {
            //     div.transition()
            //         .duration(200)
            //         .style("opacity", .9);
            //     div.text(d.name)
            //         .style("left", (d3.event.pageX) + "px")
            //         .style("top", (d3.event.pageY - 28) + "px");
            // })
            // // fade out tooltip on mouse out
            // .on("mouseout", function(d) {
            //     div.transition()
            //         .duration(500)
            //         .style("opacity", 0);
            // })
        ;
    });

});


// // Append Div for tooltip to SVG
// var div = d3.select("body")
//     .append("div")
//     .attr("class", "tooltip")
//     .style("opacity", 0);