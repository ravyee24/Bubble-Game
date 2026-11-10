const text_btn = document.getElementById("taptoplay")
const timer_btn = document.getElementById("timer")
const reward = document.getElementById("reward")
const playarea = document.getElementById("playing")
const gamepopup = document.getElementById("gamepopup");
const finalscore = document.getElementById("finalscore");
const resumebtn = document.getElementById("resumebtn");
const restartpopup = document.getElementById("restartpopup");
const confirmresume = document.getElementById("confirmresume");
const confirmrestart = document.getElementById("confirmrestart");


//for bubble generation
let bubbleinterval;
let score = 0;
let gamePaused = false;
function generateBubble(){

        const colors = [
                    "#FF6B6B", // Coral (Red + Orange)
                    "#9B59B6", // Amethyst (Purple + Blue)
                    "#1ABC9C", // Turquoise (Green + Blue)
                    "#F39C12", // Golden Orange (Yellow + Orange)
                    "#E84393", // Pink (Red + Purple)
                    "#6C5CE7", // Violet (Blue + Purple)
                    "#00CEC9", // Aqua (Blue + Green)
                    "#D35400", // Burnt Orange (Red + Yellow + Orange)
                    "#A3CB38", // Lime (Green + Yellow)
                    "#FD79A8"  // Rose Pink (Red + White)
                ];
       
        let bubble = document.createElement("div")
        bubble.classList.add("bubble")

        playarea.appendChild(bubble)

        //generating random numbber
        const rnd_num = Math.floor(Math.random() * 81) +20

        //giving that number height and width
        bubble.style.height = rnd_num + "px";
        bubble.style.width = rnd_num + "px";

        //assingning color to that number
        let rnd_color = Math.floor(Math.random() * colors.length)

        bubble.style.backgroundColor = colors[rnd_color];

        //getting height and width of the playarea box
        let width = playarea.clientWidth;
        let height = playarea.clientHeight;

        //assigning the size for the generation of bubble so that it will not form outside of the box
        let x = Math.random() *(width -rnd_num)
        let y = Math.random() * (height - rnd_num)

        bubble.style.left = x + "px"
        bubble.style.top = y + "px"


        //for increasing the score
        bubble.addEventListener("click", function(){

            if(gamePaused){
                return;
            }

            //increasing the score
            score++;
            reward.innerHTML = score;

            //removing the bubble
            bubble.remove();
        });

}


//for time working
let timeleft = 5*60
let timeinterval;
let displaytime;
function startTimer(){

    timer_btn.value = String(Math.floor(timeleft / 60)).padStart(2, "0") 
                + ":" + String(timeleft % 60).padStart(2, "0");

    timeinterval = setInterval(function (){
        timeleft--;

            
        let minuteleft = Math.floor(timeleft / 60)
        let secondleft = timeleft % 60;

        displaytime = String(minuteleft).padStart(2,"0") + ":"+
                String(secondleft).padStart(2,"0");

        timer_btn.value = displaytime;


        if(timeleft <= 0){
            clearInterval(timeinterval);
            timeinterval = null;

            clearInterval(bubbleinterval);
            bubbleinterval = null;

            timer_btn.value = "00:00";

            finalscore.innerHTML = score;

            gamepopup.style.display = "flex";
        }

    },1000)
}


//for start, stop and restart button working
let startbtn;
let stopbtn;
let restartbtn;
let btncontainer;

function forStartStopbtn(){

    btncontainer = document.createElement("div")
    btncontainer.classList.add("btncontainer")


    startbtn = document.createElement("button")
    stopbtn = document.createElement("button")
    restartbtn = document.createElement("button")


    startbtn.classList.add("startbtn")
    stopbtn.classList.add("stopbtn")
    restartbtn.classList.add("restartbtn")

    startbtn.innerHTML = "Start"
    stopbtn.innerHTML = "Stop"
    restartbtn.innerHTML = "Restart"

    btncontainer.appendChild(startbtn)
    btncontainer.appendChild(stopbtn)
    btncontainer.appendChild(restartbtn)

    document.querySelector(".mainbox").appendChild(btncontainer);

    //function for restarting the game
    function restartbtnworking(){

        gamepopup.style.display = "none";
        restartpopup.style.display = "none";

        // stop bubble generation
            clearInterval(bubbleinterval)
            bubbleinterval = null

        //stop timeinterval
            clearInterval(timeinterval)
            timeinterval = null

        //remove the bubble from the playarea
            playarea.innerHTML = "";

        //reset time and reward 

            timer_btn.type = "number";
            timer_btn.disabled = false;
            timer_btn.value = selectedMinutes;

            score = 0;
            reward.innerHTML = score;

            text_btn.style.display = "block";
    }

        confirmrestart.addEventListener("click", function(){

            // Hide confirmation popup
            restartpopup.style.display = "none";

            // Restart the game
            restartbtnworking();

        });


    //adding listener to all the button on the div
    btncontainer.addEventListener("click", function(event){
        if(event.target === startbtn){

            gamePaused = false;

            if(!bubbleinterval){
                bubbleinterval = setInterval(generateBubble,800);
            }
            if(!timeinterval){
                        if(timer_btn.type === "number"){
                    selectedMinutes = Number(timer_btn.value);
                    timeleft = selectedMinutes * 60;

                    timer_btn.type = "text";
                    timer_btn.disabled = true;
                }

                startTimer();
            }
        }else if(event.target === stopbtn){

            gamePaused = true;

            clearInterval(bubbleinterval)
            bubbleinterval = null;


            clearInterval(timeinterval)
            timeinterval = null;
        }else if(event.target === restartbtn){

            // Pause bubble generation
            clearInterval(bubbleinterval);
            bubbleinterval = null;

            // Pause timer
            clearInterval(timeinterval);
            timeinterval = null;

            // Show confirmation popup
            restartpopup.style.display = "flex";
        }
    })
}


//working of main function

let selectedMinutes = 5;
function play(){
    text_btn.addEventListener("click", function (){

        // timer_btn.innerHTML = "04:59"

        bubbleinterval = setInterval(generateBubble,800);
        
       selectedMinutes = Number(timer_btn.value);

        if (selectedMinutes < 1 || selectedMinutes > 30) {
            alert("Please select between 1 and 30 minutes.");
            return;
        }

        timeleft = selectedMinutes * 60;

        timer_btn.type = "text";
        timer_btn.value = String(selectedMinutes).padStart(2, "0") + ":00";

        timer_btn.disabled = true;
        text_btn.style.display = "none"
         startTimer();

        if(!btncontainer){
             forStartStopbtn()
        }
    })
}
play()


resumebtn.addEventListener("click", function(){

    // Hide the popup
    gamepopup.style.display = "none";

    // Reset the score
    score = 0;
    reward.innerHTML = score;

    // Reset the timer using previously selected minutes
    timeleft = selectedMinutes * 60;

    // Remove old bubbles
    playarea.querySelectorAll(".bubble").forEach(function(bubble){
        bubble.remove();
    });

    // Start bubble generation again
    bubbleinterval = setInterval(generateBubble, 800);

    // Start the timer again
    startTimer();

});


confirmresume.addEventListener("click", function(){

    // Hide confirmation popup
    restartpopup.style.display = "none";

    // Resume bubble generation
    bubbleinterval = setInterval(generateBubble, 800);

    // Resume timer from remaining time
    startTimer();

});
