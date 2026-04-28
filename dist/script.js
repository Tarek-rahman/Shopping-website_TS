document.addEventListener('DOMContentLoaded', () => {
    const addToButton = document.querySelectorAll('.fa-plus');
    const cartItemCount = document.querySelector('.count');
    const cartItemsList = document.querySelector('.all_cart');
    const cartTotal = document.querySelector('.total');
    const cartIcon = document.querySelector('.fa-cart-shopping');
    const sidebar = document.querySelector('.checkout_section');
    let cartItems = [];
    let totalAmount = 0;
    addToButton.forEach((button, index) => {
        button.addEventListener('click', () => {
            let food_cartP = document.querySelectorAll('.food_cart > p')[index];
            let purcesP = document.querySelectorAll('.purces > p')[index];
            const item = {
                name: food_cartP.textContent,
                price: parseFloat(purcesP.innerText.slice(1)),
                quantity: 1,
            };
            const existingItem = cartItems.find(cartItem => cartItem.name === item.name);
            if (existingItem) {
                existingItem.quantity++;
            }
            else {
                cartItems.push(item);
            }
            totalAmount += item.price;
            updateCartUl();
        });
        function updateCartUl() {
            updateCartItemCount(cartItems.length);
            updateCartItemList();
            updateCartTotal();
        }
        function updateCartItemCount(count) {
            cartItemCount.textContent = count.toString();
        }
        function updateCartItemList() {
            cartItemsList.innerHTML = '';
            cartItems.forEach((item, index) => {
                const cartItem = document.createElement('div');
                cartItem.classList.add('card_item');
                cartItem.innerHTML = `
        <span>(${item.quantity}$)${item.name}</span>
        <span>$${(item.price * item.quantity).toFixed(2)}
        <button class="remove_btn" data-index="${index}"><i class="fa-solid fa-xmark"></i></button>
        </span>
        `;
                cartItemsList.appendChild(cartItem);
            });
            const removeButton = document.querySelectorAll('.remove_btn');
            removeButton.forEach(button => {
                button.addEventListener('click', event => {
                    const index = event.target;
                    // @ts-ignore
                    let par = index.parentElement;
                    let indexNum = par.getAttribute('data-index');
                    removeItemFormCart(+indexNum);
                });
            });
        }
        function removeItemFormCart(index) {
            const removeItem = cartItems.splice(index, 1)[0];
            console.log(index);
            totalAmount -= removeItem.price * removeItem.quantity;
            updateCartUl();
        }
        function updateCartTotal() {
            cartTotal.textContent = `$${totalAmount.toFixed(2)}`;
        }
        cartIcon.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });
        const closeButton = document.querySelector('.closce_icon');
        closeButton.addEventListener('click', () => {
            sidebar.classList.remove('open');
        });
        const checkoutBtn = document.getElementById('checkout_btn');
        checkoutBtn.addEventListener('click', () => {
            // alert('Thank You for the purchese!');
            cartTotal.textContent = '$0.00';
            cartItemsList.innerHTML = '';
        });
    });
});
export {};
//# sourceMappingURL=script.js.map