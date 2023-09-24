const scores = JSON.parse(localStorage.getItem("highScores"));
const list = document.querySelector("ol");
if (scores) {
  const content = scores.map((score, index) => {
    console.log(score);
    console.log(index);
    return `
    <li>
        <span>${index + 1}</span>
        <p>${score.username}</p>
        <span>${score.userRank}</span>
    </li>
    `;
  });
  list.innerHTML = content.join("");
} else {
  list.innerHTML = "<li>there is no scores</li>";
}
