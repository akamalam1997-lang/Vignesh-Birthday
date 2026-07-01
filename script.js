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
/* image */
const photos = [
{
    title:"❤️ A Moment That Changed Everything 💍",
    image:"https://github.com/user-attachments/assets/6f551680-f558-439e-aa04-ee7ad43f9e73"
},
{
    title:"💕 Bound by Love",
    image:"https://github.com/user-attachments/assets/2d321fc7-2d53-44b0-bef1-44e07d3f5c45"
},

{
    title:"😂 Copy... Paste... Perfect!",
    image:"https://github.com/user-attachments/assets/b8fa9add-76f7-4454-b530-b63b59239012"
},

{
    title:"💖 Your Happiest Chapter Began Here",
    image:"https://github.com/user-attachments/assets/999397fd-daa0-4105-be80-1fda2552bc74"
},

{
    title:"🥰 I Married One, Now I Have Two!",
    image:"https://github.com/user-attachments/assets/a831713a-d374-48f0-998b-44bc1e42760b"
},
{
    title:"🏡 Waiting for This Dream to Come True.",
    image:"https://github.com/user-attachments/assets/68a60bda-b9fc-402a-b880-31b3197ec478"
}
];
let slideInterval;

function startPhotoSlideshow() {

    const slider = document.getElementById("photoSlider");
    const image = document.getElementById("slideImage");
    const title = document.getElementById("slideTitle");

    slider.style.display = "flex";

    let index = 0;

 function showSlide() {

    // Fade out current slide
    title.style.opacity = "0";
    image.parentElement.style.opacity = "0";
    image.parentElement.style.transform = "scale(0.95)";

    setTimeout(() => {

        // Preload the next image
        const nextImg = new Image();
        nextImg.src = photos[index].image;

        nextImg.onload = () => {

            // Update content only after image is loaded
            title.innerHTML = photos[index].title;
            image.src = nextImg.src;

            // Fade in together
            title.style.opacity = "1";
            image.parentElement.style.opacity = "1";
            image.parentElement.style.transform = "scale(1)";

            index++;

            if (index >= photos.length) {
                clearInterval(slideInterval);
document.getElementById("finalPage").style.display="flex";

    startFinalHearts();
//setTimeout(()=>{

  //  showEndingScreen();

//},1000);
                // Optional: Call your next function here
                // showFinalMessage();

                return;
            }
        };

    }, 700);
}

    showSlide();
//if (index == photos.length) {
  //  slideInterval = setInterval(showSlide, 25000);
//}
    //else
//{
    slideInterval = setInterval(showSlide, 20000);
//}
}
// Floating hearts for final page
function startFinalHearts() {

    setInterval(() => {

        const heart = document.createElement("div");

        heart.className = "finalHeart";

        heart.innerHTML = "🤍";

        heart.style.left = Math.random() * 100 + "%";

        heart.style.fontSize = (15 + Math.random() * 25) + "px";

        document.getElementById("finalHearts").appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 8000);

    }, 500);

}
