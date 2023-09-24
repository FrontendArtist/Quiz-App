const buttons = document.querySelectorAll("button");

const difficultyHandler = (event) => {
  const difficulty = event.target.innerText;
  switch (difficulty) {
    case "Easy":
      localStorage.setItem("difficulty", JSON.stringify("Easy"));
      alert("difficulty is Hard");
      break;
    case "Medium":
      localStorage.setItem("difficulty", JSON.stringify("Medium"));
      alert("difficulty is Medium");
      break;
    case "Hard":
      localStorage.setItem("difficulty", JSON.stringify("Hard"));
      alert("difficulty is Easy");
      break;

    default:
        localStorage.setItem("difficulty", JSON.stringify("Medium"));
      break;
  }
};

buttons.forEach((button) => {
  button.addEventListener("click", difficultyHandler);
});
