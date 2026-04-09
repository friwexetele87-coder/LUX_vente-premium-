let selected = null;

const products = [
  {
    id: 1,
    name: "Produit Luxe 1",
    price: 15000,
    img: "https://via.placeholder.com/300"
  },
  {
    id: 2,
    name: "Produit Luxe 2",
    price: 20000,
    img: "https://via.placeholder.com/300"
  }
];

// Charger produits
function loadProducts(){
  const box = document.getElementById("products");

  products.forEach(p => {
    box.innerHTML += `
      <div class="card" onclick="openForm(${p.id})">
        <img src="${p.img}" />
        <h3>${p.name}</h3>
        <p class="price">${p.price} FCFA</p>
      </div>
    `;
  });
}

// ouvrir formulaire
function openForm(id){
  selected = products.find(p => p.id === id);
  document.getElementById("modal").style.display = "flex";
}

// fermer modal
function closeModal(){
  document.getElementById("modal").style.display = "none";
}

// envoyer commande
function sendOrder(){

  const name = document.getElementById("name").value;
  const city = document.getElementById("city").value;
  const address = document.getElementById("address").value;
  const details = document.getElementById("details").value;

  const msg =
`🛒 NOUVELLE COMMANDE
Produit: ${selected.name}
Nom: ${name}
Ville: ${city}
Adresse: ${address}
Détails: ${details}`;

  // WhatsApp Business
  const phone = "237657556756";
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;

  window.open(url, "_blank");

  alert("Commande envoyée ✔ Paiement Awoopay à connecter");

  saveOrder({
    product: selected.name,
    name,
    city,
    address,
    time: new Date().toLocaleString()
  });

  closeModal();
}

// stockage local
function saveOrder(order){
  let data = JSON.parse(localStorage.getItem("orders") || "[]");
  data.push(order);
  localStorage.setItem("orders", JSON.stringify(data));
}

// ADMIN
function openAdmin(){
  const pass = prompt("Mot de passe admin");

  if(pass !== "admin123"){
    alert("Accès refusé");
    return;
  }

  const orders = JSON.parse(localStorage.getItem("orders") || "[]");

  document.getElementById("stats").innerHTML =
    `Commandes: ${orders.length}<br>Revenu estimé: ${orders.length * 15000} FCFA`;

  let html = "";
  orders.forEach(o => {
    html += `<p>📦 ${o.product} - ${o.name}</p>`;
  });

  document.getElementById("orders").innerHTML = html;
  document.getElementById("admin").style.display = "flex";
}

function closeAdmin(){
  document.getElementById("admin").style.display = "none";
}

loadProducts();
