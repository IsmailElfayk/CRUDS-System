let titleInput = document.querySelector(".form .name");
let priceInput = document.querySelector(".form .price");
let taxesInput = document.querySelector(".form .taxes");
let adsInput = document.querySelector(".form .ads");
let discountInput = document.querySelector(".form .discount");
let quantityInput = document.querySelector(".form .quantity");
let pricingInputs = document.querySelectorAll(".form .pricing input");
let categoryInput = document.querySelector(".form .category");
let descriptionInput = document.querySelector(".form textarea");
let createBtn = document.querySelector(".form .create-btn");
let productCard = document.querySelector(".container .product-card");
let before = document.querySelector(".container .before");
let after = document.querySelector(".container .after");
let temp;

//++++++++++++++++reset form
function resetForm() {
  titleInput.value = "";
  pricingInputs.forEach((e) => {
    e.value = "";
  });
  quantityInput.value = "";
  descriptionInput.value = "";
  categoryInput.value = "";
  document.querySelector(".form .pricing .unit-price span").textContent = "";
  document.querySelector(".form .total-pricing .total-price span").textContent =
    "";
}
/* =================================================
**************pricing calculation*******************
====================================================*/
pricingInputs.forEach((ele) => {
  ele.addEventListener("input", () => {
    let x =
      (+priceInput.value > 0 ? +priceInput.value : 0) +
      (+taxesInput.value > 0 ? +taxesInput.value : 0) +
      (+adsInput.value > 0 ? +adsInput.value : 0) -
      (+discountInput.value > 0 ? +discountInput.value : 0);
    document.querySelector(".form .pricing .unit-price span").textContent = x;
    //++++++++++++
    document.querySelector(
      ".form .total-pricing .total-price span"
    ).textContent =
      document.querySelector(".form .pricing .unit-price span").textContent *
      (quantityInput.value > 0 ? quantityInput.value : 1);
  });
});
quantityInput.addEventListener("input", () => {
  document.querySelector(".form .total-pricing .total-price span").textContent =
    document.querySelector(".form .pricing .unit-price span").textContent *
    (quantityInput.value > 0 ? quantityInput.value : 1);
});
/* =================================================
***************CREATE ACTION************************
====================================================*/
if (localStorage.data === undefined) {
  localStorage.setItem("data", JSON.stringify([]));
}
createBtn.addEventListener("click", () => {
  if (
    titleInput.value != "" &&
    priceInput.value != "" &&
    categoryInput.value != ""
  ) {
    let data = JSON.parse(localStorage.data);
    let objPro = {
      title: titleInput.value,
      price: priceInput.value,
      taxes: taxesInput.value,
      ads: adsInput.value,
      discount: discountInput.value,
      "unit-price": document.querySelector(".form .pricing .unit-price span")
        .textContent,
      quantity: quantityInput.value,
      "total-price": document.querySelector(
        ".form .total-pricing .total-price span"
      ).textContent,
      category: categoryInput.value,
      description: descriptionInput.value,
    };
    if (createBtn.textContent === "Create") {
      data.push(objPro);
    } else {
      data[temp] = objPro;
      createBtn.textContent = "Create";
      document.querySelector(".cancel-btn").style.display = "none";
    }
    localStorage.data = JSON.stringify(data);
    resetForm();
    setData();
  }
});
// ==========================================
// ============set data list ================
// ==========================================
function setData() {
  document.querySelector(".product-list table tbody").textContent = "";
  let data = JSON.parse(localStorage.data);
  for (let i = 0; i < data.length; i++) {
    let tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${i + 1}</td>
      <td>${data[i].title}</td>
      <td>${data[i].price}</td>
      <td>${data[i].category}</td>
      <td><div id='${i}' class = "more">Show More</div></td>`;
    document.querySelector(".product-list table tbody").append(tr);
  }
  setCategories();
  deleteAll();
}
setData();
// ++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++Show more+++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++
document.addEventListener("click", (e) => {
  if (e.target.className == "more") {
    temp = e.target.getAttribute("id");
    let prod = JSON.parse(localStorage.data)[e.target.getAttribute("id")];
    document.querySelector(".card-title").textContent = ": " + prod.title;
    document.querySelector(".card-price").textContent = ": " + prod.price;
    document.querySelector(".card-taxes").textContent = ": " + prod.taxes;
    document.querySelector(".card-ads").textContent = ": " + prod.ads;
    document.querySelector(".card-discount").textContent = ": " + prod.discount;
    document.querySelector(".card-unit-price").textContent =
      ": " + prod["unit-price"];
    document.querySelector(".card-quantity").textContent = ": " + prod.quantity;
    document.querySelector(".card-total-price").textContent =
      ": " + prod["total-price"];
    document.querySelector(".card-category").textContent = ": " + prod.category;
    document.querySelector(".card-description").textContent =
      ": " + prod.description;
    productCard.style = `display: block`;
    before.style = `display: block`;
  }
});
// ++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++return button++++++++++++
// ++++++++++++++++++++++++++++++++++++++++
document.querySelector(".back").addEventListener("click", () => {
  productCard.style = `display: none`;
  before.style = `display: none`;
});
//+++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++delete button++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++
document.querySelector(".fa-trash").addEventListener("click", () => {
  let data = JSON.parse(localStorage.data);
  after.style.display = "grid";
  document.querySelector(".after2").style.display = "block";
  document.querySelector(".after > input").value = 1;
  document.querySelector(".after #all").addEventListener("input", () => {
    if (document.querySelector(".after #all").checked === true) {
      document.querySelector(".after > input").value = data[temp].quantity;
    } else {
      document.querySelector(".after > input").value = 1;
    }
  });
});
document.querySelector(".after2").addEventListener("click", () => {
  after.style.display = "none";
  document.querySelector(".after2").style.display = "none";
  document.querySelector(".after #all").checked = false;
});
document.querySelector(".after .dlt").addEventListener("click", () => {
  document.querySelector(".after #all").checked = false;
  let data = JSON.parse(localStorage.data);
  data[temp].quantity =
    data[temp].quantity - document.querySelector(".after > input").value;
  data[temp]["total-price"] = data[temp]["unit-price"] * data[temp].quantity;
  localStorage.data = JSON.stringify(data);
  //++++++++++++++
  after.style.display = "none";
  document.querySelector(".after2").style.display = "none";
  //+++++++++++++++++++++++
  document.querySelector(".card-quantity").textContent =
    ": " + data[temp].quantity;
  document.querySelector(".card-total-price").textContent =
    ": " + data[temp]["total-price"];
  //++++++++++++++
  if (data[temp].quantity <= 0) {
    productCard.style = `display: none`;
    before.style = `display: none`;
    let newData = [];
    for (let i = 0; i < data.length; i++) {
      if (i == temp) {
        continue;
      } else {
        newData.push(data[i]);
      }
    }
    localStorage.data = JSON.stringify(newData);
    setData();
  }
});
//+++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++edit button++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++
document.querySelector(".edit").addEventListener("click", () => {
  let data = JSON.parse(localStorage.data);
  //++++++++++++++++
  scroll({
    top: 0,
    behavior: "smooth",
  });
  //++++++++++++++++
  productCard.style = `display: none`;
  before.style = `display: none`;
  //+++++++++++++++++
  titleInput.value = data[temp].title;
  priceInput.value = data[temp].price;
  taxesInput.value = data[temp].taxes;
  adsInput.value = data[temp].ads;
  discountInput.value = data[temp].discount;
  document.querySelector(".form .pricing .unit-price span").textContent =
    data[temp]["unit-price"];
  quantityInput.value = data[temp].quantity;
  document.querySelector(".form .total-pricing .total-price span").textContent =
    data[temp]["total-price"];
  categoryInput.value = data[temp].category;
  descriptionInput.value = data[temp].description;
  //++++++++++++++++++++
  createBtn.textContent = "Update";
  document.querySelector(".cancel-btn").style.display = "block";
});
//+++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++cancel button++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++
document.querySelector(".cancel-btn").addEventListener("click", () => {
  resetForm();
  createBtn.textContent = "Create";
  document.querySelector(".cancel-btn").style.display = "none";
});
//#################################################
//############ search bar #########################
//#################################################
let searchInput = document.querySelector(".search-section > input");
searchInput.addEventListener("input", () => {
  document.querySelector("#category").value = "NO-FILTER";
  let data = JSON.parse(localStorage.data);
  if (searchInput.value != "") {
    //+++++++++
    document.querySelector(".product-list table tbody").textContent = "";
    //+++++++++
    for (let i = 0; i < data.length; i++) {
      let proTitle = data[i].title.toUpperCase();
      let searchedValue = searchInput.value.toUpperCase();
      // console.log(proTitle, searchedValue);
      if (proTitle.includes(searchedValue)) {
        let tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${i + 1}</td>
          <td>${data[i].title}</td>
          <td>${data[i].price}</td>
          <td>${data[i].category}</td>
          <td><div id='${i}' class = "more">Show More</div></td>`;
        document.querySelector(".product-list table tbody").append(tr);
      }
    }
  } else {
    setData();
  }
});
//#############################
//####category btn#############
//#############################
function setCategories() {
  let data = JSON.parse(localStorage.data);
  document.querySelector("#category").textContent = "";
  document.querySelector(
    "#category"
  ).innerHTML = `<option value="NO-FILTER">FILTER :</option>`;
  let cat = [];
  for (let i = 0; i < data.length; i++) {
    if (!cat.includes(data[i].category.toUpperCase())) {
      document.querySelector("#category").innerHTML += ` <option value="${data[
        i
      ].category.toUpperCase()}">${data[i].category.toUpperCase()}</option>`;
    }
  }
}
document.querySelector("#category").addEventListener("change", () => {
  searchInput.value = "";
  let data = JSON.parse(localStorage.data);
  if (document.querySelector("#category").value != "NO-FILTER") {
    //+++++++++
    document.querySelector(".product-list table tbody").textContent = "";
    //+++++++++
    for (let i = 0; i < data.length; i++) {
      let proCat = data[i].category.toUpperCase();
      let searchedValue = document
        .querySelector("#category")
        .value.toUpperCase();
      // console.log(proTitle, searchedValue);
      if (proCat.includes(searchedValue)) {
        let tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${i + 1}</td>
          <td>${data[i].title}</td>
          <td>${data[i].price}</td>
          <td>${data[i].category}</td>
          <td><div id='${i}' class = "more">Show More</div></td>`;
        document.querySelector(".product-list table tbody").append(tr);
      }
    }
  } else {
    setData();
  }
});
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++delete all++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++
function deleteAll() {
  let data = JSON.parse(localStorage.data);
  if (data.length > 0) {
    document.querySelector(".delete-all").style.display = "block";
    document.querySelector(".delete-all span").textContent = data.length;
  } else {
    document.querySelector(".delete-all").style.display = "none";
  }
}
document.querySelector(".delete-all").addEventListener("click", () => {
  localStorage.data = JSON.stringify([]);
  setData();
});
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++scroll up++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++
document.querySelector("#scroll-up").addEventListener("click", () => {
  scroll({
    top: 0,
    behavior: "smooth",
  });
});
window.addEventListener("scroll", () => {
  if (window.scrollY >= 910) {
    document.querySelector("#scroll-up").style.display = `flex`;
  } else {
    document.querySelector("#scroll-up").style.display = `none`;
  }
});
//++++++++++++++++++++++++++++++++
//=========color==================
//++++++++++++++++++++++++++++++++
if (localStorage.color == undefined) {
  localStorage.setItem("color", "#000");
}
let colorInput = document.querySelector("#color");
colorInput.addEventListener("input", () => {
  localStorage.setItem("color", colorInput.value);
  setColor();
});
function setColor() {
  document.body.style.setProperty("--btn-color", localStorage.color);
}
setColor();
