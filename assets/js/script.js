let getAnchorTag = document.querySelectorAll(".aTag");
let closeCart = document.querySelector("#cart-close");
let cartLogo = document.querySelector("#cart-logo");
let cart = document.querySelector(".cart");

document.addEventListener("DOMContentLoaded", loadFood);
function loadFood() {
  loadContent();
}

//cart adding and removing function
cartLogo.addEventListener("click", () => {
  cart.classList.add("cart-active");
});
closeCart.addEventListener("click", () => {
  cart.classList.remove("cart-active");
});

function loadContent() {
  let btnRemove = document.querySelectorAll("#cart-remove");
  btnRemove.forEach((btn) => {
    btn.addEventListener("click", removeItem);
  });
}

//container navbar clicked function
let foodbox = document.querySelectorAll(".food-box");
getAnchorTag.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    setActiveBtn(e);
    let foodFilter = e.target.dataset.filter;
    foodbox.forEach((box) => {
      if (foodFilter == "home") {
        box.style.display = "block";
      } else {
        const boxFilter = box.dataset.item;
        if (foodFilter == boxFilter) {
          box.style.display = "block";
        } else {
          box.style.display = "none";
        }
      }
    });
  });
});

function setActiveBtn(e) {
  getAnchorTag.forEach((button) => {
    button.classList.remove("a-clicked");
  });
  e.target.classList.add("a-clicked");
}

// search data from food cart
let input = document.querySelector(".input-search");
let inputSearch = document.querySelector("#input-search-icon");

input.addEventListener("change", (e) => {
  inputSearch.addEventListener("click", () => {
    let searchedText = e.target.value.toLowerCase().trim();
    foodbox.forEach((food) => {
      let data = food.dataset.item;
      if (data.includes(searchedText)) {
        food.style.display = "block";
      } else {
        food.style.display = "none";
        let noItem = document.querySelector('.no-item');
        noItem.classList.add('no-item-active');
      
        // alert('Sorry... You can only search(veg, non, dosa, desert).. Click Other Items ')
      }
      input.value = " ";
    });
    getAnchorTag.forEach((btn) => {
      btn.classList.remove("a-clicked");
    });
    getAnchorTag[0].classList.add("a-clicked");
  });
});

//add food cart in cart
let itemList = [];

function finalResult() {
  let foodadding = document.querySelectorAll("#food-cart-add");
  foodadding.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let food = e.target.parentElement.parentElement;

      let title = food.querySelector(".food-title").innerText;
      let price = food.querySelector(".food-price").innerText;
      let imgSrc = food.querySelector(".food-img").src;
      let newProduct = { title, price, imgSrc };
      if (itemList.find((ele) => ele.title == newProduct.title)) {
        return;
      } else {
        itemList.push(newProduct);
      }
      let newProductElement = createNewElement(title, price, imgSrc);

      let element = document.createElement("div");
      element.innerHTML = newProductElement;
      let cartBasket = document.querySelector(".cart-container");
      cartBasket.append(element);

      //changing qty in cart
      let changeQty = document.querySelectorAll(".cart-qty");
      changeQty.forEach((qty) => {
        qty.addEventListener("change", changeQuantity);
      });
      function changeQuantity() {
        if (isNaN(this.value) || this.value < 1) {
          this.value = 1;
        }
        let cartBox = document.querySelectorAll(".cart-box");
        let totalValue = document.querySelector(".total-price");
        let total = 0;
        cartBox.forEach((product) => {
          let priceElement = product.querySelector(".cart-price");
          let price = parseFloat(priceElement.innerText.replace("₹", ""));
          let changeQty = product.querySelector(".cart-qty").value;
          total += price * changeQty;
          product.querySelector(".cart-amt").innerText = `₹ ${
            price * changeQty
          }`;

          // Removing cart-box using trash icon from cart
          const cartRemove = document.querySelectorAll("#cart-remove");
          cartRemove.forEach((button) => {
            button.addEventListener("click", () => {
              cartParentEle = button.parentElement;
              cartParentEle.remove();
              changeQuantity();
            });
          });
        });
        totalValue.innerText = `₹ ${total}`;
      }
      changeQuantity();
    });
  });
}
finalResult();

// adding new cart from food box to cart box
function createNewElement(title, price, imgSrc) {
  return `
  <div class="cart-box">
  <img src="${imgSrc}" alt="dosa image" class="cart-img">
  <div class="cart-content">
    <div class="cart-item-title">${title}</div>
    <div class="cart-pricing">
      <div class="cart-price">${price}</div>
      <div class="cart-amt">${price}</div>
    </div>
    <input type="number" value="1" class="cart-qty">
  </div>
  <i class="fa-solid fa-trash" id="cart-remove"></i>
</div>`;
}


const orderBtn = document.querySelector('.total-btn');
const message = document.querySelector('.mes')
orderBtn.addEventListener('click', () => {
  message.classList.add('mes-active');
  const cartBoxClear = document.querySelectorAll('.cart-box');
  cartBoxClear.forEach((ele) => {
    ele.remove();
    const tp = document.querySelector('.total-price');
    tp.innerText = "₹ 0.00"
  })
})

closeCart.addEventListener('click', () => {
  message.classList.remove('mes-active');
})

// form

let formInput = document.querySelector('.form-input');
let formBtn = document.querySelector('#form-btn');

formBtn.addEventListener('click', () => {
  formInput.value = '';
})