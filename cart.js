

document.addEventListener("DOMContentLoaded", function () {
  // Select all quantity buttons

  let data1 = [];

  async function fetchData() {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    console.log(data);
    
  localStorage.setItem("cart",JSON.stringify(data))
 
    // createcards(data);
    data.map((ele) => {
      data1.push(ele);
    });
  }
  fetchData();
 
  
  const cartItems = document.querySelectorAll(".list-group-item");
  const totalAmountElement = document.querySelector(".float-end.fw-bold"); // Total price element
  const cartCountElement = document.querySelector("cart.html"); // Cart count in navbar

  function updateTotal() {
    let total = 0;
    let totalItems = 0;

    cartItems.forEach((item) => {
      const price = parseFloat(
        item.querySelector("div").innerText.split("× $")[1]
      ); // Extract price
      const quantity = parseInt(item.querySelector(".mx-2").innerText); // Extract quantity
      total += price * quantity;
      totalItems += quantity;
    })

    totalAmountElement.innerText = `$${total.toFixed(2)}`; // Update total price
    cartCountElement.innerHTML = `&#128722; Cart (${totalItems})`; // Update cart count
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
        item.remove(); // Remove item if quantity is 0
      }
      updateTotal();
    });

    plusBtn.addEventListener("click", function () {
      let quantity = parseInt(quantitySpan.innerText);
      quantitySpan.innerText = quantity + 1;
      updateTotal();
    })
  })

  updateTotal(); // Initialize the total price on page load
})
