// get all element in html
const box = document.getElementById("box");

const btnPick = document.getElementById("btn-pick");
const btnSort = document.getElementById("btn-sort");
const btnTeam = document.getElementById("btn-team");
const fieldMaxTeamMember = document.getElementById("max-team-member");

const display = document.getElementById("result");

// variable contain result of pick for download
let downloadResult = [];

// Event Listeners
btnPick.addEventListener("click", pickerListener);
btnSort.addEventListener("click", sortListener);
btnTeam.addEventListener("click", teamListener);

display.addEventListener("click", downloadListener);

/**
 * Function to get input from user and
 * make array of members
 * from split input
 * @returns {Array}
 */
function getInput() {
  return box.value.split("\n");
}
/**
 * Function to reset display result and show result
 * @param {*} id
 */
function showResult(result) {
  display.innerHTML = "";
  display.appendChild(result);
}

/**
 * Function to create download button
 * with id
 * @param {String} id
 */
function createDownloadButton(id) {
  const dwnldBtn = document.createElement("button");
  dwnldBtn.id = id;
  dwnldBtn.innerHTML = "Download CSV";
  display.appendChild(dwnldBtn);
}

// Listener Function

/**
 * Listener function for picker button
 * It will make random picker from input
 * and show result
 */
function pickerListener(e) {
  e.preventDefault();

  // get input from user
  const members = getInput();
  // create result
  const result = randomPick(members);
  // create html result for display and show
  const p = document.createElement("p");
  p.innerHTML = result;
  showResult(p);
}

/**
 * Listener function for random sort button
 * It will make random sort from input
 * and show result
 * Result will be random sort
 * Show as list in html
 * After showing result, it will create download button
 * with id sort-dwnld
 * And change variable downloadResult to result
 */
function sortListener(e) {
  e.preventDefault();

  // get input from user
  const members = getInput();

  // create result
  const result = randomSort(members);

  // create html result for display
  const ol = document.createElement("ol");
  result.forEach((res) => {
    const li = document.createElement("li");
    li.innerHTML = res;
    ol.appendChild(li);
  });

  // show result
  showResult(ol);
  // change download result
  downloadResult = result;
  // create download button
  createDownloadButton("sort-dwnld");
}

/**
 * Listener function for random team button
 * It will make random team from input
 * and show result
 * Result will be random team
 * Show as list in list in html
 * After showing result, it will create download button
 * with id team-dwnld
 * And change variable downloadResult to result
 */
function teamListener(e) {
  e.preventDefault();

  // get max team member from user
  const maxTeamMember = parseInt(fieldMaxTeamMember.value);
  // check if max team member is valid
  if (!maxTeamMember || maxTeamMember < 1) {
    return alert("isi maksimal setimnya\njangan ngadi-ngadi ngisinya");
  }

  // get input from user
  const members = getInput();

  // create result
  const teams = makeGroup(randomSort(members), maxTeamMember);

  // create html result for display
  const olOut = document.createElement("ol");
  teams.forEach((team) => {
    const liOut = document.createElement("li");
    const olIn = document.createElement("ol");
    team.forEach((member) => {
      const li = document.createElement("li");
      li.innerHTML = member;
      olIn.appendChild(li);
    });
    liOut.appendChild(olIn);
    olOut.appendChild(liOut);
  });

  // show result
  showResult(olOut);
  // change download result
  downloadResult = teams;
  // create download button
  createDownloadButton("team-dwnld");
}

/**
 * Listener function for download button
 * It will create csv file from downloadResult
 * and download it
 *
 * Listener on display cause download button will be created after show result
 */
function downloadListener(e) {
  e.preventDefault();

  // check id of button
  if (e.target.id === "sort-dwnld") {
    // create head of csv
    var result = "Urutan,Anggota";
    // by looping downloadResult and add to result it will create body of csv
    downloadResult.forEach((res, i) => {
      result += `\n${i + 1},${res}`;
    });
    // create and download csv file from result
    // with name result.csv
    // this function on another file
    download("result.csv", result);
  }
  // check id of button
  if (e.target.id == "team-dwnld") {
    // create head of csv
    var result = "Team,No Anggota,Anggota";
    // by looping downloadResult and add to result it will create body of csv
    downloadResult.forEach((res, i) => {
      result += `\n${i + 1}`;
      res.forEach((r, j) => {
        result += `\n,${j + 1},${r}`;
      });
    });
    // create and download csv file from result
    // with name result.csv
    // this function on another file
    download("result.csv", result);
  }
}
