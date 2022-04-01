function readTextFile(file, callback) {
  var rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4 && rawFile.status == "200") {
      callback(rawFile.responseText);
    }
  };
  rawFile.send(null);
}

const selectEl = document.getElementById("select");
const vehiclePlates = document.querySelector(".vehicle_plate");

readTextFile("vehicle_plates.json", function (text) {
  let data = JSON.parse(text);
  selectEl.innerHTML = data
    .map(
      (el) => `
  <select id="select" >
                <option value="${el.city}">${el.city}</option>
   </select>
  `
    )
    .join(" ");
  vehiclePlates.innerHTML = `Biển số xe là: ${data[0].plate_no} `;
  selectEl.addEventListener("change", (event) => {
    data.forEach((element) => {
      if (element.city === event.target.value) {
        vehiclePlates.innerHTML = `Biển số xe là: ${element.plate_no}`;
      }
    });
  });
});
