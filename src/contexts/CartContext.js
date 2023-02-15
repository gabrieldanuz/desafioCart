import React, { useState, createContext } from 'react'

export const CartContext = createContext({})

function CartProvider({ children }) {
  const [cart, setCart] = useState([])

  function addItemCart(newItem) {
    const indexItem = cart.findIndex(item => item.id === newItem.id)

    if (indexItem !== -1) {
      //Se entrou aqui temos que add +1 pq ele já existe na lista
      let cartList = cart
      cartList[indexItem].amount = cartList[indexItem].amount + 1

      cartList[indexItem].total =
        cartList[indexItem].amount * cartList[indexItem].price

      setCart(cartList)
      return
    }

    let data = {
      ...newItem,
      amount: 1,
      total: newItem.price
    }

    //Ver se essse item já está no seu carrinho e aí add +1 quantidade

    setCart(products => [...products, data])
    console.log([...cart, data])
  }

  function removeItemCart(product) {
    const indexItem = cart.findIndex(item => item.id === product.id)

    if (cart[indexItem]?.amount > 1) {
      let cartList = cart

      cartList[indexItem].amount = cartList[indexItem].amount - 1
      cartList[indexItem].total =
        cartList[indexItem].total - cartList[indexItem].price

      setCart(cartList)
      return
    }

    const removeItem = cart.filter(item => item.id !== product.id)
    setCart(removeItem)
  }

  //Add no carrinho
  return (
    <CartContext.Provider
      value={{
        cart,
        addItemCart,
        removeItemCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider
