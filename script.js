window.addEventListener("load", () => {

    showLoading();

});

/* ==========================================
Loading Screen
========================================== */

function showLoading(){

    const loading=document.getElementById("loading");

    if(!loading) return;

    let percent=0;

    const text=document.getElementById("loadingText");

    const bar=document.getElementById("loadingBar");

    const timer=setInterval(()=>{

        percent++;

        if(text)
            text.innerHTML=percent+"%";

        if(bar)
            bar.style.width=percent+"%";

        if(percent>=100){

            clearInterval(timer);

            setTimeout(()=>{
              document.getElementById("loading").style.display="none";

    startFireworks();
              //  showScene("welcome");
//startBirthdayFireworks();
                //startTyping();

            },600);

        }

    },30);

}
/*fire work */
const canvas = document.getElementById("fireworksCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const fireworks = [];

class Firework {

    constructor() {

        this.x = Math.random() * canvas.width;
        this.y = canvas.height;

        this.targetY = 100 + Math.random() * (canvas.height / 2);

        this.color = `hsl(${Math.random() * 360},100%,60%)`;

        this.particles = [];

        this.exploded = false;

    }

    update() {

        if (!this.exploded) {

            this.y -= 8;

            if (this.y <= this.targetY) {

                this.explode();
                this.exploded = true;

            }

        }

        for (let i = this.particles.length - 1; i >= 0; i--) {

            const p = this.particles[i];

            p.x += p.vx;
            p.y += p.vy;

            p.vy += 0.05;

            p.alpha -= 0.015;

            if (p.alpha <= 0) {

                this.particles.splice(i, 1);

            }

        }

    }

    explode() {

        for (let i = 0; i < 100; i++) {

            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 5 + 2;

            this.particles.push({

                x: this.x,
                y: this.y,

                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,

                alpha: 1

            });

        }

    }

    draw() {

        if (!this.exploded) {

            ctx.beginPath();
            ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);

            ctx.fillStyle = this.color;
            ctx.fill();

        }

        this.particles.forEach(p => {

            ctx.globalAlpha = p.alpha;

            ctx.beginPath();
            ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);

            ctx.fillStyle = this.color;
            ctx.fill();

        });

        ctx.globalAlpha = 1;

    }

}

let animationId;

function animateFireworks() {

    ctx.fillStyle = "rgba(0,0,0,.18)";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    if (Math.random() < 0.08) {

        fireworks.push(new Firework());

    }

    for (let i = fireworks.length - 1; i >= 0; i--) {

        fireworks[i].update();
        fireworks[i].draw();

        if (fireworks[i].exploded && fireworks[i].particles.length === 0) {

            fireworks.splice(i,1);

        }

    }

    animationId = requestAnimationFrame(animateFireworks);

}

function startFireworks(){

    canvas.style.display = "block";

    animateFireworks();

    setTimeout(() => {

        cancelAnimationFrame(animationId);

        canvas.style.opacity = "0";
        canvas.style.transition = "opacity 2s ease";

        setTimeout(() => {

            canvas.style.display = "none";

            // Show Birthday Screen
            document.getElementById("birthdaySection").style.display = "flex";

        },2000);

    },8000);

}
