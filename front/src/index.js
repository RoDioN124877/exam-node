import "./style/main.scss";

const cartButton = document.querySelector(".cart-icon");
const cartContainer = document.querySelector(".cart-container");
const maincontent = document.querySelector(".main-content");
const players_k = document.querySelector(".players_k");
const players_s = document.querySelector(".players_s");
const cartItemsContainer = document.querySelector(".cart-items");
const totalPriceElement = document.querySelector(".total-price");
let cartItems = [];

cartButton.addEventListener("click", function () {
  cartContainer.classList.toggle("active");
});

const playersRender = async () => {
  maincontent.innerHTML = " ";

  fetch("http://localhost:8081/d2")
    .then((data) => data.json())
    .then((res) => {
      console.log(res.data);
      res.data.forEach((e) => {
        maincontent.innerHTML += `
        <div class="product-card">
          <img src=${e.img} alt="Product Image">
          <h2>${e.nick_name}</h2>
          <h3>${e.name}</h3>
          <p>${e.pts}pts</p>
          <p>${e.achivment}</p>
          <div class="price">$${e.price}</div>
          <button class="add-to-cart">Добавить в корзину</button>
        </div>
        `;
      });
    });
};
const staffRender = async () => {
  maincontent.innerHTML = " ";
  fetch("http://localhost:8081/stff")
    .then((data) => data.json())
    .then((res) => {
      console.log(res.data);
      res.data.forEach((e) => {
        maincontent.innerHTML += `
        <div class="product-card">
          <img src=${e.img} alt="Product Image">
          <h2>${e.nick_name}</h2>
          <h3>${e.name}</h3>
          <p>${e.position}</p>
          <div class="price">$${e.price}</div>
          <button class="add-to-cart">Добавить в корзину</button>
        </div>
        `;
      });
    });
};

players_k.addEventListener("click", () => {
  playersRender();
});
players_s.addEventListener("click", () => {
  staffRender();
});

const updateCart = () => {
  cartItemsContainer.innerHTML = "";
  let totalPrice = 0;

  cartItems.forEach((item, index) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    const img = document.createElement("img");
    img.src = item.img;
    img.alt = "Product Image";
    cartItem.appendChild(img);

    const itemInfo = document.createElement("div");
    itemInfo.classList.add("item-info");

    const itemName = document.createElement("span");
    itemName.textContent = item.name;
    itemInfo.appendChild(itemName);

    const itemPrice = document.createElement("span");
    itemPrice.textContent = `$${item.price}`;
    itemInfo.appendChild(itemPrice);

    const removeButton = document.createElement("button");
    removeButton.textContent = "Удалить";
    removeButton.classList.add("remove-item");
    removeButton.addEventListener("click", () => removeCartItem(index));
    itemInfo.appendChild(removeButton);

    cartItem.appendChild(itemInfo);

    cartItemsContainer.appendChild(cartItem);

    totalPrice += item.price
  });

  totalPriceElement.textContent = `$${numMask(totalPrice)}`;
};

const addToCart = (item) => {
  cartItems.push(item);
  updateCart();
};

const removeCartItem = (index) => {
  cartItems.splice(index, 1);
  updateCart();
};

maincontent.addEventListener("click", (event) => {
  const target = event.target;

  if (target.classList.contains("add-to-cart")) {
    const productCard = target.closest(".product-card");

    const item = {
      name: productCard.querySelector("h2").textContent,
      price: parseFloat(
        productCard.querySelector(".price").textContent.slice(1)
      ),
      img: productCard.querySelector("img").src,
    };

    addToCart(item);
  }

  if (target.classList.contains("remove-item")) {
    const cartItem = target.closest(".cart-item");
    const index = Array.from(cartItem.parentNode.children).indexOf(cartItem);

    removeCartItem(index);
  }
});
function numMask(num) {
  let num_str = num.toString();
  let ln = num_str.length;

  if (ln <= 3) {
    return num_str;
  }
  let resNum = "";
  for (let i = ln - 1; i >= 0; i--) {
    resNum = num_str.charAt(i) + resNum;
    if ((ln - i) % 3 === 0 && i !== 0) {
      resNum = " " + resNum;
    }
  }
  return resNum;
}
playersRender();
