

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
    audioFiles : ["assets/audio/piss.mp3",
    "assets/audio/elf.mp3",
    "assets/audio/bigdeal.mp3",
    "assets/audio/blades.mp3",
    "assets/audio/stepbrothers.mp3",
    "assets/audio/mugatu.mp3",
    "assets/audio/myboyblue.mp3"],
    alphabet:["a","b", "c", "d", "e", "f", "g",
    "h","i","j","k","l","m","n","o","p","q","r",
    "s","t","u","v","w","x","y","z"],
    myAudioElements : [],
    usedLetters:[],
    guessesLeft:0,
    activeAnswer: "",
    isCharHidden: [],
    hasWon: false,
    charFound: function(letter){

        //parse activeAnswer for position(s) of matching character
       for(var i = 0; i < game.activeAnswer.length; i++){
       
            if(game.activeAnswer.charAt(i) === letter || game.activeAnswer.charAt(i)  === letter.toUpperCase()){
                game.isCharHidden[i] = false;
            }
       }
       $("#hiddenWord").html(game.updatedDisplay());
        
        //check to see if puzzle solved by looking for all true values in isCharHidden
        game.hasWon = game.checkForWinner(game.isCharHidden[game.isCharHidden.length-1]);
        console.log("game.hasWon: " + game.hasWon);
        if(!game.hasWon){
            alert("You WON!!");
        }
       
    },
    charNotFound: function(letter){
        
        game.guessesLeft--;
        $("#guessesLeft").html("Guesses left: " + game.guessesLeft);

        if(game.guessesLeft > 0){
            $("#wrongLetters").append(letter + " ");
        } else {
                alert("Game Over!")
        }
    },
    updatedDisplay: function(){

        var str = "";

        game.isCharHidden.forEach(function(bool, i){
            if(bool){
                console.log("true");
                str += "_ ";
            } else {
                console.log(i);
                console.log("false");
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
        console.log("check for winner");
        if(game.isCharHidden[i] == false){
            console.log(i + " is false");
            if( i === 0){
                //alert("WINNER");
                return true;
            } else {
                i--;
                console.log("i now = " + i + " check again");
                game.checkForWinner(i);
            }
        } else 
        return false;
    }
};

document.onkeyup = function(evet){
    console.log("KeyUp");
    var userGuess = event.key.toLocaleLowerCase();

    if (game.alphabet.indexOf(userGuess) > -1) {
        console.log("used letter position: " + game.usedLetters.indexOf(userGuess));
        if(game.usedLetters.indexOf(userGuess) < 0){
            game.usedLetters.push(userGuess);
            console.log("user guessed letter: " + userGuess);
            game.checkLetter(userGuess);
        } 
    } else if(event.key.toLocaleLowerCase() == '1'){
         init();
    }
}

function init(){
    // rand number, modulus length of game.answers
    var secretAnswer = game.answers[Math.floor(Math.random() * game.answers.length)];
    
    // set active answer
    game.activeAnswer = secretAnswer;
    game.guessesLeft = 9; 

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
    
    // initialize wrong letter 
    $("#wrongLetters").html("");

    // initialize guess left 
    $("#guessesLeft").html("Guesses left: " + game.guessesLeft);

   // jQuery alternative to: var newDiv = document.createElement("div");
   var newDiv = $("<span id=wLetters>");

   // jQuery alternative to: newDiv.textContent = "A pleasure to meet you!";
   newDiv.text("");

   // jQuery alternative to: document.querySelector("#empty-div").appendChild(newDiv);
   $("#wrongLetters").append(newDiv);
   console.log("pre-load audio files");
   
   // Load audio elements
    // game.audioFiles.forEach( function(mySrc, i){
    //     console.log("load audio files");
    // game.myAudioElements[i] = document.createElement("audio");
    // game.myAudioElements[i].setAttribute("src", mySrc);
    // });
};
//END OF INIT()

 // JavaScript function that wraps everything
 $( document ).ready(function() {

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