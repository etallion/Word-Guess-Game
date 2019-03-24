

var game = {
    answers : ["Talladega Nights", 
    "Elf", 
    "Anchorman", 
    "Blades of Glory",
    "Stepbrother",
    "Zoolander",
    "Old School"],
    imageFiles : ["assets/images/ricky.jpg",
    "assets/images/elf.png",
    "assets/images/ron.jpg",
    "assets/images/blades.jpg",
    "assets/images/stepbrothers.jpg",
    "assets/images/mugatu.png",
    "assets/images/frank-tank.jpg"],
    audioFiles : ["assets/audio/first.mp3",
    "assets/audio/elf.mp3",
    "assets/audio/bigdeal.mp3",
    "assets/audio/blades.mp3",
    "assets/audio/stepbrothers.mp3",
    "assets/audio/mugatu.mp3",
    "assets/audio/myboyblue.mp3"],
    alphabet:["a","b", "c", "d", "e", "f", "g",
    "h","i","j","k","l","m","n","o","p","q","r",
    "s","t","u","v","w","x","y","z"],
    currentIndex : null,
    myAudioElements : [],
    usedLetters:[],
    guessesLeft:0,
    activeAnswer: "",
    isCharHidden: [],
    solvedWords : [],
    hasWon: false,
    isGameInProgress: false,
    charFound: function(letter){

        //parse activeAnswer for position(s) of matching character
       for(var i = 0; i < game.activeAnswer.length; i++){
       
            if(game.activeAnswer.charAt(i) === letter || game.activeAnswer.charAt(i)  === letter.toUpperCase()){
                game.isCharHidden[i] = false;
            }
       }
       $("#hiddenWord").html(game.updatedDisplay());
        
        //check to see if puzzle solved by looking for all true values in isCharHidden
        game.hasWon = game.checkForWinner();
      
        if(game.hasWon){
            game.endOfGame();
        };
    },
    charNotFound: function(letter){
        
        game.guessesLeft--;
        $("#guessesLeft").html("Guesses left: " + game.guessesLeft);

        if(game.guessesLeft > 0){
            $("#wrongLetters").append(letter + " ");
        } else {
            game.hasWon = false;
            game.endOfGame();
        }
    },
    updatedDisplay: function(){

        var str = "";

        game.isCharHidden.forEach(function(bool, i){
            if(bool){
                console.log("isCharHidden=true, updatedisplay _");
                str += "_ ";
            } else {
                console.log(i);
                console.log("isCharHidden=false, updatedisplay with letter");
                str = str + game.activeAnswer.charAt(i);
                str += " ";
            }
        });
        return str;
    },
    checkLetter: function(letter){
        if (game.activeAnswer.indexOf(letter) > -1 || game.activeAnswer.indexOf(letter.toUpperCase()) > -1) {
            console.log("letter found in puzzle");
            game.charFound(letter);
        } else {
            console.log("letter not found ");
            game.charNotFound(letter);
        }
    },
    checkForWinner: function(i){
        var comp = 0;
        for(var i = 0; i < game.isCharHidden.length; i++){
            if(game.isCharHidden[i] === false){
                comp++;
            }
        }

        if(comp === game.isCharHidden.length){
            return true;
        } else {
            return false;
        }
    },
    endOfGame: function(){
        if(game.hasWon === true){
            $("#message").html("Nice job, you won!");
            // activate button

            game.solvedWords.push(game.currentIndex);
            game.myAudioElements[game.currentIndex].play();
             $("#will-pic").attr("src", game.imageFiles[game.currentIndex]);
             var btnName = "sound" + game.currentIndex;
             $("#" + btnName).prop("disabled", false);
             $("#" + btnName).removeClass("disabled");
             init();
        } else {
            $("#message").html("Rats, you lost.");
            init();
        }

    }
};

document.onkeyup = function(evet){
    console.log("KeyUp");
    var userGuess = event.key.toLocaleLowerCase();

    if (game.alphabet.indexOf(userGuess) > -1 && game.isGameInProgress === true) {
        console.log("used letter position: " + game.usedLetters.indexOf(userGuess));
        if(game.usedLetters.indexOf(userGuess) < 0){
            game.usedLetters.push(userGuess);
            console.log("user guessed letter: " + userGuess);
            game.checkLetter(userGuess);
        } 
    } else if(event.key.toLocaleLowerCase() == '1'){
         startGame();
    }
}

function init(){
    game.isGameInProgress = false;
    game.usedLetters = [];
    game.guessesLeft = 9;
    game.activeAnswer = "";
    game.isCharHidden = [];

   

      // initialize wrong letter 
      $("#wrongLetters").html("");

        // initialize guess left 
        $("#guessesLeft").html("Guesses left: " + game.guessesLeft);

        var newDiv = $("<span id=wLetters>");
        newDiv.text("");
        $("#wrongLetters").append(newDiv);

        $("#hiddenWord").html("New Game? Press 1 to begin.");
}; 


function startGame(){
    //game in progress
    game.isGameInProgress = true;

    // rand number, modulus length of game.answers
    var rand = Math.floor(Math.random() * game.answers.length);

    //check if answer has been solved so user doesn't repeat same word game during visit
    while(game.solvedWords.indexOf(rand) !== -1){
        rand = Math.floor(Math.random() * game.answers.length);
    }
    game.currentIndex = rand;
    var secretAnswer = game.answers[rand];

    // set active answer
    game.activeAnswer = secretAnswer;

     // init isCharHidden array all to false
     for( var i = 0; i < game.activeAnswer.length; i++){

        //unhide non-alaphbet chars
        if(game.activeAnswer.charAt(i) === " "){
            game.isCharHidden[i] = false;
           // game.activeAnswer.charAt(i) = " ";
        } else if(game.activeAnswer.charAt(i) === "'"){
            game.isCharHidden[i] = false;
        } else { // hide letter
            game.isCharHidden[i] = true;
        }
    }
    

    //display game spaces like this _ _ _ _  
    var display = game.updatedDisplay();
    $("#hiddenWord").html(game.updatedDisplay());
    
};
//END OF INIT()

 // JavaScript function that wraps everything
 $( document ).ready(function() {

    //initalize game and page
    init();

    // Load audio elements
    game.audioFiles.forEach( function(mySrc, i){
        console.log("load audio files");
    game.myAudioElements[i] = document.createElement("audio");
    game.myAudioElements[i].setAttribute("src", mySrc);
    });
     
console.log("pre-handle click");
 //Handler for sound effect buttons
 $(".btn").on("click", function() {
    console.log("handle click");
    game.myAudioElements[$(this).attr("value")].play();
   // $("#will-pic").setAttribute("src", game.imageFiles[$(this).attr("value")]);
   $("#will-pic").attr("src", game.imageFiles[$(this).attr("value")]);
 });


});