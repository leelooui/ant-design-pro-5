// https://observablehq.com/@mbostock/floating-landmasses@48
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Floating Landmasses

This gives the appearance of floating by changing the scale and clip angle of an [orthographic projection](/@mbostock/d3-orthographic-projection). Inspired by Derek Watkin’s [Faux-3D Arcs](https://bl.ocks.org/dwtkns/4973620).`
)});
  main.variable(observer("canvas")).define("canvas", ["DOM","width","height","d3","sphere","land","graticule"], function*(DOM,width,height,d3,sphere,land,graticule)
{
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
    context.strokeStyle = "#000";
    context.stroke();
    context.beginPath();
    path(land);
    context.filter = "blur(6px)";
    context.fillStyle = "rgba(0,0,0,0.4)";
    context.fill();
    context.filter = "none";
    context.beginPath();
    path(graticule);
    context.lineWidth = 0.5;
    context.strokeStyle = "rgba(0,0,0,0.2)";
    context.stroke();

    projection.scale(width / 2.2).clipAngle(107);
    context.beginPath();
    path(land);
    context.fillStyle = "#737368";
    context.fill();

    projection.scale(width / 2.2).clipAngle(90);
    context.beginPath();
    path(land);
    context.fillStyle = "#dadac4";
    context.fill();

    yield context.canvas;
  }
}
);
  main.variable(observer("height")).define("height", ["width"], function(width){return(
width
)});
  main.variable(observer("sphere")).define("sphere", function(){return(
{type: "Sphere"}
)});
  main.variable(observer("graticule")).define("graticule", ["d3"], function(d3){return(
d3.geoGraticule10()
)});
  main.variable(observer("land")).define("land", ["topojson","world"], function(topojson,world){return(
topojson.feature(world, world.objects.land)
)});
  main.variable(observer("world")).define("world", function(){return(
fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/land-110m.json").then(response => response.json())
)});
  main.variable(observer("topojson")).define("topojson", ["require"], function(require){return(
require("topojson-client@3")
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3-geo@1")
)});
  return main;
}
