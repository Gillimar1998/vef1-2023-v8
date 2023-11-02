import { createCartLine, showCartContent } from './lib/ui.js';
import { formatNumber } from './lib/helpers.js';

const products = [
  {
    id: 1,
    title: 'HTML húfa',
    description:
      'Húfa sem heldur hausnum heitum og hvíslar hugsanlega að þér hvaða element væri best að nota.',
    price: 5_000,
  },
  {
    id: 2,
    title: 'CSS sokkar',
    description: 'Sokkar sem skalast vel með hvaða fótum sem er.',
    price: 3_000,
  },
  {
    id: 3,
    title: 'JavaScript jakki',
    description: 'Mjög töff jakki fyrir öll sem skrifa JavaScript reglulega.',
    price: 20_000,
  },
];

let hasItems = false;
updateCartStatus();

export function updateCartStatus() {
  const cartFylki = document.querySelectorAll('.table');
  const cart = cartFylki[1];
  const cartLines = cart.querySelectorAll('tr[data-cart-product-id]');
  hasItems = cartLines.length > 0;
  showCartContent(hasItems);
}

/** Bæta vöru í körfu */
function addProductToCart(product, quantity) {
  // Hér þarf að finna `<tbody>` í töflu og setja `cartLine` inn í það
  const cartFylki = document.querySelectorAll('.table');
  const cart = cartFylki[1];
  

  if (!cart) {
    console.warn('fann ekki .cart');
    return;
  }
  
  // TODO hér þarf að athuga hvort lína fyrir vöruna sé þegar til

  function checkCartLineById(cart, productId){
    const cartLines = cart.querySelectorAll('tr[data-cart-product-id]');
    for(const cartLine of cartLines){
      const lineProductId = parseInt(cartLine.getAttribute('data-cart-product-id'));
    if (lineProductId === productId) {
      return cartLine;
    }
    }
    return null;
  }

  const existingCartline = checkCartLineById(cart, product.id)

  if(existingCartline){
    const quantityElement = existingCartline.querySelector('.quantity');
    if(quantityElement){
      const existingQuantity = parseInt(quantityElement.textContent);
      quantityElement.textContent = (existingQuantity + quantity);
      updateCartLineTotal(existingCartline);
    }
    
  }
  else{
    const cartLine = createCartLine(product, quantity);
    cart.appendChild(cartLine);
  }
  

  function updateCartLineTotal(cartLine){
    const priceElement = cartLine.querySelector('.price span');
    const quantityElement = cartLine.querySelector('.quantity');
    const totalElement = cartLine.querySelector('.total span');

    if (priceElement && quantityElement && totalElement) {

      const priceText = priceElement.textContent.trim();
      const price = parseFloat(priceText.replace('ISK', '').replace(/[,\s.]/g, ''));
      const quantity = parseInt(quantityElement.textContent);
  
      const newTotal = price * quantity;
  
      
      totalElement.textContent = formatNumber(newTotal);
  }
}

  // Sýna efni körfu
  updateCartStatus();
  updateAll();
  
}

function submitHandler(event) {
  // Komum í veg fyrir að form submiti
  event.preventDefault();
  
  // Finnum næsta element sem er `<tr>`
  const parent = event.target.closest('tr');

  // Það er með attribute sem tiltekur auðkenni vöru, t.d. `data-product-id="1"`
  const productId = Number.parseInt(parent.dataset.productId);

  // Finnum vöru með þessu productId
  const product = products.find((i) => i.id === productId);

  // TODO hér þarf að finna fjölda sem á að bæta við körfu með því að athuga
  // á input
  const quantityIntput = parent.querySelector('input[type="number"]');
  const quantity = Number.parseInt(quantityIntput.value)
  

  // Bætum vöru í körfu (hér væri gott að bæta við athugun á því að varan sé til)
  addProductToCart(product, quantity);
}

// Finna öll form með class="add"
const addToCartForms = document.querySelectorAll('.add')

// Ítra í gegnum þau sem fylki (`querySelectorAll` skilar NodeList)
for (const form of Array.from(addToCartForms)) {
  // Bæta submit event listener við hvert
  form.addEventListener('submit', submitHandler);
}

// TODO bæta við event handler á form sem submittar pöntun

const formfylki = document.querySelectorAll('form');
const form = formfylki[3];
const gangaFraKaupumButton = form.querySelector('button')


gangaFraKaupumButton.addEventListener('click', gangaFraKaupum)
  


function gangaFraKaupum(event){
  event.preventDefault();

  const receipt = document.querySelector('.receipt');

  receipt.classList.remove('hidden');

}

export function updateAll() {
  const cartFylki = document.querySelectorAll('.table');
  const cart = cartFylki[1];
  const samtalslina = document.querySelector('.table tfoot');
  const samtals = samtalslina.querySelector('.price')

  const cartLines = cart.querySelectorAll('tr[data-cart-product-id]');

  let totalAmount = 0;

  cartLines.forEach(cartLine =>{
    const totalElement = cartLine.querySelector('.total span');

    const totalText = totalElement.textContent.trim();
    const total = parseInt(totalText.replace('ISK', '').replace(/[,\s.]/g, ''));

    totalAmount += total;

  });


  samtals.textContent = formatNumber(totalAmount);


}