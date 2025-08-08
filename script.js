const API = "7721db26b174b79a9d66565c52978ae5";
const locationInput = document.getElementById("location");
const btn = document.getElementById("btn");
const result = document.getElementById("result");

function clearResult() {
  result.innerHTML = "";
}

function showMessage(msg, color = "#000") {
  clearResult();
  const p = document.createElement("p");
  p.textContent = msg;
  p.style.color = color;
  result.appendChild(p);
}

function createWeatherCard(data) {
  clearResult();

  const container = document.createElement("div");
  container.style.marginTop = "12px";
  container.style.padding = "12px 16px";
  container.style.border = "1px solid #e5e7eb";
  container.style.borderRadius = "12px";
  container.style.maxWidth = "340px";

  const header = document.createElement("div");
  header.style.display = "flex";
  header.style.alignItems = "center";
  header.style.gap = "12px";

  const img = document.createElement("img");
  img.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  img.alt = data.weather[0].description;
  img.width = 64;
  img.height = 64;

  const infoBox = document.createElement("div");
  const nameEl = document.createElement("div");
  nameEl.textContent = `${data.name}, ${data.sys.country}`;
  nameEl.style.fontWeight = "700";
  nameEl.style.fontSize = "18px";

  const descEl = document.createElement("div");
  descEl.textContent = data.weather[0].description;
  descEl.style.color = "#6b7280";
  descEl.style.textTransform = "capitalize";

  infoBox.appendChild(nameEl);
  infoBox.appendChild(descEl);

  header.appendChild(img);
  header.appendChild(infoBox);
  container.appendChild(header);

  const tempEl = document.createElement("div");
  tempEl.textContent = `${Math.round(data.main.temp)}°C`;
  tempEl.style.fontSize = "36px";
  tempEl.style.fontWeight = "800";
  tempEl.style.margin = "8px 0";

  const feelsEl = document.createElement("div");
  feelsEl.textContent = `Feels like ${Math.round(data.main.feels_like)}°C`;
  feelsEl.style.color = "#6b7280";
  feelsEl.style.marginBottom = "8px";

  container.appendChild(tempEl);
  container.appendChild(feelsEl);

  const extras = document.createElement("div");
  extras.style.display = "grid";
  extras.style.gridTemplateColumns = "1fr 1fr";
  extras.style.gap = "8px";

  const humidityEl = document.createElement("div");
  humidityEl.style.background = "#f9fafb";
  humidityEl.style.color = "black";
  humidityEl.style.padding = "8px";
  humidityEl.style.borderRadius = "8px";
  humidityEl.textContent = `💧 Humidity: ${data.main.humidity}%`;

  const windEl = document.createElement("div");
  windEl.style.background = "#f9fafb";
  windEl.style.color = "black";
  windEl.style.padding = "8px";
  windEl.style.borderRadius = "8px";
  windEl.textContent = `🌬 Wind: ${data.wind.speed} m/s`;

  const resetbtn = document.createElement("button");
  resetbtn.classList.add("input-text", "butn");
  resetbtn.textContent = "Reset";
  resetbtn.style.display = "flex";

  extras.appendChild(humidityEl);
  extras.appendChild(windEl);
  extras.appendChild(resetbtn);

  container.appendChild(extras);

  result.appendChild(container);

  resetbtn.addEventListener("click", function () {
    clearResult();
  });
}

async function getWeather(city) {
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}&units=metric`;

  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    if (res.ok || data.cod === "200") {
      createWeatherCard(data);
      console.log("200");
      return;
    }
    showMessage("City not found. Try another name.", "#b00020");
  } catch (err) {
    showMessage("Network error. Please try again.", "#b00020");
  }
}

btn.addEventListener("click", function () {
  const city = locationInput.value.trim();
  if (city) {
    getWeather(city);
  } else {
    showMessage("Please enter a city name.", "#b00020");
  }
});
