

document.addEventListener("DOMContentLoaded", function () {
 

  let data1 = [];

  async function fetchData() {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    console.log(data);
    
  localStorage.setItem("cart",JSON.stringify(data))
 
   
    data.map((ele) => {
      data1.push(ele);
    });
  }
  fetchData();
 
  
  const cartItems = document.querySelectorAll(".list-group-item");
  const totalAmountElement = document.querySelector(".float-end.fw-bold"); 
  const cartCountElement = document.querySelector("cart.html"); 

  function updateTotal() {
    let total = 0;
    let totalItems = 0;

    cartItems.forEach((item) => {
      const price = parseFloat(
        item.querySelector("div").innerText.split("× $")[1]
      ); 
      const quantity = parseInt(item.querySelector(".mx-2").innerText);
      total += price * quantity;
      totalItems += quantity;
    })

    totalAmountElement.innerText = `$${total.toFixed(2)}`; 
    cartCountElement.innerHTML = `&#128722; Cart (${totalItems})`; 
  }

  cartItems.forEach((item) => {
    const minusBtn = item.querySelector(".btn-outline-secondary:first-of-type");
    const plusBtn = item.querySelector(".btn-outline-secondary:last-of-type");
    const quantitySpan = item.querySelector(".mx-2");

    minusBtn.addEventListener("click", function () {
      let quantity = parseInt(quantitySpan.innerText);
      if (quantity > 1) {
        quantitySpan.innerText = quantity - 1;
      } else {
        item.remove(); 
      }
      updateTotal();
    });

    plusBtn.addEventListener("click", function () {
      let quantity = parseInt(quantitySpan.innerText);
      quantitySpan.innerText = quantity + 1;
      updateTotal();
    })
  })

  updateTotal(); 
})
