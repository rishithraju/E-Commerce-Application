let row = document.querySelector(".row");
console.log(row);

let data1 = [];

async function fetchData() {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    console.log(data);
    let id = localStorage.getItem("id");

    if (id == null) {
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
    source.forEach((currObj) => {
        let x = ` 
        <div style="border:1px solid grey; width:350px; height: 520px;text-align: center;">
            <img style="width: 300px; height: 300px;" src="${currObj.image}" alt="img1">
            <h4 style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">${currObj.title}</h4>
            <p style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">${currObj.description}</p><hr>
            <p style="text-align: center;">${currObj.price}</p><hr>
            <button style="background-color: black;color: whitesmoke ;padding: 10px; border-radius: 3px;text-align: center;" class="details" data-id="${currObj.id}">Details</button>
            <button style="background-color: black;color: whitesmoke;padding: 10px; border-radius: 3px;text-align: center;">Add to Cart</button>
        </div>
        `;
        image += x;
    });
    row.innerHTML = image;

    let detailsBtn = document.querySelectorAll(".details");

    detailsBtn.forEach((deBtn) => {
        deBtn.addEventListener("click", (e) => {
            let id = e.target.dataset.id;
            localStorage.setItem("id", id);
            window.location.href = "./product.html";
        });
    });
}

function displayDetails(data, id) {
    let product = data.find(ele => ele.id == id);
    let detailHTML = `
        <div class="card col-4" style= "justify-content:center; display:flex; margin:7px;text-align: center;">
        <img src="${product.image}" class="card-img-top" alt="Image not available">
         </div>

         <div class="card-body" display:flex;>
            <h5 class="card-title" style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${product.title}</h5>
            
            <p class="card-text" style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${product.description}</p><hr>
            <p>${product.price}</p>
        </div`;

    document.querySelector(".detail").innerHTML = detailHTML;
}

// For all button
let allbtn = document.getElementById("all");
allbtn.addEventListener("click", () => {
    createcards(data1);
});

// For men's button
let men = document.getElementById("men");
men.addEventListener("click", () => {
    let menProducts = data1.filter((ele) => ele.category == "men's clothing");
    createcards(menProducts);
});

// For women's button
let women = document.getElementById("women");
women.addEventListener("click", () => {
    let womenProducts = data1.filter((ele) => ele.category == "women's clothing");
    createcards(womenProducts);
});

// For jewelry button
let jewelery = document.getElementById("jewelery");
jewelery.addEventListener("click", () => {
    let jewelryProducts = data1.filter((ele) => ele.category == "jewelery");
    createcards(jewelryProducts);
});

// For electronics button
let Electronics = document.getElementById("Electronics");
Electronics.addEventListener("click", () => {
    let electronicProducts = data1.filter((ele) => ele.category == "electronics");
    createcards(electronicProducts);
});
