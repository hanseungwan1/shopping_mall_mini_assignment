const btnContainner = document.querySelector(".btn_containner");
const listContainer = document.querySelector(".list_container");

let listData = null;

document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3001/data")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      if (data.length === 0) throw new Error("Network response was not ok");
      else {
        listData = data;
        listRender();
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
});

btnContainner.addEventListener("click", (e) => {
  const target = e.target.classList[0];

  if (target === "blue" || target === "yellow" || target === "pink") {
    deleteList();
    listRender(target);
  } else if (target === "pants" || target === "skirt" || target === "tshirt") {
    deleteList();
    listRender(target);
  }
});

function listRender(option) {
  let data = [];
  if (option === "blue" || option === "pink" || option === "yellow") {
    data = listData.filter((el) => el[3] === option);
  } else if (option === "pants" || option === "skirt" || option === "tshirt") {
    data = listData.filter((el) => el[4] === option);
  } else data = listData;

  data.forEach((el) => {
    const liElement = document.createElement("li");
    const itemImgElement = document.createElement("img");
    const itemTextElement = document.createElement("span");
    itemImgElement.src = `./imgs/${el[0]}.png`;
    itemTextElement.innerHTML = `${el[1]}, ${el[2]}`;
    liElement.append(itemImgElement, itemTextElement);
    listContainer.append(liElement);
  });
}

function deleteList() {
  listContainer.innerHTML = "";
}
