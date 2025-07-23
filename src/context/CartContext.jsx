// src/context/CartContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot,
  query,
} from "firebase/firestore";
import { db } from "../utils/firebase";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (!user) return setCartItems([]);

    const q = query(collection(db, "carts", user.uid, "items"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCartItems(items);
    });

    return () => unsubscribe();
  }, [user]);

  const addToCart = async (product) => {
    if (!user) throw new Error("User not authenticated");

    const userCartRef = collection(db, "carts", user.uid, "items");

    // Check if item already exists
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      const itemRef = doc(db, "carts", user.uid, "items", existingItem.id);
      await updateDoc(itemRef, {
        quantity: existingItem.quantity + 1,
      });
    } else {
      await addDoc(userCartRef, {
        ...product,
        quantity: 1,
        addedAt: new Date(),
      });
    }
  };

  const removeFromCart = async (itemId) => {
    if (!user) throw new Error("User not authenticated");
    const itemRef = doc(db, "carts", user.uid, "items", itemId);
    await deleteDoc(itemRef);
  };

  const incrementQuantity = async (itemId) => {
    const item = cartItems.find((i) => i.id === itemId);
    if (!item) return;

    const itemRef = doc(db, "carts", user.uid, "items", itemId);
    await updateDoc(itemRef, {
      quantity: item.quantity + 1,
    });
  };

  const decrementQuantity = async (itemId) => {
    const item = cartItems.find((i) => i.id === itemId);
    if (!item || item.quantity <= 1) return;

    const itemRef = doc(db, "carts", user.uid, "items", itemId);
    await updateDoc(itemRef, {
      quantity: item.quantity - 1,
    });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
