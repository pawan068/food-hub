// sidebar function startsss

let menu = document.getElementById("menu");
let sidebar = document.getElementById("sidebar");
let close = document.getElementById("close");

menu.addEventListener("click", () => {
  sidebar.classList.remove("right-[-400px]");
  sidebar.classList.add("right-[0px]");
});

close.addEventListener("click", () => {
  sidebar.classList.remove("right-[0px]");
  sidebar.classList.add("right-[-400px]");
});
// sidebar function end 

// cart sidebar starts

let cartcontain = document.getElementById("cart_add");
let cart = document.getElementById("cartt");
let closecart = document.getElementById("cart-close");
let cartItems = document.getElementById("cart_items");
let totalSpan = document.getElementById("total");

cart.addEventListener("click", () => {
  cartcontain.classList.remove("right-[-400px]");
  cartcontain.classList.add("right-[0px]");
});

closecart.addEventListener("click", () => {
  cartcontain.classList.remove("right-[0px]");
  cartcontain.classList.add("right-[-400px]");
});
// cart sidebar is end here


// fetching data from data.json

fetch("menu.json")
  .then(res => res.json())
  .then(data => {

    const container = document.getElementById("menuContainer");

    container.innerHTML = data.map(item => `
      <div class="max-w-62.5 h-87.5 font-bold rounded-3xl space-y-2.5 bg-white border
                  flex flex-col items-center justify-center py-3">

        <div class="w-7/10">
          <img src="${item.image}" alt="${item.name}">
        </div>

        <p class="text-2xl text-center">${item.name}</p>
        <p class="text-2xl text-[#2e7d32]">$${item.price}</p>

        <button  
          data-name="${item.name}"
          data-price="${item.price}"
          data-image="${item.image}"
          class="addcart bg-[#2e7d32] hover:bg-[#58ab5c] text-white rounded px-3 py-1.5 text-sm cursor-pointer">
          Add to Cart
        </button>

      </div>
    `).join("");

  });


// adding items in cart
let cartadded= document.getElementById("cartadded")
document.addEventListener("click", function (e) {



  if (e.target.classList.contains("addcart")) {

    e.target.textContent="Added to cart"
    let price = Number(e.target.dataset.price);
    let image = e.target.dataset.image;
    let name = e.target.dataset.name;

    let existingItem = document.querySelector(
      `.cart-item[data-name="${name}"]`
    );

 
    if (existingItem) {
  
      let qtySpan = existingItem.querySelector(".qty");
      let priceSpan = existingItem.querySelector(".price");
      let basePrice = Number(existingItem.getAttribute("data-price"));

      let qty = Number(qtySpan.textContent) + 1;

      qtySpan.textContent = qty;
      priceSpan.textContent = basePrice * qty;

      updateTotal();
      updatecartno()
      return;
    }


    let sidebarbox = document.createElement("div");

    sidebarbox.className =
      "cart-item w-full h-[60px] px-4 flex justify-between items-center rounded-[10px]  bg-white";

    sidebarbox.setAttribute("data-name", name);
    sidebarbox.setAttribute("data-price", price);

    sidebarbox.innerHTML = `
      <img class="h-[45px] aspect-square" src="${image}" alt="">
      
      <div class="flex flex-col">
          <p>${name}</p>
          <p>$<span class="price">${price}</span></p>
      </div>

      <div class="flex justify-center text-center items-center gap-2">
          <button class="minus bg-black flex justify-center items-center text-white w-5 h-5 rounded-full">-</button>
          <span class="qty">1</span>
          <button class="plus bg-black flex justify-center items-center text-center text-white w-5 h-5 rounded-full">+</button>
      </div>
    `;

    cartItems.appendChild(sidebarbox);
    updateTotal();
    updatecartno()
  }


// + button

  if (e.target.classList.contains("plus")) {

    let item = e.target.closest(".cart-item");

    let qtySpan = item.querySelector(".qty");
    let priceSpan = item.querySelector(".price");
    let basePrice = Number(item.getAttribute("data-price"));

    let qty = Number(qtySpan.textContent) + 1;

    qtySpan.textContent = qty;
    priceSpan.textContent = basePrice * qty;

    updateTotal();
    updatecartno()
  }

 
  

// - button

  if (e.target.classList.contains("minus")) {

    let item = e.target.closest(".cart-item");

    let qtySpan = item.querySelector(".qty");
    let priceSpan = item.querySelector(".price");
    let basePrice = Number(item.getAttribute("data-price"));

    let qty = Number(qtySpan.textContent);

    if (qty > 1) {
      qty--;
      qtySpan.textContent = qty;
      priceSpan.textContent = basePrice * qty;
    } else {
      item.remove();
    }

    updateTotal();
    updatecartno();
  }

   function updatecartno(){
    if(cartItems!==""){
        cartadded.classList.add("bg-red-400")
      
  }else if(cartItems===""){
        cartadded.classList.remove("bg-red-400")
     
  }
  }

});


//  total 

function updateTotal() {

  let allPrices = document.querySelectorAll(".cart-item .price");

  let total = 0;

  allPrices.forEach(p => {
    total += Number(p.textContent);
  });

  totalSpan.textContent = total;
}


// this is review sidebar

let slides = document.querySelectorAll(".slide");
let count = 0;


slides.forEach((slide, i) => {
  slide.style.left = `${i * 100}%`;
});

setInterval(() => {

  count++;
  if (count === slides.length) count = 0;

  slides.forEach(slide => {
    slide.style.transform = `translateX(-${count * 100}%)`;
    slide.style.transition = "0.5s";
  });

}, 2000);
console.log(cartItems)