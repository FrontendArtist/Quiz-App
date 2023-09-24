const scoreBox = document.querySelector("p");
const username = document.querySelector("#user-name");
const save = document.querySelector("#save-button");
const score = JSON.parse(localStorage.getItem("score"));
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const loadHandler = () => {
  scoreBox.innerText = score;
};
const saveHandler = () => {
  if (!username.value || !score) {
    alert("invalid username or score");
  } else {
    const userInfo = { username: username.value, userRank: scoreBox.innerText };
    highScores.push(userInfo);
    highScores.sort((a,b)=> b.userRank - a.userRank)
    console.log(highScores);
    localStorage.setItem("highScores", JSON.stringify(highScores));
    alert("Saved ");
  }
};

window.addEventListener("load", loadHandler);
save.addEventListener("click", saveHandler);
