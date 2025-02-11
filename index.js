let rowcard = document.querySelector(".row");
console.log(rowcard);

let data1 = [];

async function fetchData() {
  const response = await fetch("https://fakestoreapi.com/products");
  const data = await response.json();
  console.log(data);
  createcards(data);
  data.map((ele) => {
    data1.push(ele);
  });
}
fetchData();

function createcards(source) {
  var image = "";
  source.forEach((currObj) => {
    let x = `
       "<div class="card  col-4" style="width: 18rem; justify-content:center ;display:flex; margin:7px;text-align: center;">
      <img src="${currObj.image}" class="card-img-top" alt="iamges is not getting">
      <div class="card-body">
        <h5 class="card-title" style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${currObj.title}</h5>
        <p class="card-text" style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${currObj.description}</p><hr>
        <p>${currObj.price} </p>
      </div><hr>
      <div class="card-body">
       <button type="button" class="btn btn-dark details "data-id="${currObj.id}">Details</button>
       <button type="button" class="btn btn-dark">Add to Cart</button>
      </div>
    </div>`;
    image += x;
  });
  rowcard.innerHTML = image;

  let detailsBtn = document.querySelectorAll(".details");

  detailsBtn.forEach((deBtn) => {
    deBtn.addEventListener("click", (e) => {
      let id = e.target.dataset.id;
      localStorage.setItem("id", id);
      window.location.href = "./product.html";
    });
  });
}

// for all button
let allbtn = document.getElementById("all");

allbtn.addEventListener("click", () => {
  createcards(data1);
});

// for mens button
let men = document.getElementById("men");

men.addEventListener("click", () => {
  let men = data1.filter((ele) => ele.category == "men's clothing");
  createcards(men);
});

// for womens button
let women = document.getElementById("women");

women.addEventListener("click", () => {
  let women = data1.filter((ele) => ele.category == "women's clothing");
  createcards(women);
});

// for jewelery button
let jewelery = document.getElementById("jewelery");

jewelery.addEventListener("click", () => {
  let jewelery = data1.filter((ele) => ele.category == "jewelery");
  createcards(jewelery);
});

// for electronic button
let Electronics = document.getElementById("Electronics");

Electronics.addEventListener("click", () => {
  let Electronics = data1.filter((ele) => ele.category == "electronics");
  createcards(Electronics);
});