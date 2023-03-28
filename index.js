// initialize empty array to hold leaderboard data
let leaderboardData = [];



// function to add data to leaderboard
function addToLeaderboard() {
    // get the leaderboard table and form elements
const leaderboardTable = document.getElementById("leaderboard");
const nameInput = document.getElementById("name");
const scoreInput = document.getElementById("score");
  // get input values and create new player object
  const playerName = nameInput.value;
  const playerScore = Number(scoreInput.value);
  const newPlayer = { name: playerName, score: playerScore };

  // add new player object to leaderboard data array
  leaderboardData.push(newPlayer);

  // sort leaderboard data by score in descending order
  leaderboardData.sort((a, b) => b.score - a.score);

  // clear form input fields
  nameInput.value = "";
  scoreInput.value = "";

  // loop through the sorted data and add rows to the table
  leaderboardTable.innerHTML = ""; // clear existing rows from table
  leaderboardData.forEach((player, index) => {
    const row = leaderboardTable.insertRow(-1); // -1 appends the row at the end of the table
    const rankCell = row.insertCell(0);
    const nameCell = row.insertCell(1);
    const scoreCell = row.insertCell(2);
    rankCell.textContent = index + 1; // rank is the index plus 1
    nameCell.textContent = player.name;
    scoreCell.textContent = player.score;
  });
}

// function to download leaderboard as JSON file
function downloadLeaderboard() {
  const leaderboardJSON = JSON.stringify(leaderboardData);
  const blob = new Blob([leaderboardJSON], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "leaderboard.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// function to load leaderboard from JSON file
function loadLeaderboard() {
  fetch("leaderboard.json")
    .then(response => response.json())
    .then(data => {
      leaderboardData = data;
      renderLeaderboard();
    })
    .catch(error => console.error(error));
}

// function to render leaderboard table
function renderLeaderboard() {
        // get the leaderboard table and form elements
const leaderboardTable = document.getElementById("leaderboard");
const nameInput = document.getElementById("name");
const scoreInput = document.getElementById("score");
      // sort leaderboard data by score in descending order
  leaderboardData.sort((a, b) => b.score - a.score);

  // clear form input fields
  nameInput.value = "";
  scoreInput.value = "";

  // loop through the sorted data and add rows to the table
  leaderboardTable.innerHTML = ""; // clear existing rows from table
  leaderboardData.forEach((player, index) => {
    const row = leaderboardTable.insertRow(-1); // -1 appends the row at the end of the table
    const rankCell = row.insertCell(0);
    const nameCell = row.insertCell(1);
    const scoreCell = row.insertCell(2);
    rankCell.textContent = index + 1; // rank is the index plus 1
    nameCell.textContent = player.name;
    scoreCell.textContent = player.score;
  })
}
