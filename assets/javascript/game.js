var game = {
    answers : ["Taladega Nights", 
    "Elf", 
    "Anchorman", 
    "Blades of Glory",
    "Daddy's Home",
    "Stepbrother",
    "Zoolander",
    "Old School"],
    alphabet:["a","b", "c", "d", "e", "f", "g",
    "h","i","j","k","l","m","n","o","p","q","r",
    "s","t","u","v","w","x","y","z"],
    useLetters:[],
    tries:0,
    maxAttempts:9,
    activeAnswer: "",
    checkLetter: function(letter){
        if (game.activeAnswer.indexOf(letter) > -1) {
            console.log("Letter Guessed Correct")
        } else {
            console.log("WRONG");
        }
    }
};

document.onkeyup = function(evet){
    console.log("on");
    var userGuess = event.key.toLocaleLowerCase();

    if (game.alphabet.indexOf(userGuess) > -1) {
        console.log("user guessed letter: " + userGuess);
        game.checkLetter(userGuess);
        $("#wrongLetters").append(userGuess + " ");
    } else if(event.key.toLocaleLowerCase() == '1'){
        startfGame();
    }
}

function startfGame(){
    // rand number, modulus length of game.answers
    var secretAnswer = game.answers[Math.floor(Math.random() * game.answers.length)];
    game.activeAnswer = secretAnswer;
    //display _ _ _ _ unscores with space for each letter in answer the user will be guessing
    var hiddenWord = '';
    for( var i = 0; i < secretAnswer.length; i++){
       hiddenWord = hiddenWord + "_ "; 
    }
   console.log(hiddenWord);

   $("#hiddenWord").html(hiddenWord);

   // jQuery alternative to: var newDiv = document.createElement("div");
   var newDiv = $("<div id=wLetters>");

   // jQuery alternative to: newDiv.textContent = "A pleasure to meet you!";
   newDiv.text("p");

   // jQuery alternative to: document.querySelector("#empty-div").appendChild(newDiv);
   $("#wrongLetters").append(newDiv);

    //wait user input for letter
    secretAnswer.charAt
    //user types key now handle 

    //user picks right letter

    //user solved word?

    //pick wrong letter

    //user lost


}

