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

/* saveing this for anothe rday

const myBody = document.body;
const layout = ["header" , "main", "footer"];
const headerLayout = ["",""]; 
const mainLayout = ["h1","p","ol"];
const footerLayout = ["div"];  



function bearChildren(arrayChildren, parent){
    let i=0;
    arrayChildren.forEach(element => {
        let bornChild = document.createElement(element); console.log(bornChild);
        arrayChildren[i]=bornChild;
        parent.appendChild(bornChild); i++; 
    });
}// creates and appends all children under parent



function init(){
    bearChildren(layout, myBody); console.log(myBody);
    let headerElem = layout[0];
    //bearChildren(headerLayout, header);
    let mainElem = layout[1]; console.log(mainElem);
    bearChildren(mainLayout, mainElem);

    let footer = layout[2];
    bearChildren(footerLayout, footer);
}
init();//run ONCE and ONLY in top level


mainLayout[0].textcontent = "link here";*/

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

/*Instantiating question cards*/
deck[0].setQuestion("Commonly used data types DO NOT inlcude:");
deck[0].setAnswer(["strings","booleans", "alerts","numbers"], 2);

deck[1].setQuestion("The condition in an if / else statement is enclosed with _____.");
deck[1].setAnswer(["quotes", "curly brackets", "parenthesis", "square brackets"], 2);

deck[2].setQuestion("Arrays in JavaScript can be used to store _____.");
deck[2].setAnswer(["numbers and strings", "other arrays", "booleans", "all of the above"], 3);

deck[3].setQuestion("String values must be enclosed within _____ when being assigned to variables.");
deck[3].setAnswer(["commas", "curly brackets", "quotes", "parenthesis"],2);



let elemHeader = document.getElementsByTagName("header");
let elemMain = document.getElementsByTagName("main");
let elemFooter = document.getElementsByTagName("footer");

function p(me){console.log(me);}


/*Controls for page */
function setTitle(questionString){
    title = document.getElementById("title");
    p(title);
    title.textcontent = questionString;
}


/*Initializing home page*/
setTitle(deck[0].question);











// TODO: getting leaderboard on page load
// TODO: diplaying question pages
// TODO: diplaying start pages
// TODO: submitting players 
// TODO: storing leaderboard locally
// TODO: while in leaderboard, set nav link and 
// TODO: 
