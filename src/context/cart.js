import { createContext, useContext, useState } from "react"

const initialState = {
    cart: [],
    cartItemCount: () => 0,
    addToCart: () => null,
    removeFromCart: () => null,
    increaseQuantity: () => null,
    decreaseQuantity: () => null,
}

const CartContext = createContext(initialState) // maine context create kia hai taaki mai poore app me data ko access kar saku

const useCart = () => useContext(CartContext)

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(initialState.cart)



    const cartItemCount = () => {  // cart item ki quantity add karne ke liye reduce mathod ka use kia hai
        return cart.reduce((acc, item) => acc + item.quantity, 0) 
    }



    const addToCart = (product) => {
        const productIdx = cart.findIndex((item) => item.product.id === product.id) // ham card ka index find krege aur agar exist krta hoga to sirf uska count ko increse karege
        if (productIdx !== -1) {
            increaseQuantity(product.id)
        } else {                                // else ham poora product aur uski quantity ke sath product add krege
            setCart([...cart, { product, quantity: 1 }])
        }
    }



    const removeFromCart = (productId) => {     // isme ham product ko filter karke remove kar rhe hai
        setCart(cart.filter((item) => item.product.id !== productId))
    }

    const increaseQuantity = (productId) => {
        const copy = cart.slice()
        const productIdx = copy.findIndex((item) => item.product.id === productId)
        if (productIdx !== -1) {
            copy[productIdx].quantity += 1
            setCart(copy)
        }
    }

    const decreaseQuantity = (productId) => {
        const copy = cart.slice()
        const productIdx = copy.findIndex((item) => item.product.id === productId)
        if (productIdx !== -1 && copy[productIdx].quantity > 1) {
            copy[productIdx].quantity -= 1
            setCart(copy)
        }
    }

    return (
        <CartContext.Provider
            value={{ cart, cartItemCount, addToCart, removeFromCart, increaseQuantity, decreaseQuantity }}
        >
            {children}
        </CartContext.Provider>
    )
}

export { useCart, CartProvider }