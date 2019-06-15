const n = 11;
const balls = new Array(n).fill(1).map( (d, i) => { return i+1; } );
const k = 2*Math.PI/n;
const R = 200, r = R/10;
const w = 600, h = 600;
const blue = "#5592fc";
const red = "#fc5555";
const green = "#97ef83";

var index = 0;

const init = function() {
  var svg = d3.select("body").append("svg").attr("width", w).attr("height", h);
  
  var players = svg.append("g").attr("id", "groupOfPlayers")
    .selectAll("svg")
    .data(balls)
    .enter().append("svg").classed("player", true)
      .attr("overflow", "visible")
      .attr("x", (d) => { return w/2 - R*Math.cos((d-1)*k); })
      .attr("y", (d) => { return h/2 - R*Math.sin((d-1)*k); })

  var circles = players.append("circle")
    .attr("r",  r)
    .attr("fill", blue);

  var labels = players.append("text")
    .text( (d) => { return d; } )
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .attr("fill", "white")
    .attr("font-family", "sans-serif")
    .attr("font-size", "10px");

  d3.select("circle:nth-child(" + balls[index] + ")").attr("fill", green);
}

const move = function() {
  let l = balls.length;
  if ( l === 1 ) {
    return false;
  } else {
    let active_ball = d3.select(".player:nth-child(" + balls[index] + ") circle")
    index = (index+1) % l;
    let dismissed_ball = d3.select(".player:nth-child(" + balls.splice(index, 1)[0] + ")")
    l--;
    index = index % l;
    let next_active_ball = d3.select(".player:nth-child(" + balls[index] + ") circle")

    active_ball.transition()
      .attr("delay", 200)
      .attr("duration", 1000)
      .attr("fill", blue);

    dismissed_ball.transition()
      .attr("delay", 200)
      .attr("duration", 1000)
      .attr("x", (d) => { return w/2 - (R+3*r)*Math.cos((d-1)*k); })
      .attr("y", (d) => { return h/2 - (R+3*r)*Math.sin((d-1)*k); });

    dismissed_ball.select("circle").transition()
      .attr("delay", 200)
      .attr("duration", 1000)
      .attr("fill", red)
      .attr("r", 0.5*r);

    next_active_ball.transition()
      .attr("delay", 200)
      .attr("duration", 1000)
      .attr("fill", green);

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
  }, 1500 );
}

init();
play();

