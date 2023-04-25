/*From README

USR STORY
_______________________________________________________________________________
AS A coding boot camp student
I WANT to take a timed quiz on JavaScript fundamentals that stores high scores
SO THAT I can gauge my progress compared to my peers



ACC CRIT
_______________________________________________________________________________
.:  I am taking a code quiz

@ click the start button:
    THEN a timer starts and I am presented with a question

@ answer a question:
    THEN I am presented with another question

@ answer a question incorrectly:
    THEN time is subtracted from the clock

@ all questions are answered or the timer reaches 0:
    THEN the game is over

@ the game is over:
    THEN I can save my initials and my score //local storage



NOTES ON MOCK UP
_______________________________________________________________________________

hovers lightens box; changes mouse to finger
highscore persists; can be cleared

format tends to be fill-in the blank questions

after click: instant feedback -> correct/wrong, shortly after disappears

visible top lt: view high scores at any time
visible top rt: time (starts at 75s... wrong -6s)

on game over "page" -> form to give initials and score to board
on hi-score "page" -> goback takes you to start "page"
on start "page" -> go -> question page
on question page -> options(4) -> next question -until out of questions/time-> 

options are in ordered list and styled



Other considerations: media screeen
Extra features (if code done by weekend)
    

general flow of site

on url load - starting page
    show prompt centered
    show view high score button
    show timer
    has start button (mid center) ->
    has view highscore (top left) ->
    has timer(top right; @ 000)

on button start:
    get question, ?randomly?
    show list choices with button ->
    start timer counting down every second (starting from ?75) ->

on button choice
    reveal a text below, timed for 2?secs    
    update score;save it

    (if more questions and time)
        get next question from list
        load its choices; ...wait for button choice
    (else)
        go to game end

on game end
    get score
    show form intials and submit

on submit
    get leaderboard
    place score in highest to lowest

on view highscore
    load leaderboard array of initials and score
    on button; reset
    go back to home ->

on reset
    delete value from local storage
    reload display

*/

/* References
 * Regions <https://marketplace.visualstudio.com/items?itemName=MadsKristensen.JavaScriptRegions>
 * innerHTML vs textContent <https://www.youtube.com/watch?v=1UsllDMhvN4>
*/ 


//Debug printer
function p(me){console.log(me);}

// #region Cards
class Card {
    constructor() {
        this.question="";
        this.answer=[];
        this.correct=0;
    }
    setQuestion(questionString) {
        this.question = questionString;
    }
    setAnswer(answerArray, indexOfCorrect) {
        this.answer = answerArray;
        this.correct = indexOfCorrect;
    }
}
let numCards = 4;
let deck=[]; 

for (let i=0;i<numCards;i++){
    deck[i] = new Card();
}

deck[0].setQuestion("Commonly used data types DO NOT inlcude:");
deck[0].setAnswer(["strings","booleans", "alerts","numbers"], 2);

deck[1].setQuestion("The condition in an if / else statement is enclosed with _____.");
deck[1].setAnswer(["quotes", "curly brackets", "parenthesis", "square brackets"], 2);

deck[2].setQuestion("Arrays in JavaScript can be used to store _____.");
deck[2].setAnswer(["numbers and strings", "other arrays", "booleans", "all of the above"], 3);

deck[3].setQuestion("String values must be enclosed within _____ when being assigned to variables.");
deck[3].setAnswer(["commas", "curly brackets", "quotes", "parenthesis"],2);
// #endregion

//
const mainID = document.getElementById("main");
const titleID = document.getElementById("title");
const timeID = document.getElementById("time");

//Time controls
let myTimer= 0;
const timePenalty = 10;
const timeAllotted = 5;
const timeDelta = 1000; //num is in milliseconds for setInterval funct 

//Home Page
const homeTitle="Coding Quiz Challenge";
const homePrompt="Try to answer the following code-related questions within time limit\nKeep in mind that incorrect answer will penalize your score/time by ten seconds!"
const startString="Start Quiz"

//question
let questionPointer=0;


//Submission page
const submitTitle="All done";
let scorePrompt = `Your final score is ${time}.`
const intials= "Enter initials: "

//Sound
const wavCorrect = new Audio("./assets/sfx/correct.wav");
const wavIncorrect = new Audio("./assets/sfx/incorrect.wav");



function createChildTag(parentTag, typeString){
    let childTag = document.createElement(typeString);
    parentTag.appendChild(childTag);
    return childTag;
}
function setContent(tag,contentString){
    tag.textContent = contentString;
}
function setID(tag,idString){
    tag.setAttribute("id",idString);
}


function createList(parentTag, itemArray){
    let newParentList = createChildTag(parentTag,"ol");
    newParentList.setAttribute("id", "answers");
    createListItem(newParentList, itemArray);
}
function createListItem(parentList, array){
    for (let i=0; i<array.length; i++){
        let newListItem = createChildTag(parentList,"li");        
        setContent(newListItem, array[i]);
        newListItem.setAttribute("data-index",i);
    };
}

/* Controls for page */

function setPrompt(promptString){
    let promptTag = createChildTag(mainID,"pre");
    setContent(promptTag, promptString);
    setID(promptTag,"prompt");
}
function removeID(idString){
    document.getElementById(idString).remove();
}
function createStartButton(){
    let startButton = createChildTag(mainID,"p");
    setID(startButton,"start");
    setContent(startButton,startString);
    startButton.addEventListener("click", onClickStart);
}

function setList(answerArray){
} //TODO on click answer with qLeft >0; or on start



/*Initializing home page*/
// TODO: diplaying start pages
setContent(titleID,homeTitle);
setPrompt(homePrompt);
createStartButton();
setContent(timeID,"00");

/* Starting questions */
// TODO: diplaying question pages
//setContent(titleID, deck[0].question);
//removeID("prompt"); removeID("start");
//createList(mainID,deck[0].answer);


//removeList(); //todo  
//setContent(titleID, submitTitle);
//setPrompt(scorePrompt);


function getLocalData(){} // TODO: getting leaderboard on page load
function setLocalData(){} // TODO: storing leaderboard locally


function onClickStart(){
    startTimer(timeAllotted, timeDelta);
}



// Timer
function startTimer(duration,updateFrequency){
    setContent(timeID,duration);
    myTimer = setInterval(update,updateFrequency);
    function update(){
        duration--;
        setContent(timeID,duration);
        if (duration <= 0){
            stopTimer();
        }else{};
    }


}

function stopTimer(){
    clearInterval(myTimer);
}// used tostop after out of question

function createWavID(){
    
}

function answerWrong(){
    time -= timeLoss;
    wavIncorrect.play();
}
function answerRight(){
    wavCorrect.play();
}
