// https://observablehq.com/@mbostock/floating-landmasses@48
export default function define(runtime, observer) {
  const main = runtime.module(); 
  main.variable(observer("canvas")).define("canvas", ["DOM","width","height","d3","sphere","land","graticule"], function*(DOM,width,height,d3,sphere,land,graticule)
{

  width=400
  height=400
  const context = DOM.context2d(width, height);

  const projection = d3.geoOrthographic()
      .translate([width / 2, height / 2])
      .precision(0.5);

  const path = d3.geoPath(projection, context);

  while (true) {
    context.clearRect(0, 0, width, height);
    projection.rotate([Date.now() * -2e-3, -15]);
  
    projection.scale(width / 2.3).clipAngle(90);
    context.beginPath();
    path(sphere);
    context.lineWidth = 1.5;
    context.strokeStyle = "#1890ff";
    context.stroke();
    context.beginPath();
    path(land);
    context.filter = "blur(6px)";
    context.fillStyle = "#red"; 
    context.fill();
    context.filter = "none";
    context.beginPath();
    path(graticule);
    context.lineWidth = 0.5;
    context.strokeStyle = "#4264fb"; // 线
    context.stroke();

    projection.scale(width / 2.2).clipAngle(107);
    context.beginPath();
    path(land);
    context.fillStyle = "#000";
    context.fill();

    projection.scale(width / 2.2).clipAngle(90);
    context.beginPath();
    path(land);
    context.fillStyle = "#4264fb";
    context.fill();

    yield context.canvas;
  }
}
);
  main.variable().define("height", ["width"], function(width){return(
width
)});
  main.variable().define("sphere", function(){return(
{type: "Sphere"}
)});
  main.variable().define("graticule", ["d3"], function(d3){return(
d3.geoGraticule10()
)});
  main.variable().define("land", ["topojson","world"], function(topojson,world){return(
topojson.feature(world, world.objects.land)
)});
  main.variable().define("world", function(){return(
fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/land-110m.json").then(response => response.json())
)});
  main.variable().define("topojson", ["require"], function(require){return(
require("topojson-client@3")
)});
  main.variable().define("d3", ["require"], function(require){return(
require("d3-geo@1")
)});
  return main;
}
