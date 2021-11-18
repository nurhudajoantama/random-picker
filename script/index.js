const box = document.getElementById("box");

const btnPick = document.getElementById("btn-pick");
const btnSort = document.getElementById("btn-sort");
const btnTeam = document.getElementById("btn-team");
const fieldMaxTeamMember = document.getElementById("max-team-member");

const display = document.getElementById("result");

let downloadResult = [];

display.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.id === "sort-dwnld") {
    var result = "Urutan,Anggota";
    downloadResult.forEach((res, i) => {
      result += `\n${i + 1},${res}`;
    });
    download("result.csv", result);
  }

  if (e.target.id == "team-dwnld") {
    var result = "Team,No Anggota,Anggota";
    downloadResult.forEach((res, i) => {
      result += `\n${i + 1}`;
      res.forEach((r, j) => {
        result += `\n,${j + 1},${r}`;
      });
    });
    download("result.csv", result);
  }
});

btnPick.addEventListener("click", (e) => {
  e.preventDefault();

  const members = box.value.split("\n");
  const result = randomPick(members);

  display.innerHTML = result;
});

btnSort.addEventListener("click", (e) => {
  e.preventDefault();

  const members = box.value.split("\n");
  const result = randomSort(members);

  const ol = document.createElement("ol");
  result.forEach((res) => {
    const li = document.createElement("li");
    li.innerHTML = res;
    ol.appendChild(li);
  });

  display.innerHTML = "";
  display.appendChild(ol);
  downloadResult = result;

  const dwnldBtn = document.createElement("button");
  dwnldBtn.id = "sort-dwnld";
  dwnldBtn.innerHTML = "Download CSV";
  display.appendChild(dwnldBtn);
});

btnTeam.addEventListener("click", (e) => {
  e.preventDefault();

  const maxTeamMember = parseInt(fieldMaxTeamMember.value);
  if (!maxTeamMember || maxTeamMember < 1) {
    return alert("isi maksimal setimnya\njangan ngadi-ngadi ngisinya");
  }

  const members = box.value.split("\n");
  const teams = makeGroup(randomSort(members), maxTeamMember);

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

  display.innerHTML = "";
  display.appendChild(olOut);
  downloadResult = teams;

  const dwnldBtn = document.createElement("button");
  dwnldBtn.id = "team-dwnld";
  dwnldBtn.innerHTML = "Download CSV";
  display.appendChild(dwnldBtn);
});

function randomPick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Fisher-Yates shuffle
function randomSort(arr) {
  var i = arr.length;
  if (i == 0) return false;
  while (--i) {
    var j = Math.floor(Math.random() * (i + 1));
    var tempi = arr[i];
    var tempj = arr[j];
    arr[i] = tempj;
    arr[j] = tempi;
  }
  return arr;
}

function makeGroup(arr, n) {
  if (!n || isNaN(n) || n < 1) return;
  var result = [];
  while (arr.length > 0) {
    result.push(arr.splice(0, n));
  }
  return result;
}

function download(filename, text) {
  var element = document.createElement("a");
  element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text));
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
