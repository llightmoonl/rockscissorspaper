'use strict';

class rockPaperScissors {
    constructor() {
        this.gameControl = document.querySelector(".game__control");
        this.counterComputer = document.querySelector(".counter__computer");
        this.counterPlayer = document.querySelector(".counter__player");
        this.buttonRefresh = document.querySelector(".game__refresh");
        this._init();
        this._newGame();
        this._refreshRound();
    };

    _init() {
        this.buttonRefresh.disabled = true;
        this.gameControl.addEventListener("click", (event) => {
            if (event.target.tagName === "BUTTON") {
                this.render(event.target.dataset.element);
            }
        })
    };

    render(handPlayer) {
        this.disabledButton();
        this.buttonRefresh.disabled = false;
        const handComputer = this.moveComputer();

        this.clickButton("game__computer", `interface/${handComputer}.png`)
        this.clickButton("game__player", `interface/${handPlayer}.png`);

        this.counterWinner(handComputer,handPlayer);
    }

    changeHand(player, srcImage) {
        const gamer = document.querySelector(`.${player}`);
        const handPlayer = gamer.querySelector(".game__element");
        handPlayer.src = srcImage;
    };

    animationOn(search, styleAnimation){
        const objAnimation = document.querySelector(`.${search}`);
        objAnimation.style.animation = styleAnimation;
    }

    animationOff(search){
        const objAnimation = document.querySelector(`.${search}`);
        objAnimation.style.animation = "none";
    }

    clickButton(player, srcImage){
        this.changeHand(player, srcImage);
        this.animationOff(player);
    }

    moveComputer() {
        const elementGame = {
            0: "rock",
            1: "scissors",
            2: "paper",
        }
        const indexElement = Math.floor(Math.random() * 3);
        return elementGame[indexElement];
    };

    isWin(computer, player) {
        return {
            0: computer === "rock" && player === "scissors" ||
                computer === "paper" && player === "rock" ||
                computer === "scissors" && player === "paper",

            1: computer === "scissors" && player === "rock" ||
                computer === "rock" && player === "paper" ||
                computer === "paper" && player === "scissors",

            2: computer === "rock" && player === "rock" ||
                computer === "paper" && player === "paper" ||
                computer === "scissors" && player === "scissors",
        }
    }

    counterWinner(computer, player){
        if (this.isWin(computer, player)[0]) {
            this.counterComputer.textContent = parseInt(this.counterComputer.textContent) + 1;
        } else if (this.isWin(computer, player)[1]) {
            this.counterPlayer.textContent = parseInt(this.counterPlayer.textContent) + 1;
        } else if (this.isWin(computer, player)[2]) {
            this.counterComputer.textContent = parseInt(this.counterComputer.textContent);
            this.counterPlayer.textContent = parseInt(this.counterPlayer.textContent);
        }
    }

    disabledButton(){
        const buttons = document.querySelectorAll(".game__button");
        for(let i = 0; i<buttons.length; i++) {
            if (buttons[i].disabled === false)
            {
                buttons[i].disabled = true;
            }
        }
    }

    unDisabledButton(){
        const buttons = document.querySelectorAll(".game__button");
        for(let i = 0; i<buttons.length; i++) {
            if (buttons[i].disabled === true)
            {
                buttons[i].disabled = false;
            }
        }
    }

    _newGame(){
        document.querySelector(".game__new").addEventListener("click", ()=>{
            this.counterComputer.textContent = 0;
            this.counterPlayer.textContent = 0;
            this.buttonRefresh.disabled = true;
            this.unDisabledButton();

            this.changeHand("game__computer", `interface/rock.png`);
            this.changeHand("game__player", `interface/rock.png`);

            this.animationOn("game__computer", "handComputer 1s infinite");
            this.animationOn("game__player", "handPlayer 1s infinite");
        })
    }

    _refreshRound(){
        this.buttonRefresh.addEventListener("click", ()=>{
            this.unDisabledButton();

            this.buttonRefresh.disabled = true;
            this.changeHand("game__computer", `interface/rock.png`);
            this.changeHand("game__player", `interface/rock.png`);

            this.animationOn("game__computer", "handComputer 1s infinite");
            this.animationOn("game__player", "handPlayer 1s infinite");
        })
    }
}

const game = new rockPaperScissors();