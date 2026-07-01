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
               hideScene("loading");
              //  showScene("welcome");
//startBirthdayFireworks();
                //startTyping();

            },600);

        }

    },30);

}
