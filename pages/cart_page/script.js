let CART = [];
//load local cart items into cart array
let getSessionStorage = JSON.parse(sessionStorage.getItem("cartItems"));
CART = getSessionStorage;

//Get HTML elements
let section = document.querySelector(".cart-container");
let tableBody = document.querySelector(".table-body");

console.log(CART);

//Creates a table for all the items in CART
for (let i = 0; i < CART.length; i++) {
   let tr = document.createElement("tr");
   tr.scope = "row";
   tr.innerHTML = `<td>${i}</td>
                  <td>${CART[i].name}</td>
                  <td>${CART[i].size}</td>
                  <td>${CART[i].color}</td>
                  <td>${CART[i].quantity}</td>
                  <td value="${CART[i].price}">R${CART[i].price}</td>
                  <td><a class="myBtn myBtn3" onclick="deleteItem()">delete</a>`
   tableBody.appendChild(tr);

   function deleteItem() {

      //delete Cart item

      //find the index of deleted item
      const index = CART.indexOf(CART[i]);
      if (index > -1) {
         CART.splice(index, 1); // 2nd parameter means remove one item only
         sessionStorage.removeItem("cartItems") //remove key
         let newCart = CART; // store spliced array into new variable
         CART = newCart; //transfer newCart back to CART
         console.log(CART);
         reloadPage() //reload/update page
         sessionStorage.setItem("cartItems", JSON.stringify(CART)) //save updated CART in storage
      };

      console.log("index is = " + index);

   }
};

let cartTotal = document.querySelector(".cartTotal");

//Cart Total + VAT
let totalPrice = CART.reduce(function (total, item) {
   return total + parseInt(item.price);

}, 0);
console.log(totalPrice);
console.log("Total No VAT: " + totalPrice);

//Vat = 15%
const VAT = 1.15;
let vatInc;
vatInc = totalPrice * VAT.toFixed(0);
//VAT calculation
//totalPrice x 15%(0.15) = 7.6512 + totalPrice = new total
// or totalPrice * 1.15 = new total.
console.log("VAT: " + totalPrice * 0.15);
console.log("With VAT: " + vatInc);
cartTotal.innerHTML = `<p>VAT inc: 15%</p>
                        <p>Total: <b class="totalRand1">R</b>  <b class="totalRand">${vatInc.toFixed(2)}</b></p>`;
section.appendChild(cartTotal);

//Using js to reposition my html elements below yhe table body.

//add coupon button
let totalWithoutDis = document.querySelector(".totalRand")
console.log("total RRR :" + totalWithoutDis.innerHTML)
let coupon_btn = document.querySelector(".myBtn1");
let arrowD = "▼";
let arrowU = "◀";
coupon_btn.textContent = "Enter Coupon Code " + arrowD;

//Show hide coupon
coupon_btn.addEventListener('click', function () {
   if (coupon_btn.textContent == "Enter Coupon Code " + arrowD) {
      coupon_btn.textContent = "Enter Coupon Code " + arrowU;
   } else {
      coupon_btn.textContent == "Enter Coupon Code " + arrowD
   }
   $(".input-group").toggleClass("show");

});
section.appendChild(coupon_btn);

//coupon input
let coupon = document.querySelector(".input-group");
section.appendChild(coupon)
let codeInput = document.querySelector(".form-control");
let submitCode = document.querySelector(".input-group-text");
toggleCouponBtn() // To prevent coupon code being applied multiple times

console.log()

function toggleCouponBtn() { //When coupon code was applies it will creat its own key
   if (sessionStorage.getItem("totalWithDiscount")) {
      submitCode.disabled = true
   } else {
      submitCode.disabled = false;
   }
}

//Coupon Event
let save = 500; //coupon discount value
let couponCode = 12345;
submitCode.addEventListener('click', function () {
   if (codeInput.value == couponCode) { //apply coupon if input code matches
      totalWithoutDis.innerHTML = vatInc -= save;
      //Store new total to session/localStorage
      sessionStorage.setItem("totalWithDiscount", JSON.stringify(vatInc)); //update sessionStorage total
      sessionStorage.removeItem("totalIncVat") // if coupon matches, remove "totalIncVat(Default key)" key from storage
      //Only proceed with one key//
      alert("Discount applied. You saved R500")
      submitCode.disabled = true; //disable coupon button if correct code was entered

   } else {
      alert("invalid coupon code😔")
   }

});
console.log(submitCode.disabled)

//checkout btn
let checkout = document.querySelector(".checkout");

checkout.addEventListener('click', function () {
   if (submitCode.disabled == false) { //if no coupon code was enters. Store totals to storage
      sessionStorage.setItem("totalIncVat", JSON.stringify(vatInc));
      checkout.href = "../checkout_page/index.html"
   } else {
      checkout.href = "../checkout_page/index.html"
   }
})
section.appendChild(checkout);

//Reloads the page to update the layout from track[] or localSrg.
function reloadPage() {
   location.reload();
};