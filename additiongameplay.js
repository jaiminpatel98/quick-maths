function arrowPressed(event) {
    var keyPressed = event.charCode || event.keyCode;
    var getKey = String.fromCharCode(keyPressed);
    var guess;
    switch(getKey) {
        case "%":
            document.getElementById("left").setAttribute('src', 'images/arrow-left-h.png');
            guess = document.getElementById("leftOption").innerHTML;
            break;
        case "'":
            document.getElementById("right").setAttribute('src', 'images/arrow-right-h.png');
            guess = document.getElementById("rightOption").innerHTML;
            break;
        case "&":
            document.getElementById("up").setAttribute('src', 'images/arrow-up-h.png');
            guess = document.getElementById("upOption").innerHTML;
            break;
        case "(":
            document.getElementById("down").setAttribute('src', 'images/arrow-down-h.png');
            guess = document.getElementById("downOption").innerHTML;
    }
    checkAnswer(guess);
    nextQuestion(questionNumber);
}

function arrowPressedDone(event) {
    var keyPressed = event.charCode || event.keyCode;
    var getKey = String.fromCharCode(keyPressed);
    switch(getKey) {
        case "%":
            document.getElementById("left").setAttribute('src', 'images/arrow-left.png');
            break;
        case "'":
            document.getElementById("right").setAttribute('src', 'images/arrow-right.png');
            break;
        case "&":
            document.getElementById("up").setAttribute('src', 'images/arrow-up.png');
            break;
        case "(":
            document.getElementById("down").setAttribute('src', 'images/arrow-down.png');
    }

}

function firebaseSetup() {
    var config = {
        apiKey: "AIzaSyB3aDWMeVBkoBX6_Td6WKjj81kRiETBHmA",
        authDomain: "quick-maths-cb609.firebaseapp.com",
        databaseURL: "https://quick-maths-cb609.firebaseio.com",
        projectId: "quick-maths-cb609",
        storageBucket: "quick-maths-cb609.appspot.com",
        messagingSenderId: "704606376986"
      };
      firebase.initializeApp(config);
      database = firebase.database();
      var ref = database.ref('Questions/Addition');
      ref.on("value", gotQuestions, errorQuestions);
      
}
var questionSet = [];
var answerSet = [];
var optionsSet = [];
var questionNumber = 1;
var currentAnswer = 0;
var currentScore = 0;
function gotQuestions(data) {
    
    var questions = data.val();
    var keys = Object.keys(questions);
    for(var i = 0; i < keys.length; i++) {
        var k = keys[i];
        var question = questions[k].Question;
        questionSet[i] = question;
        var answer = questions[k].Answer;
        answerSet[i] = answer;
        var options = [];
        var option2 = questions[k].Option2;
        var option3 = questions[k].Option3;
        var option4 = questions[k].Option4;
        options[0] = option2;
        options[1] = option3;
        options[2] = option4;
        optionsSet[i] = options;
    }
    document.getElementById("question").innerHTML = questionSet[0];
    document.getElementById("leftOption").innerHTML = answerSet[0];
    document.getElementById("rightOption").innerHTML = optionsSet[0][0];
    document.getElementById("downOption").innerHTML = optionsSet[0][1];
    document.getElementById("upOption").innerHTML = optionsSet[0][2];
    currentAnswer=answerSet[0];

}



function errorQuestions(err) {
    console.log("Error:");
    console.log(err);
}

function checkAnswer(guess) {
    if(guess == currentAnswer){
        currentScore = currentScore + 100;
        document.getElementById("score").innerHTML = "Score: " + currentScore;
    }
    else {
        if(currentScore >= 50){
            currentScore = currentScore - 50;
        }
        document.getElementById("score").innerHTML = "Score: " + currentScore;
    }

}

function nextQuestion(currentQuestion) {
    if(currentQuestion != 10){
        document.getElementById("question").innerHTML = questionSet[currentQuestion];
        document.getElementById("leftOption").innerHTML = answerSet[currentQuestion];
        document.getElementById("rightOption").innerHTML = optionsSet[currentQuestion][0];
        document.getElementById("downOption").innerHTML = optionsSet[currentQuestion][1];
        document.getElementById("upOption").innerHTML = optionsSet[currentQuestion][2];
        currentAnswer=answerSet[currentQuestion];
        questionNumber++;
    }
    else{
        $("#myModal").modal();
        document.getElementById("scoreText").innerHTML = "Your Score was: " + currentScore;
    }
    
}

function saveAndQuit() {
    saveScore();
    returnHome();
}

function saveScore() {

}

function returnHome() {
    window.location.href = "home.html";
}
