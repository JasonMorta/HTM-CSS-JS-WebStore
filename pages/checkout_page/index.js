let totalWithDiscount;
let totalIncVat;

//load sessionStorage into variables
if (sessionStorage.totalWithDiscount) {
   console.log("totalWithDiscount")
   totalWithDiscount = JSON.parse(sessionStorage.getItem("totalWithDiscount"));
   localStorage.removeItem("totalIncVat"); //For when the user goes back to cart_page to apply the coupon
} else if (sessionStorage.totalIncVat) {
   console.log("totalIncVat")
   totalIncVat = JSON.parse(sessionStorage.getItem("totalIncVat"));

}

//display the session storage keys on page
let checkoutTotal = document.querySelector(".total")
checkoutTotal.innerHTML = totalWithDiscount ? "Total: R " + totalWithDiscount.toFixed(2) : "Total: R " + totalIncVat.toFixed(2);


let formCheck = document.querySelector(".sheckoutForm");
//This function applies the delievry option values to the total when selected on.
formCheck.addEventListener('change', function (e) {
   console.log(e.target.type)
   if (totalIncVat && e.target.type === "radio") {
      let x = Number(e.target.value)
      let y = totalIncVat
      let result = eval("x + y")
      // console.log( result.toFixed(2))
      checkoutTotal.innerHTML = "Total: R " + result.toFixed(2)
   } else if (totalWithDiscount && e.target.type === "radio") {
      let a = Number(e.target.value)
      let b = totalWithDiscount
      let myResult = eval("a + b")
      console.log(myResult.toFixed(2))
      checkoutTotal.innerHTML = "Total: R " + myResult.toFixed(2)
   }

})

//Confirms order with reference number.
function checkShipping() {
   alert("Your order was successful! " + " Ref: " + randomNum)
   formCheck.action = "../../index.html" //return in welcome page
   sessionStorage.clear(); //clears cart/local/session storage
}


//Generates 10 random number when called. Ref no
let randomNum;
let count = 10
for (let i = 0; i < count; i++) {
   randomNum = Math.floor((Math.random() * 9000000000) + 1000000000)
}