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

   
              //  showScene("welcome");
startBirthdayFireworks();
                //startTyping();

            },600);

        }

    },30);

}

/*fire work */


function startBirthdayFireworks() {

    const canvas = document.getElementById("fireworksCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    let fireworks = [];

    class Firework{
        constructor(){
            this.x=Math.random()*canvas.width;
            this.y=canvas.height;
            this.targetY=Math.random()*canvas.height/2;
            this.color=`hsl(${Math.random()*360},100%,60%)`;
            this.exploded=false;
            this.particles=[];
        }

        update(){
            if(!this.exploded){
                this.y-=6;
                if(this.y<=this.targetY){
                    this.explode();
                }
            }else{
                this.particles.forEach((p,index)=>{
                    p.x+=p.vx;
                    p.y+=p.vy;
                    p.life--;

                    if(p.life<=0){
                        this.particles.splice(index,1);
                    }
                });
            }
        }

        draw(){
            if(!this.exploded){
                ctx.beginPath();
                ctx.arc(this.x,this.y,3,0,Math.PI*2);
                ctx.fillStyle="white";
                ctx.fill();
            }else{
                this.particles.forEach(p=>{
                    ctx.beginPath();
                    ctx.arc(p.x,p.y,2,0,Math.PI*2);
                    ctx.fillStyle=this.color;
                    ctx.fill();
                });
            }
        }

        explode(){
            this.exploded=true;

            for(let i=0;i<80;i++){
                let angle=Math.random()*Math.PI*2;
                let speed=Math.random()*5+2;

                this.particles.push({
                    x:this.x,
                    y:this.y,
                    vx:Math.cos(angle)*speed,
                    vy:Math.sin(angle)*speed,
                    life:80
                });
            }
        }
    }

    function animate(){

        ctx.fillStyle="rgba(0,0,0,0.2)";
        ctx.fillRect(0,0,canvas.width,canvas.height);

        if(Math.random()<0.08){
            fireworks.push(new Firework());
        }

        fireworks.forEach((fw,index)=>{
            fw.update();
            fw.draw();

            if(fw.exploded && fw.particles.length===0){
                fireworks.splice(index,1);
            }
        });

        requestAnimationFrame(animate);
    }

    animate();

   setTimeout(() => {

    // Hide fireworks
    document.getElementById("fireworksCanvas").style.display = "none";

    // Show birthday page
    const birthday = document.getElementById("birthdaySection");

    birthday.style.display = "flex";

    // Small delay so the browser applies display:flex first
    setTimeout(() => {
        birthday.style.opacity = "1";
    }, 100);

}, 8000); // Fireworks duration

}

/*candle blow*/
function blowcandle() {
const flame = document.getElementById("flame");
const birthdaySection = document.getElementById("birthdaySection");
const button = document.getElementById("blowBtn");

    // Disable button after first click
    button.disabled = true;

    // Hide flame immediately
    flame.style.opacity = "0";

    // Optional: hide button
    button.style.display = "none";

    // Wait 2 seconds
    setTimeout(() => {

        // Fade out entire screen
        birthdaySection.style.transition = "opacity 2s ease";
        birthdaySection.style.opacity = "0";

        // Remove screen after fade
        setTimeout(() => {
            birthdaySection.style.display = "none";
 showGiftIntro();
            // Call your next function here
            // showMemories();
            // startGallery();
            // window.location.href = "gallery.html";

        }, 2000);

    }, 2000);

}

/* gift open message */

const messages = [

"Dear Vignesh,",

"Today isn't just your birthday...",

"It's the day the person who changed my life forever was born.💖",

"Thank you for every smile...💕",

"Every sacrifice...💕",

"Every laugh...💕",

"And every beautiful memory we've created together.💕"

];

function showGiftIntro(){

    const page=document.getElementById("giftPage");
    const msg=document.getElementById("giftMessage");

    page.style.display="flex";

    let i=0;

    function next(){

        if(i>=messages.length){

            msg.style.display="none";

            document.getElementById("giftBox").style.display="block";

            return;

        }

        msg.style.opacity=0;

        setTimeout(()=>{

            msg.innerHTML=messages[i];

            msg.style.opacity=1;

            i++;

            setTimeout(next,2500);

        },700);

    }

    next();

}
function giftboxopen(){

    document.getElementById("giftPage").style.opacity=0;

    setTimeout(()=>{

        document.getElementById("giftPage").style.display="none";

        startPhotoSlideshow();

    },1500);

}
