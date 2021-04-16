// vai entrar o link de uma imagem
function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

// vai entrar o tipo de elemento para ser criado, o nome da  classe e o texto do elemento
function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

// chama a função anterior para atribuir os parâmetros sku : id, name, image
function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  return section;
}

// captura os produtos da api
async function fetchMLB(shopping) {
  const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${shopping}`);
  const products = await response.json();
  return products.results;
}

// renderiza os produtos na tela
function renderProducts(products) {
  const elementProducts = document.querySelector('.items');
  products.forEach((product) => {
    const allProducts = {
          sku: product.id,
          name: product.title,
          image: product.thumbnail,
        };
      const creatProducts = createProductItemElement(allProducts);
      elementProducts.appendChild(creatProducts);
  });
}

const cartItems = '.cart__items';

// resolução do requisito 4 feito com ajuda do Dennis
function saveLocalStorage() {
  const getCartList = document.querySelector(cartItems).innerHTML;
  localStorage.setItem('card', getCartList);
}

// remove os items clicando neles no carrinho de compras e no local storage
function cartItemClickListener(event) {
  // coloque seu código aqui
  const getItem = event.target;
  getItem.remove();
  saveLocalStorage();
}

function loadLocalStorage() {
  const getCartList = document.querySelector(cartItems);
  getCartList.innerHTML = localStorage.getItem('card');
  getCartList.addEventListener('click', cartItemClickListener);
}

// vai receber um objeto com sku, name e saleprice e faz a destrutucring para retornar um texto com id, name...
function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

// retorna o item pelo id passado pelo elemento span.item__sku
function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText; // retorna o text que tem dentro da class item__sku que é filho de Item
}

async function addItemCard(event) {
  const ItemID = getSkuFromProductItem(event.target.parentNode); // parentNode é a class Item que será passada para a função getSku...
  const responseItem = await fetch(`https://api.mercadolibre.com/items/${ItemID}`);
  const products = await responseItem.json(); // captura os items
  const productsCard = {
    sku: products.id,
    name: products.title,
    salePrice: products.price,
  };
  // retorna a lista onde vai ser add os produtos através da função createCartItemElement
  const createCart = createCartItemElement(productsCard);
  const getCartItems = document.querySelector(cartItems);
  getCartItems.appendChild(createCart);
  saveLocalStorage();
}

function getBtn() {
  const getButton = document.querySelectorAll('.item button');
  getButton.forEach((buttonAdd) => {
      buttonAdd.addEventListener('click', addItemCard);
    });
}

window.onload = async function onload() { 
  loadLocalStorage();
  const products = await fetchMLB('computador');
  renderProducts(products);
  getBtn();
};