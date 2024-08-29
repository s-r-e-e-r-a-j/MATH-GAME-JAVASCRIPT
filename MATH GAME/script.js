let operators = ["+", "-", "*"];
const startBtn = document.querySelector("#start-btn");

const question = document.querySelector("#question");

const controls = document.querySelector(".controls-container");

const result = document.querySelector("#result");

const submitBtn = document.querySelector("#submit-btn");

const errorMessage = document.querySelector("#error-msg");

let answerValue;

let operatorQuestion;

var speech=new SpeechSynthesisUtterance();
speech.lang="en-US"||"en-UK"||"en-GB";
speech.volume=1;
speech.pitch=0.8;
speech.rate=0.8;

const randomValue = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const questionGenerator = () => {
  
  let [num1, num2] = [randomValue(1, 20), randomValue(1, 20)];

  
  let randomOperator = operators[Math.floor(Math.random() * operators.length)];

  if (randomOperator == "-" && num2 > num1) {

    [num1, num2] = [num2, num1];

  }

  
  let solution = eval(`${num1}${randomOperator}${num2}`);

  
  let randomVar = randomValue(1, 5);

  if (randomVar == 1) {

    answerValue = num1;

    question.innerHTML = `<input type="number" id="inputValue" placeholder="?"\> ${randomOperator} ${num2} = ${solution}`;

  }
  
  else if (randomVar == 2) {

    answerValue = num2;

    question.innerHTML = `${num1} ${randomOperator}<input type="number" id="inputValue" placeholder="?"\> = ${solution}`;
    
  }
  
  else if (randomVar == 3) {

    answerValue = randomOperator;

    operatorQuestion = true;

    question.innerHTML = `${num1} <input type="text" id="inputValue" placeholder="?"\> ${num2} = ${solution}`;

  }
  
  else {

    answerValue = solution;
    question.innerHTML = `${num1} ${randomOperator} ${num2} = <input type="number" id="inputValue" placeholder="?"\>`;

  }

  
  submitBtn.addEventListener("click", () => {

    errorMessage.classList.add("hide");

    let userInput = document.querySelector("#inputValue").value;
    
    if (userInput) {
      
      if (userInput == answerValue) {

        stopGame(`How Is It Possible!! it is a <span>Correct</span> Answer`);
        speech.text="how is it possible! . it is a correct answer";
        window.speechSynthesis.speak(speech);

      }

      
      else if (operatorQuestion && !operators.includes(userInput)) {

        errorMessage.classList.remove("hide");

        errorMessage.innerHTML = "Please enter a valid operator";
        speech.text="please enter a valid operator";
        window.speechSynthesis.speak(speech);

      }
      

      else {

        stopGame(`Opps!! <span>Wrong</span> Answer`);
        speech.text="oops! . wrong answer";
        window.speechSynthesis.speak(speech);

      }
    }
    //If user input is empty
    else {

      errorMessage.classList.remove("hide");
      errorMessage.innerHTML = "Input Cannot Be Empty";
      speech.text="input cannot be empty";
      window.speechSynthesis.speak(speech);

    }

  });
};

//Start Game
startBtn.addEventListener("click", () => {

  operatorQuestion = false;

  answerValue = "";

  errorMessage.innerHTML = "";

  errorMessage.classList.add("hide");

  //Controls and buttons visibility
  controls.classList.add("hide");

  startBtn.classList.add("hide");

  questionGenerator();
});

//Stop Game
const stopGame = (resultText) => {

  result.innerHTML = resultText;
  startBtn.innerText = "Restart";
  controls.classList.remove("hide");
  startBtn.classList.remove("hide");

};