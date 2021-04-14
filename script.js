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

// retorna o item pelo id passado pelo elemento span.item__sku
// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

// aqui é onde o filho chora e a mãe não ver! :)
// function cartItemClickListener(event) {
//   // coloque seu código aqui
  
// }

const fetchMLB = (shopping) => {
  fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${shopping}`)
    .then((response) => response.json())
    .then((products) => {
      products.results.forEach((product) => {
        const allProducts = {
          sku: products.id,
          name: product.title,
          image: product.thumbnail,
        };
        document.querySelector('.items')
          .appendChild(createProductItemElement(allProducts));
      });
    });
};

// vai receber um objeto com sku, name e saleprice e faz a destrutucring para retornar um texto com id, name...
// function createCartItemElement({ sku, name, salePrice }) {
//   const li = document.createElement('li');
//   li.className = 'cart__item';
//   li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
//   li.addEventListener('click', cartItemClickListener);
//   return li;
// }

window.onload = function onload() { 
  fetchMLB('computador');
};