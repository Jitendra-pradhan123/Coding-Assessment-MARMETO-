
document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.getElementById("cart-items");
  const subtotalElement = document.getElementById("subtotal");
  const totalElement = document.getElementById("total");


  const apiData = [
    { name: "Asgaard sofa", price: 250000, quantity: 1, image: "https://s3-alpha-sig.figma.com/img/2ac4/13c1/917ac944454e358f73d0af67e1f1b74e?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=oKpixmgOkzxiT2U-4EnPxaytlZBhSLpRjnjvECL2xxgyrnzPjHa8mhhjFtzGt01pU2mCqRlpS0nozoaIXTsbTIjSv4cjv8ovYqnQS0FZaty1-vsjdU9Je1r7nJTqGgz6lC30BFWFkcILPkdtav829O5lmYDd~OpJvGx69nTJAvLTCqnsfY5fz2c8u5jIDqkLgxLXpn9dTzfjj8FB~bbTgzbiSI3ak6mRiT2x4gI60YkjMQSnvBBdgDMljF9G~Kz3M0Or604DU-3gwTcZ7qivKY6cBVVU216dlFox10iE4ANDOLsWM93oj0VZ~wx6-SzXqbN9rVR5xRvgx4pFWV1KwA__"}
  ];

  let cartData = apiData;

 
  function renderCartItems() {
    cartItemsContainer.innerHTML = "";
    cartData.forEach((item, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>
          <img src="${item.image}" alt="${item.name}" style="width: 110px; height: 80px; object-fit: cover;background-color:#F9F1E7;border-radius:1rem;margin-left:-45px;margin-top:20px;">
                       <div style="margin-left:"-10px";> ${item.name}</div>
        </td>
        <td >Rs. ${item.price.toFixed(2)}</td>
        <td>
          <input type="number" value="${item.quantity}" min="1" data-index="${index}" class="quantity-input">
        </td>
        <td>Rs. ${(item.price * item.quantity).toFixed(2)}</td>
        <td>
          <button class="remove-btn" data-index="${index}">🗑️</button>
        </td>
      `;
      cartItemsContainer.appendChild(row);
    });

    document.querySelectorAll(".quantity-input").forEach(input => {
      input.addEventListener("input", updateQuantity);
    });

    document.querySelectorAll(".remove-btn").forEach(button => {
      button.addEventListener("click", removeItem);
    });

    updateTotals();
  }

  function updateQuantity(event) {
    const index = event.target.dataset.index;
    cartData[index].quantity = parseInt(event.target.value);
    renderCartItems();
  }

  function removeItem(event) {
    const index = event.target.dataset.index;
    cartData.splice(index, 1);
    renderCartItems();
  }

  function updateTotals() {
    const subtotal = cartData.reduce((acc, item) => acc + item.price * item.quantity, 0);
    subtotalElement.textContent = `Rs. ${subtotal.toFixed(2)}`;
    totalElement.textContent = `Rs. ${subtotal.toFixed(2)}`;
  }

  renderCartItems();
});
