const form = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const keyInput = document.getElementById("key-input");
const imageResults = document.getElementById("image-results");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const key = keyInput.value;
  const query = searchInput.value;
  searchImages(query, key);
});

async function searchImages(query, key) {
  let headers = new Headers();
  headers.append("Authorization", `Client-ID ${key}`);

  const url = `https://api.unsplash.com/search/photos?page=1&query=${query}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });
    const data = await response.json();
    data.results && data.results.length > 0
      ? displayImages(data.results)
      : alert(data.errors[0]);
  } catch (error) {
    console.log(error);
  }
}

function displayImages(images) {
  imageResults.innerHTML = "";

  images.forEach(function (image) {
    const card = document.createElement("div");
    card.classList.add("image-card");

    const img = document.createElement("img");
    img.src = image.urls.small;
    img.alt = image.description;

    card.appendChild(img);
    imageResults.appendChild(card);
  });
}
