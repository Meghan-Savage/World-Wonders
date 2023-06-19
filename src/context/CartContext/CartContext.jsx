import React, { useState, useEffect } from "react";

export const CartContext = React.createContext();

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [itemAmount, setItemAmount] = useState(0);
  const [cartAmount, setCartAmount] = useState(0);
  const [total, setTotal] = useState(0);

  const addToCart = (product, id) => {
    const newItem = { ...product, amount: 1 };
    const cartItem = cart.find((item) => item.id === id);
    if (cartItem) {
      const newCart = cart.map((item) => {
        if (item.id === id) {
          return { ...item, amount: item.amount + 1 };
        } else {
          return item;
        }
      });
      setCart(newCart);
    } else {
      setCart([...cart, newItem]);
    }
  };

  const removeFromCart = (id) => {
    const newCart = cart.filter((item) => {
      return item.id !== id;
    });
    setCart(newCart);
  };

  const increaseAmount = (id) => {
    const cartItem = cart.find((item) => item.id === id);
    addToCart(cartItem, id);
  };

  const decreaseAmount = (id) => {
    const cartItem = cart.find((item) => {
      return item.id === id;
    });
    if (cartItem) {
      const newCart = cart.map((item) => {
        if (item.id === id) {
          return { ...item, amount: cartItem.amount - 1 };
        } else {
          return item;
        }
      });
      setCart(newCart);
    }

    if (cartItem.amount < 2) {
      removeFromCart(id);
    }
  };

  const updateQuantity = (id, quantity) => {
    const newCart = cart.map((item) => {
      if (item.id === id) {
        return { ...item, amount: quantity };
      } else {
        return item;
      }
    });
    setCart(newCart);
    const amount = newCart.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.amount;
    }, 0);
    setItemAmount(amount);
  };

  useEffect(() => {
    const total = cart.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.price * currentItem.amount;
    }, 0);
    setTotal(total);
  }, [cart]);

  useEffect(() => {
    if (cart) {
      const uniqueIds = new Set(cart.map((item) => item.id));
      setCartAmount(uniqueIds.size);
      sessionStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  useEffect(() => {
    if (cart) {
      const amount = cart.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.amount;
      }, 0);
      setItemAmount(amount);
      sessionStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const clearCart = () => {
    setCart([]);
  };

  useEffect(() => {
    const storedCart = sessionStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        itemAmount,
        removeFromCart,
        clearCart,
        increaseAmount,
        decreaseAmount,
        total,
        cartAmount,
        updateQuantity,
        setTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
