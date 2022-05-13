$(document).ready(function () {
   //All products
   const product = [{
         id: 0,
         name: "Vertini Fairlady",
         price: 11100,
         quantity: 3,
         size: ['19"', '22"'],
         color: {
            col1: "Black & Silver"
         },
         overview: `<li>A 5 spokes wheel need not to be boring! Fairlady enhances an already classic design and carry it up to another level.</li>
         <li>This fashionable wheel encompasses eye catching elements that would be appealing to even the most die-hard racing fan. Fairlady simply combines no nonsense appearance with workability that speed craze are after. Nonetheless, still retaining the brilliance for anyone who just wants to look good!</li>
         <li>GREAT FOR BIG BRAKE G37s OR PORChE GT3./li>`,
         pic: "../../img/rim1/fairlady-machined_black_chrome_lip-3001.png"
      },
      {
         id: 1,
         name: "Enkei Draco",
         price: 13550,
         quantity: 5,
         size: ['19"', '22"'],
         color: {
            col1: "5 LUG ANTHRACITE",
            col2: "5 LUG BLACK MACHINED"
         },
         overview: `<li>This modern and aggressive V-Spoke wheel is well suited to modern performance sedans and even some small SUVs & Crossovers.</li>
         <li>It is available 15” through 18” in all-new anthracite or black machined finish and comes with a cleanly styled center cap to complete the look.</li>
         <li>Enkei has always been about offering stylish and sporty wheels that are also tough enough to stand up to the rigors of high-speed driving.</li>`,
         pic: "../../img/rim2/ENKEI-TOCLIP-DRACO-BKM-28-SM21-500_5737.png"
      },
      {
         id: 2,
         name: "Vossen CV3",
         price: 9850,
         quantity: 8,
         size: ['19"', '22"'],
         color: {
            col1: "GLOSS GRAPHITE",
            col2: "METALLIC GLOSS SILVER"
         },
         overview: `<li>The CV3-R employs a low-pressure casting process to create a light-weight, single-piece mono block wheel.</li>
         <li>Manufactured in two gloss finishes, the CV3-R is available in 19”, 20” and 22” diameters and a variety of bolt patterns and offsets.</li>`,
         pic: "../../img/rim3/CV3-mattegraphite-std-500.png"
      },
      {
         id: 3,
         name: "Vossen VFS-2",
         price: 8000,
         quantity: 3,
         size: ['19"', '22"'],
         color: {
            col1: "Silver",
            col2: "Graphite",
            col3: "Silver"
         },
         overview: `<li>Our new VF Series made with flow forming technology allows us to offer a variety of new widths.
         </li><li>Our VFS-2 will be introduced in a 20” and 22” diameter with a width range of 8.5” all the way to
            12”.</li><li>We will be offering three concave design profiles in 20” – flat, mid and deep.</li><li>These new width options will provide more fitment flexibility and versatility, along with a
            stronger and lighter wheel.</li>`,
         pic: "../../img/rim4/VFS2-Bronze-1-500.png"
      },
      {
         id: 4,
         name: "RSR R903",
         price: 13700,
         quantity: 3,
         size: ['19"', '22"'],
         color: {
            col1: "Bronze",
            col2: "Titanium"
         },
         overview: `<li>The RSR Forged R903 Wheel is exclusively designed to fit Honda Civic Type R performance vehicles.</li>
         <li>Split spoke design in Bronze or Brushed Titanium finish.</li>
         <li>18x9.5 size option.</li>`,
         pic: "../../img/rim5/mkw-r903-wheel-5lug-bronze-18x95-500_5934.png"
      }
   ];

   //Get elements
   let itemsMainContainer = document.querySelector('.all-items');
   //Cart activate
   let cartIcon = document.querySelector(".imageLink");
   //productItem only stores information that will be used on the cart page == then .push to CART.
   let productItem = {};
   //Cart stores product information that will be used on other pages.
   let CART = [];

   //If CART sessionStorage/localStorage exists, load into cart.
   if (sessionStorage.cartItems) {
      const storage = JSON.parse(sessionStorage.getItem("cartItems"));
      CART = storage;
      enableCart()
      "../cart_page/index.html"
   } else {
      cartIcon.href = "#";
   }

   //The LOOP = for each item, do something and add click event.
   product.forEach((item, index) => {

      //item container
      let itemContainer = document.createElement("div");
      itemContainer.className = "item-container";
      itemsMainContainer.appendChild(itemContainer);

      //item container >> image-container

      let imgContainer = document.createElement("img-thumbnail");
      imgContainer.className = "img-thumbnail";
      itemContainer.appendChild(imgContainer);

      //item container >> image-container >> Image
      let productImg = document.createElement("img");
      productImg.className = "product-image";
      product.alt = item.name;
      productImg.src = item.pic;
      imgContainer.appendChild(productImg);

      //Item Name
      let itemName = document.createElement("h3");
      itemName.textContent = item.name;
      itemName.className = "item-heading";
      itemContainer.appendChild(itemName);

      //Form container
      let itemDetailsContainer = document.createElement("div");
      itemDetailsContainer.className = "description-container";
      itemContainer.appendChild(itemDetailsContainer);

      //Price
      let itemPrice = document.createElement("p");
      itemPrice.className = "price";
      itemPrice.textContent = "R" + item.price.toFixed(0);
      itemDetailsContainer.appendChild(itemPrice);

      //Wheel Size(ws_) Options(radio button)
      let ws_heading = document.createElement("p");
      ws_heading.className = "wheel-size";
      ws_heading.textContent = "Wheel size";
      itemDetailsContainer.appendChild(ws_heading);
      let wheelSize;
      //Wheel size option loop
      for (let i = 0; i < item.size.length; i++) {

         let ws_formContainer = document.createElement("div");
         ws_formContainer.className = "form-check";
         itemDetailsContainer.appendChild(ws_formContainer);

         let ws_input = document.createElement("input");
         ws_input.className = "form-check-input";
         ws_input.type = "radio";
         ws_input.checked = true;
         ws_input.name = "flexRadioDefault" + item.id;
         ws_input.id = item.id + [i];
         //store wheel size to wheelSize var
         wheelSize = item.size[i];

         //Select size & store it to wheelSize var.
         ws_input.addEventListener('change', function () {
            wheelSize = item.size[i];
            console.log(item.size[i])
         })
         ws_formContainer.appendChild(ws_input);
         let ws_label = document.createElement("label");
         ws_label.className = "form-check-label";
         ws_label.setAttribute("for", item.id + [i]);
         ws_label.textContent = item.size[i]
         ws_formContainer.appendChild(ws_label);
      }

      //Color option (Select > option elements)
      //The chosen color value will be stored in select.value "(NOT!! option.value)" elements.
      let selectMenu = document.createElement("select");
      selectMenu.className = "form-select";
      itemDetailsContainer.appendChild(selectMenu);

      //Color options
      for (const key in item.color) {
         let itemOption = document.createElement("option");
         itemOption.selected = true;
         selectMenu.value = item.color[key];
         itemOption.value = item.color[key];
         itemOption.textContent = item.color[key];
         selectMenu.appendChild(itemOption);
      };

      //Item descriptions
      let overViewText = document.createElement("p");
      overViewText.textContent = "Overview";
      overViewText.className = "description-heading";
      itemDetailsContainer.appendChild(overViewText);

      let ul = document.createElement("ul")
      ul.className = "item-description";
      ul.innerHTML = item.overview;
      itemDetailsContainer.appendChild(ul)

      //Add to CART button
      let addToCart_btn = document.createElement("button");
      addToCart_btn.className = "myBtn myBtn5";
      addToCart_btn.textContent = "Add to Cart";
      // addToCart_btn.type = "submit";
      itemDetailsContainer.appendChild(addToCart_btn);

      //Preview button
      let prev_btn = document.createElement("a");
      prev_btn.href = "../previews/prev.html#fairlady"; //Need to fix the links to scroll to previews
      prev_btn.className = "preview-btn-link myBtn myBtn5 two";
      prev_btn.textContent = "Details ";
      itemDetailsContainer.appendChild(prev_btn);
      let fontAwesome = document.createElement("i");
      fontAwesome.className = "fa fa-arrow-circle-right";
      prev_btn.appendChild(fontAwesome);

      /* 
      ========================
      WHEN ADDING ITEM TO CART
      ========================
      */
      addToCart_btn.addEventListener('click', function () {
         //Gather only the data for cart page
         productItem.name = item.name;
         productItem.color = selectMenu.value;
         productItem.quantity = 1;
         productItem.price = item.price.toFixed(0);
         productItem.size = wheelSize;

         //push all productItem data to CART array
         CART.push(productItem)

         //Store CART array to session/localStorage
         sessionStorage.setItem("cartItems", JSON.stringify(CART));

         //empty productItem object to prevent duplicate items in CART array.
         productItem = {};

         //Shakes cart icon on click
         enableCart()
      })

   }); //product.forEach loop END

   //CART icon functionality
   function enableCart() {
      if (CART.length > 0) {
         $(".cartIcon").addClass("shake-bottom showIcon");
         setTimeout(function () {
            $(".cartIcon").removeClass("shake-bottom");
         }, 1000)
         let cartIcon = document.querySelector(".imageLink")
         cartIcon.href = "../cart_page/index.html";

      }

   }
   //this slides the product heading text
   $(".item-heading")
      .slideUp(1000)
      .slideDown(500);
});