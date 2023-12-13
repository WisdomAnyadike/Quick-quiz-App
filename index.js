
  let theTime = parseFloat(0.0);
  let makeQuestionInterval;
  let main = document.getElementById("main");
  let previousButton = document.getElementById("previous");
  let nextButton = document.getElementById("next");
  let createnew = document.getElementById("createnew");
  let container = document.getElementById("container");
  let options = document.getElementById("options");
  let finalScore 

  let cbt = [];
  let score = [];
  let n = 0;
  let done = false;
  let intervalSet = false;

  let createTestButton = document.getElementById("createtest");
  createTestButton.style.visibility = "hidden";
  previousButton.style.visibility = "hidden";
  nextButton.style.visibility = "hidden";
  createnew.style.visibility = "hidden";

  function newQuestion() {
    theTime = theTime += parseFloat(20.0);
    console.log(theTime);
    let question = document.getElementById("question");
    let answer = document.getElementById("answer");

    if (question.value == "" || options.value == "" || answer.value == "") {
      alert("Fill up the empty fields");
      return;
    }

    let questionBank = {
      que: String(question.value).toUpperCase(),
      options: String(options.value).toLowerCase().trim().split(","),
      answer: String(answer.value).toLowerCase().trim(),
    };
    cbt.push(questionBank);

    question.value = "";
    options.value = "";
    answer.value = "";

    console.log(cbt);
    createTestButton.style.visibility = "visible";
  }

  function createNew() {

    document.body.innerHTML = `<div class="contain">
	<div class="loader">
		<span></span>
	</div>
</div>
<a href="https://wizportfolio.surge.sh" target="_blank"><span></span> Loading...  <span> Please wait </span></a>`

    setTimeout(()=> {
      window.location.reload();
    } , 5000)
  
  }

  let smallTime = document.getElementById("smallTime");

  function makeQuestion(i) {
    previousButton.style.visibility = "visible";
    nextButton.style.visibility = "visible";
    main.style.visibility = "hidden";
    createTestButton.style.visibility = "hidden";
    createnew.style.visibility = "visible";
    container.style.visibility = "visible";
    previousButton.style.visibility = "visible";
    nextButton.style.visibility = "visible";
    legendText.style.visibility = "hidden";

    let lastQuestion = cbt.length - 1;
     finalScore = score.reduce((a, b) => a + b, 0);

    if (i < 0) {
      n = n + 1;
      return alert("Stop, click next to proceed");
    } else if (i > lastQuestion) {
      n = n - 1;
      let ourPrompt;
      ourPrompt = String(prompt("Do you want to submit?", "yes or no"))
        .toLowerCase()
        .trim();

      if (ourPrompt === "yes") {
        done = true;
        theTime = 0
        thediv.innerHTML = "";
        section.innerHTML = "";
        smallTime.innerHTML = ``;
        thediv.innerHTML = `<h1> your score is ${finalScore} out of ${cbt.length} </h1>`;
        return alert(`your score is ${finalScore} out of ${cbt.length} `);
      } else if (ourPrompt === "no") {
        return makeQuestion(lastQuestion);
      } else {
        return alert("invalid answer");
      }
    } else {
      thediv.innerHTML = "";
      thediv.innerHTML = `
     
      
      <h1>${cbt[i].que} </h1>                                       
      ${cbt[i].options.map((obj) => {
        return `<div id='okay'>
         <label for='${obj}'> ${obj} </label> 
        <input type='radio' name='word' id='${obj}'  value="${obj}" onclick ="getAns(${i})" > `;
      })}  
      </div>  
      `;
    }
  }

  function getAns(index) {
    let radioInput = document.querySelectorAll('input[name = "word"]');
    console.log(radioInput);

    let selectedValue;
    radioInput.forEach((radio) => {
      if (radio.checked) {
        selectedValue = radio.value;

        if (selectedValue == cbt[index].answer) {
          score.splice(index, 1);
          score.push(1);
        } else {
          score.splice(index, 1);
          score.push(+0);
        }
      }
    });
  }

  previousButton.addEventListener("click", () => {
    score.pop();
  });

  options.addEventListener("keyup", () => {
    let legendText = document.getElementById("legendText");
    legendText.style.visibility = "visible";
  });
  options.addEventListener("keydown", () => {
    let legendText = document.getElementById("legendText");
    legendText.style.visibility = "hidden";
  });

  let createExam = document.getElementById("createexam");
  createExam.addEventListener("click", () => {

    let timeInterval = setInterval(() => {
      if (theTime > 0) {
        theTime--;
        theTime = theTime;
        console.log(theTime);
        smallTime.innerHTML = `Test Duration: ${theTime}.00s`;
      } else {
        if (done == false) {
            finalScore = score.reduce((a, b) => a + b, 0);
          clearInterval(timeInterval);
          theTime = 0;
          alert(
            "Thanks for taking the Test, \n your score will be shown on click of OK"
          );
          thediv.innerHTML = "";
          section.innerHTML = "";

          thediv.innerHTML = `<h1> your score is ${finalScore} out of ${cbt.length} </h1>`;
          return alert(`your score is ${finalScore} out of ${cbt.length}`);

        } else {
          clearInterval(timeInterval);
          theTime = 0;
        }
      }
    }, 1000);
  });








