let game = document.querySelector(".game");
let row = document.querySelectorAll(".row");
let play = document.querySelector(".play");
let beforGame = document.querySelector(".beforGame");
let winnerPlayer = document.querySelector(".winner");
let start = document.querySelector(".start");
let menu = document.querySelector(".menu");
let turn = document.querySelector(".turn");
let check = document.querySelector(".check");
let retry = document.querySelector(".again");
let result = document.querySelector(".result");
let winnerC = document.querySelector(".winnerTimeC");
let winnerM = document.querySelector(".winnerTimeM");
let resetWinnerTime = document.querySelector(".reset");
let winnerTimeC = 0;
let winnerTimeM = 0;
let moveNumber = 0;



winnerTimeM = localStorage.getItem("winnerTimeM");
winnerTimeC = localStorage.getItem("winnerTimeC");
if (winnerTimeM == null) {
    localStorage.setItem("winnerTimeM", 0);
} else {
    winnerM.textContent = winnerTimeM;
}

if (winnerTimeC == null) {
    localStorage.setItem("winnerTimeC", 0);
} else {
    winnerC.textContent = winnerTimeC;
}


start.addEventListener("click", () => {
    start.classList.toggle("startActive");
    menu.classList.toggle("menuActive");
    start.style.pointerEvents = "none";
});


play.addEventListener("click", () => {

    beforGame.style.opacity = "0";
    setTimeout(() => {
        beforGame.style.display = "none";
    }, 500);
    game.style.display = "flex";
    setTimeout(() => {
        game.style.opacity = "1";
    }, 500);

    computerPlay();
})


function computerPlay() {
    row.forEach(event => {
        event.addEventListener("click", myChoic);

        //my choice
        function myChoic() {
            if (this.children.length == 0) {
                moveNumber++;
                let newElement = document.createElement("div");
                this.appendChild(newElement);
                newElement.classList.add("multipel");
                this.classList.add("multi")

                //winner function
                winner();
                function winner() {
                    if (row[0].classList.value == row[1].classList.value && row[0].classList.value == row[2].classList.value && row[0].classList.value == "row multi" ||
                        row[3].classList.value == row[4].classList.value && row[3].classList.value == row[5].classList.value && row[3].classList.value == "row multi" ||
                        row[6].classList.value == row[7].classList.value && row[6].classList.value == row[8].classList.value && row[6].classList.value == "row multi" ||
                        row[0].classList.value == row[3].classList.value && row[0].classList.value == row[6].classList.value && row[0].classList.value == "row multi" ||
                        row[1].classList.value == row[4].classList.value && row[1].classList.value == row[7].classList.value && row[1].classList.value == "row multi" ||
                        row[2].classList.value == row[5].classList.value && row[2].classList.value == row[8].classList.value && row[2].classList.value == "row multi" ||
                        row[0].classList.value == row[4].classList.value && row[0].classList.value == row[8].classList.value && row[0].classList.value == "row multi" ||
                        row[2].classList.value == row[4].classList.value && row[2].classList.value == row[6].classList.value && row[2].classList.value == "row multi"
                    ) {

                        winnerTimeM++;
                        localStorage.setItem("winnerTimeM", winnerTimeM);
                        winnerM.textContent = winnerTimeM;

                        game.style.pointerEvents = "none";
                        check.style.display = "flex";
                        setTimeout(() => {
                            check.style.opacity = "1";
                            game.style.filter = "blur(3px)"
                        }, 400);
                        winnerPlayer.classList.add("x");

                    }
                    else {
                        turn.classList.remove("x");
                        turn.classList.add("o");
                        computerChoic();

                    }
                }
            }
        }


        //computer choice
        function computerChoic() {
            let computerRandom = Math.floor(Math.random() * 9);

            if (row[computerRandom].children.length == 0) {
                setTimeout(() => {
                    moveNumber++;
                    let newElement = document.createElement("div");
                    row[computerRandom].appendChild(newElement);
                    newElement.classList.add("circle");
                    row[computerRandom].classList.add("circ");

                    winnerc();
                    function winnerc() {
                        if (row[0].classList.value == row[1].classList.value && row[0].classList.value == row[2].classList.value && row[0].classList.value == "row circ" ||
                            row[3].classList.value == row[4].classList.value && row[3].classList.value == row[5].classList.value && row[3].classList.value == "row circ" ||
                            row[6].classList.value == row[7].classList.value && row[6].classList.value == row[8].classList.value && row[6].classList.value == "row circ" ||
                            row[0].classList.value == row[3].classList.value && row[0].classList.value == row[6].classList.value && row[0].classList.value == "row circ" ||
                            row[1].classList.value == row[4].classList.value && row[1].classList.value == row[7].classList.value && row[1].classList.value == "row circ" ||
                            row[2].classList.value == row[5].classList.value && row[2].classList.value == row[8].classList.value && row[2].classList.value == "row circ" ||
                            row[0].classList.value == row[4].classList.value && row[0].classList.value == row[8].classList.value && row[0].classList.value == "row circ" ||
                            row[2].classList.value == row[4].classList.value && row[2].classList.value == row[6].classList.value && row[2].classList.value == "row circ"
                        ) {

                            winnerTimeC++;
                            localStorage.setItem("winnerTimeC", winnerTimeC);
                            winnerC.textContent = winnerTimeC;

                            game.style.pointerEvents = "none";
                            check.style.display = "flex";
                            setTimeout(() => {
                                check.style.opacity = "1";
                                game.style.filter = "blur(3px)"
                            }, 400);
                            winnerPlayer.classList.add("o");
                        }

                        else {
                            turn.classList.remove("o");
                            turn.classList.add("x");
                        }
                    }
                }, 500);

            }
            else {
                if (moveNumber == 9) {
                    game.style.pointerEvents = "none";
                    check.style.display = "flex";
                    setTimeout(() => {
                        check.style.opacity = "1";
                        game.style.filter = "blur(3px)"
                    }, 400);
                    result.childNodes[1].textContent = "Draw !";
                }
                else {
                    computerChoic();
                }

            }
        }

    });
}


