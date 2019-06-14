const n = 16;
const balls = new Array(n).fill(1).map( (d, i) => { return i+1; } );
var current_balls = balls;
const k = 2*Math.PI/n;
const R = 200, r = R/10;
const w = 600, h = 600;

var index = 0;

const init = function() {
  var svg = d3.select("body").append("svg").attr("width", w).attr("height", h);
  
  var circles = svg.append("g").attr("id", "groupOfBalls")
    .selectAll("cirle")
    .data(balls)
    .enter().append("circle")
    .attr("cx", (d) => { return w/2 - R*Math.cos((d-1)*k); })
    .attr("cy", (d) => { return h/2 - R*Math.sin((d-1)*k); })
    .attr("r",  r)
    .attr("fill", "blue");

  var labels = svg.append("g").attr("id", "groupOfLabels")
    .selectAll("text")
    .data(balls)
    .enter().append("text")
    .attr("x", (d) => { return w/2 - R*Math.cos((d-1)*k); })
    .attr("y", (d) => { return h/2 - R*Math.sin((d-1)*k); })
    .text( (d) => { return d; } )
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .attr("fill", "white")
    .attr("font-family", "sans-serif")
    .attr("font-size", "10px");

  d3.select("circle:nth-child(" + balls[index] + ")").attr("fill", "green");
}

const move = function() {
  let l = current_balls.length;
  if ( l === 1 ) {
    return false;
  } else {
    let active_ball = current_balls[index];
    index = (index+1) % l;
    let dismissed_ball = current_balls.splice(index, 1)[0];
    l--;
    index = index % l;
    let next_active_ball = current_balls[index];

    d3.select("circle:nth-child(" + active_ball + ")").attr("fill", "blue");
    d3.select("circle:nth-child(" + dismissed_ball + ")")
      .transition()
        .attr("delay", () => { return 200; })
        .attr("duration", () => { return 9000; })
        .attr("fill", "red")
        .attr("r", 0.5*r)
        .attr("cx", (d) => { return w/2 - (R+3*r)*Math.cos((d-1)*k); })
        .attr("cy", (d) => { return h/2 - (R+3*r)*Math.sin((d-1)*k); });

    d3.select("circle:nth-child(" + next_active_ball + ")").attr("fill", "green");

    d3.select("text:nth-child(" + dismissed_ball + ")")
      .transition()
        .attr("delay", () => { return 200; })
        .attr("duration", () => { return 9000; })
        .attr("x", (d) => { return w/2 - (R+3*r)*Math.cos((d-1)*k); })
        .attr("y", (d) => { return h/2 - (R+3*r)*Math.sin((d-1)*k); });

    return true;
  }
}

const play = function() {
  setTimeout( () => { 
    if (move()) {
      play();
    } else {
      console.log("winner");
    } 
  }, 1000 );
}

init();
play();

