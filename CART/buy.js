let buy = JSON.parse(localStorage.getItem("buyitem"));

let container = document.querySelector(".buy_container");

async function getItems() {
  for (i = 0; i < buy.length; i++) {
    let res = await fetch(`https://dummyjson.com/products/${buy[i]}`);
    data = await res.json();
    Showdata(data);
  }
}

function Showdata(data) {
  let cards = document.createElement("div");
  cards.classList.add("buybox"); //class
  cards.innerHTML = `
            
            <img src="${data.images[0]}" id="imageslike">
            <div class ="itemdetails ">
            <p id="itemlike_name">${data.title}</p>
            <p id="pricelike">$ ${data.price}</p>
            <div class="descriptions">
            <p id="desc">${data.description}</p>
            </div>
            <p class="delivery">Delivery By tomorrow<p>
            </div>
            <button onclick="remove()" class="remove">X</button>
            `;
  container.appendChild(cards);
}

function remove(id) {
  let removebuy = JSON.parse(localStorage["buyitem"]); // JSON.parse() converts string to array
  removebuy.splice(removebuy.indexOf(id), 1);
  localStorage["buyitem"] = JSON.stringify(removebuy);
  container.innerHTML = "";
  Showdata(data);
}

getItems();
