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
  let questionPlace = document.querySelector(".showNext .question");
  let answerPlace = document.querySelector(".showNext .answer");
  let examplePlace = document.querySelector(".showNext .example");
  let showBtn = document.querySelector(".showNext .show");
  let nextBtn = document.querySelector(".showNext .next");
  let counter = 0;
  nextBtn.onclick = function () {
    let randomItem = Math.floor(Math.random() * questions.length);
    let forQuestion = questions[randomItem];
    let forAnswers = answers[randomItem];
    let forExamples = examples[randomItem];
    questions.splice(randomItem, 1);
    answers.splice(randomItem, 1);
    examples.splice(randomItem, 1);
    questionPlace.innerHTML = ++counter + ": " + forQuestion;
    answerPlace.innerHTML = "Answer";
    examplePlace.innerHTML = "Examble";
    showBtn.onclick = function () {
      answerPlace.innerHTML = forAnswers;
      examplePlace.innerHTML = forExamples;
    };
  };
}
fetch("words.txt")
  .then((response) => response.text())
  .then((data) => {
    let lists = ne2st(data);
    showNext(lists[1], lists[0], lists[2]);
  });
