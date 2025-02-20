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
    let x = ` <div style="border:1px solid grey; width:275px; height:480px; text-align:center;">
    <img style="width:250px; height:275px;" src="${currObj.image}" alt="img1">
    <h4 style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
    ${currObj.title}
        Mens Casual Premium Slim Fit T-Shirts
    </h4>
    <p style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
    ${currObj.description}
        Slim-fitting style,contrast raglan long sleeve, three-button
    </p><hr>
    <p style="text-align:center;">${currObj.price}</p><hr>

    <button class="btn btn-dark details" style="background-color:black; color:whitesmoke; padding:8px; border-radius:4px; text-align:center;">Details</button>
    <button class="btn btn-dark details" style="background-color:black; color:whitesmoke; padding:8px; border-radius:4px; text-align:center;">Add to Cart</button>
    
 </div>

    `;

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


let allbtn = document.getElementById("all");
allbtn.addEventListener("click", () => {
  createcards(data1);
});


let men = document.getElementById("men");
men.addEventListener("click", () => {
  let men = data1.filter((ele) => ele.category == "men's clothing");
  createcards(men);
});


let women = document.getElementById("women");
women.addEventListener("click", () => {
  let women = data1.filter((ele) => ele.category == "women's clothing");
  createcards(women);
});


let jewelery = document.getElementById("jewelery");
jewelery.addEventListener("click", () => {
  let jewelery = data1.filter((ele) => ele.category == "jewelery");
  createcards(jewelery);
});


let Electronics = document.getElementById("Electronics");
Electronics.addEventListener("click", () => {
  let Electronics = data1.filter((ele) => ele.category == "electronics");
  createcards(Electronics);
});
