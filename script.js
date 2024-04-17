// Movimiento lateral del carro
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

// Abrir carrito
cartIcon.onclick = () => {
    cart.classList.add("active");
}

// Cerrar carrito
closeCart.onclick = () => {
    cart.classList.remove("active");
}

// Funcionamiento
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
} else {
    ready();
}


// Eliminar elementos del carrito
function ready() {
    var reomveCarrito = document.getElementsByClassName("cart-remove");
    console.log(reomveCarrito);
    for (var i = 0; i < reomveCarrito.length; i++) {
        var boton = reomveCarrito[i];
        boton.addEventListener("click", removeCarritoItem);
    }
    // Cantidad cambios
    var quantityInputs = document.getElementsByClassName("cart-quantity");
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }

    var addCart = document.getElementsByClassName("add-cart");
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }

    document.getElementsByClassName("btn-buy")[0].addEventListener("click", buyButtonClicked);
}

// Buy

function buyButtonClicked() {
    alert("Tu orden ha sido procesada")
    var cartContent = document.getElementsByClassName("cart-content")[0];
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild);
    }
    updateTotal();
}

function removeCarritoItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}

// Quantity Changes
function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
}


// Añadir al carrito
function addCartClicked(event) {
    var image = event.target;
    var productBox = image.closest(".product-box");
    var title = productBox.querySelector(".product-title").innerText;
    var price = productBox.querySelector(".price").innerText;
    var productImg = productBox.querySelector(".product-img").src;
    addProductToCart(title, price, productImg);
    updateTotal();
}


var productImages = document.querySelectorAll('.product-img');
productImages.forEach(function (image) {
    image.addEventListener('click', addCartClicked);
});

var booleanOpen = false;

function addProductToCart(title, price, productImg) {
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title) {
            alert("Ya has agregado este articulo al carrito");
            return;

        }

    }

    // Para que solo se active la primera vez que se agregue un producto



    var cartBoxContent = `
                 <img src="${productImg}" alt="" class="cart-img">
                 <div class="detail-box">
                        <div class="cart-product-title">${title}</div>
                        <div class="cart-price">${price}</div>
                        <input type="number" value="1" class="cart-quantity">
                  </div>
                  <!-- Eliminar carrito -->
                  <i class='bx bxs-trash-alt cart-remove'></i> `

    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click", removeCarritoItem);
    cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener("change", quantityChanged);
    // Actualizar el precio
    updateTotal();

    if (!booleanOpen) {
        var cart = document.querySelector(".cart");
        if (!cart.classList.contains("active")) {
            cart.classList.add("active");
        }
        booleanOpen = true;
    }
}

function updateTotal() {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];

        // Verificar si los elementos existen antes de acceder a sus propiedades
        if (priceElement && quantityElement) {
            var price = parseFloat(priceElement.innerText.replace("$", ""));
            var quantity = quantityElement.value;
            total += price * quantity;
        }

    }

    // Actualizar el precio total en la interfaz de usuario
    var totalPriceElement = document.getElementsByClassName("total-price")[0];
    if (totalPriceElement) {
        totalPriceElement.innerText = "$" + total;
    }
}

// Ocultar paquetes

function showSection(sectionId) {
    // Oculta todas las secciones de servicios extras
    var sections = document.querySelectorAll(".shop.container > .product-box");
    sections.forEach(function (section) {
        section.classList.add("hidden");
    });

    // Muestra la sección correspondiente al paquete seleccionado
    var selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.remove("hidden");
    }

}



// Barra lateral

var navLinks = document.getElementById("navLinks");

function showMenu() {
    navLinks.style.right = "0";
}

function hideMenu() {
    navLinks.style.right = "-200px";
}