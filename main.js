function ne2st(lines) {
  let mainList = lines.split("#");
  mainList.shift();
  let words = [];
  let def = [];
  let exp = [];
  for (let i = 0; i < mainList.length; i++) {
    let value = mainList[i].substring(0, mainList[i].length - 1);
    if (i % 3 == 0) {
      words.push(value);
    } else if (i % 3 == 1) {
      def.push(value);
    } else {
      exp.push(value);
    }
  }
  let lists = [words, def, exp];
  return lists;
}
function showNext(questions, answers, examples) {
  let showNext = document.querySelector(".showNext");
  let userAnswer = document.querySelector(".showNext .user");
  let resultPlace = document.querySelector(".showNext .result");
  let questionPlace = document.querySelector(".showNext .question");
  let answerPlace = document.querySelector(".showNext .answer");
  let examplePlace = document.querySelector(".showNext .example");
  let showBtn = document.querySelector(".showNext .show");
  let nextBtn = document.querySelector(".showNext .next");
  let counter = 0;
  let mistakes = [];
  nextBtn.onclick = function (eve) {
    eve.preventDefault();
    if (!questions.length) {
      showNext.innerHTML = `
      <p>done</p>
      <br>
      <p>${mistakes}<p>`;
    }
    let randomItem = Math.floor(Math.random() * questions.length);
    let forQuestion = questions[randomItem];
    let forAnswers = answers[randomItem];
    let forExamples = examples[randomItem];
    questions.splice(randomItem, 1);
    answers.splice(randomItem, 1);
    examples.splice(randomItem, 1);
    questionPlace.innerHTML = ++counter + ": " + forQuestion;
    userAnswer.value = "";
    resultPlace.innerHTML = "Result";
    answerPlace.innerHTML = "Answer";
    examplePlace.innerHTML = "Examble";
    showBtn.style.display = "inline";
    showBtn.onclick = function () {
      eve.preventDefault();
      answerPlace.innerHTML = forAnswers;
      examplePlace.innerHTML = forExamples;
      if (
        userAnswer.value == forAnswers.substring(1, forAnswers.indexOf("(") - 1)
      ) {
        resultPlace.innerHTML = "True";
      } else {
        resultPlace.innerHTML = "False";
        mistakes.push(forAnswers);
      }
      showBtn.style.display = "none";
    };
  };
}
fetch("words.txt")
  .then((response) => response.text())
  .then((data) => {
    let lists = ne2st(data);
    showNext(lists[1], lists[0], lists[2]);
  });
