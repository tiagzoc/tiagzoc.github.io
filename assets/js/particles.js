const canvas = document.createElement("canvas");
document.getElementById("particles").appendChild(canvas);

const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for(let i=0;i<80;i++){
particles.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
r:Math.random()*2,
vx:(Math.random()-0.5)*0.5,
vy:(Math.random()-0.5)*0.5
});
}

function animate(){

ctx.clearRect(0,0,canvas.width,canvas.height);

ctx.fillStyle="#8f6bff";

particles.forEach(p=>{

p.x+=p.vx;
p.y+=p.vy;

ctx.beginPath();
ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
ctx.fill();

});

requestAnimationFrame(animate);

}

animate();