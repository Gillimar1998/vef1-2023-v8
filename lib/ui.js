import { formatNumber } from './helpers.js';
import {updateCartStatus, updateAll } from '../main.js';

export function createCartLine(product, quantity) {
  // TODO útfæra þannig að búin sé til lína í körfu á forminu:

  /*
  <tr data-cart-product-id="1">
    <td>HTML húfa</td>
    <td>1</td>
    <td><span class="price">5.000 kr.-</span></td>
    <td><span class="price">5.000 kr.-</span></td>
    <td>
      <form class="remove" method="post">
        <button>Eyða</button>
      </form>
    </td>
  </tr>
  */
 
  const cartLineElement = document.createElement('tbody');
  const cartLineTrElement = document.createElement('tr');
  
  const cartLineTitleElement = document.createElement('td');
  const cartLineQuantityElement = document.createElement('td')
  const cartLinePriceElement = document.createElement('td');
  const cartLineTotalElement = document.createElement('td');
  const cartLineRemoveElement = document.createElement('td');
 
  cartLineTrElement.setAttribute("data-cart-product-id",product.id);
  cartLineElement.appendChild(cartLineTrElement);

  cartLineTitleElement.textContent = product.title;
  cartLineTitleElement.classList.add("title");
  cartLineTrElement.appendChild(cartLineTitleElement);

  cartLineQuantityElement.textContent = quantity;
  cartLineQuantityElement.classList.add("quantity");
  cartLineTrElement.appendChild(cartLineQuantityElement);

  cartLinePriceElement.classList.add("price");
  cartLineTotalElement.classList.add("total");

  cartLineTrElement.appendChild(cartLinePriceElement);
  cartLineTrElement.appendChild(cartLineTotalElement);
  cartLineTrElement.appendChild(cartLineRemoveElement);

  const spanPrice = document.createElement('span')
  spanPrice.textContent = formatNumber(product.price);
  cartLinePriceElement.appendChild(spanPrice);

  const spanTotal = document.createElement('span');
  spanTotal.textContent = formatNumber(product.price * quantity);
  cartLineTotalElement.appendChild(spanTotal);

  const formRemove = document.createElement('form');
  formRemove.classList.add("remove");
  formRemove.method = 'post'
  cartLineRemoveElement.appendChild(formRemove);
  const buttonRemove = document.createElement('button');
  buttonRemove.textContent = "Eyða";
  formRemove.appendChild(buttonRemove);


  
  
  
  

  // TODO hér þarf að búa til eventListener sem leyfir að eyða línu úr körfu
  buttonRemove.addEventListener('click', cartLineRemoved)
  function cartLineRemoved(event){
    event.preventDefault();

    const parent = event.target.closest('tbody');

    parent.remove();
    updateCartStatus();
    updateAll();
  }

  return cartLineElement;
}

/**
 * Sýna efni körfu eða ekki.
 * @param {boolean} show Sýna körfu eða ekki
 */
export function showCartContent(show = true) {
  // Finnum element sem inniheldur körfuna
  const cartElement = document.querySelector('.cart');

  if (!cartElement) {
    console.warn('fann ekki .cart');
    return;
  }

  const emptyMessage = cartElement.querySelector('.empty-message');
  const cartContent = cartElement.querySelector('.cart-content');

  const formfylki = document.querySelector('.form-container')

  if (!emptyMessage || !cartContent) {
    console.warn('fann ekki element');
    return;
  }

  if (show) {
    emptyMessage.classList.add('hidden');
    formfylki.classList.remove('hidden');
    cartContent.classList.remove('hidden');
  } else {
    emptyMessage.classList.remove('hidden');
    cartContent.classList.add('hidden');
    formfylki.classList.add('hidden');
  }
}
