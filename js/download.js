/**
 * Download Function,
 * Just for downloading file with javascript
 * @param {String} filename
 * @param {String} text
 */
function download(filename, text) {
  console.log("donwloaded");
  var element = document.createElement("a");

  let url = window.URL.createObjectURL(new Blob([text], { type: "text/csv" }));
  element.setAttribute("href", url);
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();
  document.body.removeChild(element);
}
