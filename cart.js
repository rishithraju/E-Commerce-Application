document.addEventListener("DOMContentLoaded", function () {
  let count = 0;

  function loadCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.forEach((ele) => {
      addToCart(ele);
      count++;
    });
  }

  function addToCart(item) {
    const cartItemsList = document.getElementById("cart-items-list");
    const cartItem = document.createElement("li");
    cartItem.classList.add("list-group-item", "d-flex", "align-items-center");

    cartItem.innerHTML = `
      <img src="${item.image}" class="me-3" alt="Product Image" width="50" height="50">

      <div class="me-auto">
        <strong>${item.title}</strong><br>
        <span class="price">${item.price}</span> × <span class="quantity">${item.quantity}</span>
      </div>

      <button class="btn btn-outline-secondary btn-sm minus-btn">-</button>
      <span class="mx-2 quantity">${item.quantity}</span> 
      <button class="btn btn-outline-secondary btn-sm plus-btn">+</button>
    `;

    cartItemsList.appendChild(cartItem);
    attachEventListeners(cartItem);
    updateTotal();
  }

  function attachEventListeners(item) {
    const minusBtn = item.querySelector(".minus-btn");
    const plusBtn = item.querySelector(".plus-btn");
    const quantitySpan = item.querySelector(".quantity");

    minusBtn.addEventListener("click", function () {
      let quantity = parseInt(quantitySpan.innerText);
      if (quantity > 1) {
        quantitySpan.innerText = quantity - 1;
      } else {
        item.remove();
      }
      updateCartInLocalStorage();
      updateTotal();
    });

    plusBtn.addEventListener("click", function () {
      let quantity = parseInt(quantitySpan.innerText);
      quantitySpan.innerText = quantity + 1;
      updateCartInLocalStorage();
      updateTotal();
    });
  }

  function updateTotal() {
    let total = 0;
    let totalItems = 0;
    const cartItems = document.querySelectorAll(".list-group-item");
    const totalAmountElement = document.querySelector(".total-amount");
    const cartCountElement = document.querySelector(".cart-count");

    cartItems.forEach((item) => {
      const price = parseFloat(item.querySelector(".price").innerText);
      const quantity = parseInt(item.querySelector(".quantity").innerText);
      total += price * quantity;
      totalItems += quantity;
    });

    const shippingCost = 30;
    const totalAmountWithShipping = total + shippingCost;

    totalAmountElement.innerText = `$${totalAmountWithShipping.toFixed(2)}`;
    cartCountElement.innerHTML = `&#128722; Cart (${totalItems})`;

    document.querySelector(".products-total").innerText = `$${total.toFixed(2)}`;
    document.querySelector(".shipping-cost").innerText = `$${shippingCost.toFixed(2)}`;
    document.querySelector(".cart-count").innerText = totalItems;
  }

  function updateCartInLocalStorage() {
    const cartItemsList = document.getElementById("cart-items-list").children;
    let updatedCart = [];

    for (let item of cartItemsList) {
      const title = item.querySelector("strong").innerText;
      const price = parseFloat(item.querySelector(".price").innerText);
      const quantity = parseInt(item.querySelector(".quantity").innerText);
      const image = item.querySelector("img").src;

      updatedCart.push({ title, price, quantity, image });
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
  }

  loadCart();
});
