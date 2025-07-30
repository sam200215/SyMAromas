const perfumes = [
  {
    name: "Lattafa Khamrah",
    image: "img/Lattafa.png",
    detailImage: "img/decants lattafa.png",
    notas: "Canela, dátiles, vainilla",
    clima: "Ideal para clima fresco o nocturno",
    presentacion: "5ml y 10ml disponibles"
  },
  {
    name: "Nautica Voyage",
    image: "img/Nautica.png",
    detailImage: "img/decants nautica.png",
    notas: "Manzana verde, hojas verdes, almizcle",
    clima: "Perfecto para clima cálido y uso diario",
    presentacion: "5ml y 10ml disponibles"
  },
  {
    name: "L'eau D'Issey Pour Homme",
    image: "img/Pour Homme.png",
    detailImage: "img/decants pour homme.png",
    notas: "Yuzu, bergamota, sándalo",
    clima: "Versátil, ideal para clima templado",
    presentacion: "5ml y 10ml disponibles"
  },
  {
    name: "Rasasi Hawas",
    image: "img/Rasasi Hawas.png",
    detailImage: "img/decants hawas.png",
    notas: "Canela, ámbar gris, bergamota",
    clima: "Perfecto para clima cálido, salidas informales",
    presentacion: "5ml y 10ml disponibles"
  },
  {
    name: "Club de Nuit",
    image: "img/CN.png",
    detailImage: "img/decants club.png",
    notas: "Limón, grosella negra, almizcle",
    clima: "Ideal para clima templado o nocturno",
    presentacion: "5ml y 10ml disponibles"
  }
];

const grid = document.getElementById("product-grid");
const detail = document.getElementById("detail-view");
let cart = [];
let selectedPerfume = null;

perfumes.forEach(p => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <img src="${p.image}" alt="${p.name}" />
    <div class="card-content">
      <h2>${p.name}</h2>
    </div>
  `;
  card.onclick = () => showDetails(p);
  grid.appendChild(card);
});

function showDetails(p) {
  selectedPerfume = p;
  document.getElementById("detail-image").src = p.detailImage;
  document.getElementById("detail-title").textContent = p.name;
  document.getElementById("detail-notas").textContent = p.notas;
  document.getElementById("detail-clima").textContent = p.clima;
  document.getElementById("detail-presentacion").textContent = p.presentacion;

 

  detail.classList.remove("hidden");
  grid.classList.add("hidden");
}

function hideDetails() {
  detail.classList.add("hidden");
  grid.classList.remove("hidden");
}

function addToCart() {
  const cantidad = document.querySelector('input[name="ml"]:checked').value;
  cart.push({
    name: selectedPerfume.name,
    cantidad: cantidad
  });
  updateCartCount();
  alert(`Agregado al carrito: ${selectedPerfume.name} (${cantidad})`);
}

function updateCartCount() {
  document.getElementById("cart-count").textContent = cart.length;
}

function toggleCart() {
  const cartView = document.getElementById("cart-view");

  if (cart.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  cartView.classList.toggle("hidden");
  renderCart();
}

function renderCart() {
  const list = document.getElementById("cart-items");
  list.innerHTML = "";

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - ${item.cantidad}`;
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "❌";
    removeBtn.onclick = () => {
      cart.splice(index, 1);
      updateCartCount();
      renderCart();
      if (cart.length === 0) {
        document.getElementById("cart-view").classList.add("hidden");
      }
    };
    li.appendChild(removeBtn);
    list.appendChild(li);
  });

  const mensaje = cart.map(p => `• ${p.name} (${p.cantidad})`).join("\n");
  const numero = "50432321728";
  const url = `https://wa.me/${numero}?text=${encodeURIComponent("Hola, quiero hacer el siguiente pedido:\n\n" + mensaje)}`;
  document.getElementById("whatsapp-cart-btn").href = url;
}