//when click retry
retry.addEventListener("click", restart);

function restart() {
    moveNumber = 0;
    result.childNodes[1].textContent = ",winner.";
    game.style.filter = "none"
    check.style.display = "none";
    check.style.opacity = "0";
    winnerPlayer.classList.remove("o", "x");
    turn.classList.remove("o");
    turn.classList.add("x");

    for (let i = 0; i < row.length; i++) {       //chenge soon...
        row[i].classList.remove("circ", "multi")
        if (row[i].children[0] != null) {
            setTimeout(() => {
                row[i].children[0].remove();
            }, 150 * i);
        }
    }

    setTimeout(() => {
        game.style.pointerEvents = "all";
    }, 1350);    //150*9

}


let btnMenu = document.querySelector(".btnMenu");
//when click menu bottom
btnMenu.addEventListener("click", () => {
    game.style.opacity = "0";
    setTimeout(() => {
        game.style.display = "none";
    }, 500);

    beforGame.style.display = "flex";
    setTimeout(() => {
        beforGame.style.opacity = "1";
    }, 500);
    restart();

});


//when click history bottom 
let btnHistory = document.querySelector(".historyBtn");
let history = document.querySelector(".history");
btnHistory.addEventListener("click", () => {

    menu.style.opacity = "0";
    setTimeout(() => {
        menu.style.display = "none";
    }, 500);

    history.style.display = "flex";
    setTimeout(() => {
        history.style.opacity = "1";
    }, 500);

});


//when click back bottom 
let reset = document.querySelector(".reset");
let back = document.querySelector(".back");
back.addEventListener("click", () => {

    history.style.opacity = "0";
    setTimeout(() => {
        history.style.display = "none";
    }, 500);

    menu.style.display = "flex";
    setTimeout(() => {
        menu.style.opacity = "1";
    }, 500);

});


//when click back reset
resetWinnerTime.addEventListener("click", () => {
    localStorage.setItem("winnerTimeM", 0);
    localStorage.setItem("winnerTimeC", 0);
    winnerTimeM = 0;
    winnerTimeC = 0;
    winnerM.textContent = 0;
    winnerC.textContent = 0;

});


//when click back Exit
let exit = document.querySelector(".exit");
exit.addEventListener("click", () => {
    window.close();

});

