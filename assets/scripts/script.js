/*From README

USR STORY
_______________________________________________________________________________
AS A coding boot camp student
I WANT to take a timed quiz on JavaScript fundamentals that stores high scores
SO THAT I can gauge my progress compared to my peers



ACC CRIT
_______________________________________________________________________________
.:  I am taking a code quiz

@ click the start button: //! DONE !
    THEN a timer starts and I am presented with a question

@ answer a question: //! DONE !
    THEN I am presented with another question

@ answer a question incorrectly: //! DONE !
    THEN time is subtracted from the clock

@ all questions are answered or the timer reaches 0: //! DONE !
    THEN the game is over

@ the game is over: //TODO: ERROR
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
 * splice <https://www.freecodecamp.org/news/javascript-splice-how-to-use-the-splice-js-array-method/>
 * attribute - required for input tag <https://bobbyhadz.com/blog/javascript-set-attribute-required>
*/ 

// TODO: Ideas for improvement/Lessons Learned: 
/* in creation of tag or adding id to tag: add id to array to track and make removing easier;
 * a lot of extra code stem from me trying to make it more readable to me, could be less wordy, could be structured better/with less lines
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

// #region Var Declarations 
const headerID = document.querySelector("header");
const mainID = document.getElementById("main");
const titleID = document.getElementById("title");
const timeID = document.getElementById("time");


//Time controls
let intervalTimeID=0;
let currentTime=0;
const timePenalty = 15;
const timeAllotted = 75;
const timeDelta = 1000; //num is in milliseconds for setInterval funct 

//Home Page
const homeTitle="Coding Quiz Challenge";
const homePrompt=`Try to answer the following code-related questions within time limit\nKeep in mind that incorrect answer will penalize your score/time by ${timePenalty} seconds!`;
const startString="Start Quiz";

//Question Page
let questionPointer = 0; 

//Submission page
const submitTitle="All done";
const finalScore = "Your final score is "
let leaderboard=[];
const leaderboardSize =5;
let player={
    'initials': "",
    'score': 0
};

//Hi-Score Page
const backButtonString="Go Back";
const clearButtonString="Clear high scores";

//Sound
const wavCorrect = new Audio("./assets/sfx/correct.wav");
const wavIncorrect = new Audio("./assets/sfx/incorrect.wav");
// #endregion

// #region HTML manipulations, General
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
function removeID(idString){
    let trash = document.getElementById(idString);
    if(trash!=null){trash.remove();}
}
// #endregion

// #region HTML manipulations, Specific
function createList(parentTag, itemArray){
    let newParentList = createChildTag(parentTag,"ol");
    setID(newParentList, "answers");
    newParentList.addEventListener("click",chooseAnswer);
    createListItem(newParentList, itemArray);
}
function createListItem(parentList, array){
    for (let i=0; i<array.length; i++){
        let newListItem = createChildTag(parentList,"li");        
        setContent(newListItem, array[i]);
        newListItem.setAttribute("data-index",i);
    };
}
function setPrompt(promptString){
    let promptTag = createChildTag(mainID,"pre");
    setContent(promptTag, promptString);
    setID(promptTag,"prompt");
}
function createStartButton(){
    let startButton = createChildTag(mainID,"button");
    setID(startButton,"start");
    setContent(startButton,startString);
    startButton.addEventListener("click", onClickStart);
}
function hideHeader(){
    headerID.setAttribute("style","visibility: hidden");
}
function showHeader(){
    headerID.setAttribute("style","visibility: visible");
}


// #endregion

// #region Home Functions
function init(){
    // Resets
    questionPointer = 0;
    currentTime = 0;
    removeID("menu");

    // Draw page
    showHeader();
    setContent(titleID, homeTitle);
    setPrompt(homePrompt);
    createStartButton();
    setContent(timeID,"00");
}
function onClickStart(){
    startTimer(timeAllotted, timeDelta);
    setQuestionLayout();
}
//#endregion

// #region Timer
function startTimer(duration,updateFrequency){
    
    currentTime=duration;
    setContent(timeID,currentTime);
    intervalTimeID = setInterval(update,updateFrequency);

    function update(){
        currentTime--;
        if (currentTime<0){currentTime=0;} //! preventing negative score
        setContent(timeID,currentTime);
        if (currentTime <= 0){
            stopTimer();
            setSubmissionLayout();
        }else{};
    }
}
function stopTimer(){
    if (intervalTimeID!=null){clearInterval(intervalTimeID)}; //possible source of error... stop an already clock?
}
// #endregion

// #region Question Functions
function setQuestionLayout(){
    setContent(titleID, deck[questionPointer].question);
    removeID("prompt"); removeID("start");
    createList(mainID,deck[questionPointer].answer); // ! post-op incrementing will break chooseAnswer
}
function chooseAnswer(event){
    let myAnswer = event.target.dataset.index;
    let correctAnswer = deck[questionPointer].correct;
    if(myAnswer==correctAnswer){
        answerRight();
    }else {answerWrong();}
    getNextQuestion();
}
function answerWrong(){
    if (currentTime<10){
        stopTimer();
        currentTime=0; 
    }else{currentTime -= timePenalty;} //! very rare case but time can go below 0 //Not the source of the reference eror
    setContent(timeID,currentTime);
    

    wavIncorrect.play();
} //also decreases time/score on call  // TODO add footer flash
function answerRight(){
    wavCorrect.play();
} // TODO add footer flash
function getNextQuestion(){
    if(++questionPointer >= deck.length){ p('out of questions');
        stopTimer();
        setSubmissionLayout();
    } // Case - 0 questions left
    else{
        setContent(titleID, deck[questionPointer].question);
        removeID("answers");
        createList(mainID,deck[questionPointer].answer);
    }
    

}
// #endregion

// #region Submission/
function setSubmissionLayout(){
    removeID('answers');
    setContent(titleID, submitTitle);
    showNewScore();
    addForm();
}
function showNewScore(){
    let displayScore = createChildTag(mainID,"p");
    setID(displayScore,"display-score")
    displayScore.innerHTML= `${finalScore} ${currentTime}.`;
}
function addForm(){
    let formID= createChildTag(mainID,"form");
    setID(formID, "submit-form");

    let labelFor = createChildTag(formID,"label");
    labelFor.setAttribute("for","initials");
    setContent(labelFor,"Enter Initials: ");
    
    let textBox = createChildTag(formID,"input");
    textBox.setAttribute("type","text");
    setID(textBox, "initials");
    
    textBox.setAttribute("name","initials");
    textBox.setAttribute("required","");
    textBox.setAttribute("maxLength","3");

    let submitButton = createChildTag(formID,"button");
    submitButton.setAttribute("type","submit");
    setContent(submitButton,"Submit")
    submitButton.addEventListener("click", onSubmit);
}
function onSubmit(event){
    event.preventDefault();
    saveScore();
}//possible err due to something?? may need to nest
//#endregion


// #region Scoring/Leaderboard Functions
function loadScore(){ 
    return JSON.parse(localStorage.getItem("hiScore"));
}
function saveScore(){
    player.initials= document.getElementById("initials").value;
    player.score=currentTime;

    let previousSave = loadScore();
    //p(previousSave);


    if( previousSave == null){
        let newLeader = [player];
        localStorage.setItem("hiScore",JSON.stringify(newLeader));
        p("!! NEW HIGH SCORE !!");
    }
    else{
        let placement = 0;

        //p("last best: "+ previousSave[0].score);
        //p("this time: " + player.score);
        let pastScore = previousSave[placement].score;
        while(pastScore >= (player.score)){
            placement++;
            pastScore = previousSave[placement].score; // ! ERROR: Clicking answers to fast causes a reference error; refresh and slow down
        }//checking where to place new score; new scores that equal old will be placed below
        //p("you have placed "+ (placement+1)+"th");
        
        previousSave.splice(placement,0,player);
        
        while(previousSave.length>5){
             p("popping off "+ previousSave.pop());
        }
        localStorage.setItem("hiScore",JSON.stringify(previousSave));
    }
    setHiScoreLayout();
} // ! ERROR: Clicking answers to fast causes a reference error; refresh and slow down

function clearScores(){
    localStorage.clear(); //p("cleared!")
}
function setHiScoreLayout(){
    hideHeader();
    removeID("submit-form");removeID("display-score");
    let storedScores = loadScore();
    setContent(titleID,"High Scores");
    //p('form removed, score loaded');
    p(storedScores);
    createLeaderboard();
    createLeaderboardMenu();
}
function createLeaderboard(){
    let leaderboardArray = loadScore();
}
function createLeaderboardMenu(){
    let menuID = createChildTag(mainID,"menu");
    setID(menuID,"menu");
    menuID.setAttribute("style", "display: flex;list-style: none;");

    let backID = createChildTag(menuID,"li");
    setID(backID,"go-back"); 

    let backBtn = createChildTag(backID,"button");
    setID(backBtn,"back-btn"); setContent(backBtn,backButtonString);
    backBtn.addEventListener("click",init);

    let clearID=createChildTag(menuID,"li");
    setID(clearID,"clear-hi-scores");

    let clearBtn=createChildTag(clearID,"button");
    setID(clearBtn,"clear-btn"); setContent(clearBtn,clearButtonString);
    clearBtn.addEventListener("click",clearScores);//update screen
}
// #endregion


init();
//end