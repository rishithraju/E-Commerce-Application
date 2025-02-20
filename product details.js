let row = document.querySelector(".row");
console.log(row);

let data1 = [];

async function fetchData() {
  const response = await fetch("https://fakestoreapi.com/products");
  const data = await response.json();
  console.log(data);
  let id = localStorage.getItem("id");

  if (id == null || id === "undefined") {
    createcards(data);
  } else {
    displayDetails(data, id);
  }
  data.map((ele) => {
    data1.push(ele);
  });
}
fetchData();

var image = "";
function createcards(source) {
  image = ""; 
  source.forEach((currObj) => {
    let x = ` 
        <div style="border:1px solid grey; width:275px; height:480px; text-align:center;">
            <img style="width:250px; height:275px;" src="${currObj.image}" alt="img1">
            <h4 style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${currObj.title}</h4>
            <p style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${currObj.description}</p><hr>
            <p style="text-align:center;">${currObj.price}</p><hr>

            <button style="background-color:black; color:whitesmoke ; padding:8px; border-radius:4px; text-align:center;" class="details" data-id="${currObj.id}">Details</button>
            <button style="background-color:black; color:whitesmoke; padding:8px; border-radius:4px; text-align:center;" class="add-to-cart" data-id="${currObj.id}">Add to Cart</button>
        </div>`;
    image += x;
  });
  row.innerHTML = image;

  let detailsBtn = document.querySelectorAll(".details");
  let addToCartBtn = document.querySelectorAll(".add-to-cart");

  detailsBtn.forEach((deBtn) => {
    deBtn.addEventListener("click", (e) => {
      let id = e.target.dataset.id;
      localStorage.setItem("id", id);
      window.location.href = "./product.html";
    });
  });

  addToCartBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let id = e.target.dataset.id;
      let product = data1.find((ele) => ele.id == id);
      addProductToLocalStorage(product);
    });
  });
}

function addProductToLocalStorage(item) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let existingItem = cart.find(product => product.id === item.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${item.title} added to cart!`);
}

function displayDetails(data, id) {
  let product = data.find((ele) => ele.id == id);
  if (!product) {
    console.error(`Product with id ${id} not found`);
    return;
  }
  let detailHTML = `
    <div class="card col-4" style="width: 18rem; justify-content:center; display:flex; margin:7px;text-align: center;">
        <img src="${product.image}" class="card-img-top" alt="Image not available">
    </div>
        
         <div class="card-body" style="text-align:justify;">
            <h4 style="color:gray">${product.category}</h4>
            <h3 class="card-title" style=" text-overflow:ellipsis;style="text-align:justify;>${product.title}</h3>
            <br>
            <p>${product.rating.rate}<ion-icon name="star"></ion-icon></p>

            <div style="text-align:justify;>
            <p class="card-text" style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${product.description}</p>
            </div>

            <br>
            <p><strong style="font-size:28px;">$${product.price}</strong></p>
            <button type="button" class="btn btn-dark add-to-cart" data-id="${product.id}">Add to Cart</button>
            <a href="cart.html" class="btn btn-dark">Go to Cart</a>
        </div>
        `;
  document.querySelector(".detail").innerHTML = detailHTML;

  document.querySelector(".add-to-cart").addEventListener("click", (e) => {
    let id = e.target.dataset.id;
    let product = data1.find((ele) => ele.id == id);
    addProductToLocalStorage(product);
  });
}


let allbtn = document.getElementById("all");
allbtn.addEventListener("click", () => {
  createcards(data1);
});


let men = document.getElementById("men");
men.addEventListener("click", () => {
  let menProducts = data1.filter((ele) => ele.category == "men's clothing");
  createcards(menProducts);
});


let women = document.getElementById("women");
women.addEventListener("click", () => {
  let womenProducts = data1.filter((ele) => ele.category == "women's clothing");
  createcards(womenProducts);
});


let jewelery = document.getElementById("jewelery");
jewelery.addEventListener("click", () => {
  let jewelryProducts = data1.filter((ele) => ele.category == "jewelery");
  createcards(jewelryProducts);
});

let Electronics = document.getElementById("Electronics");
Electronics.addEventListener("click", () => {
    let electronicProducts = data1.filter((ele) => ele.category == "electronics");
    createcards(electronicProducts);
});