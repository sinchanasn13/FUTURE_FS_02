import React, { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import { useAuth } from "../context/AuthContext";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-hot-toast";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";

const CartPage = () => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCartItems = async () => {
    if (!user) return;
    try {
      const cartRef = collection(db, "carts", user.uid, "items");
      const snapshot = await getDocs(cartRef);
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCartItems(items);
      setLoading(false);
   } catch (error) {
  console.error("Update quantity failed:", error.code, error.message);
  toast.error("Failed to update quantity: " + error.message);
}
  };

  const handleRemove = async (itemId) => {
    try {
      await deleteDoc(doc(db, "carts", user.uid, "items", itemId));
      toast.success("Item removed from cart.");
      fetchCartItems();
    } catch (err) {
      toast.error("Failed to remove item.");
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      const itemRef = doc(db, "carts", user.uid, "items", itemId);
      await updateDoc(itemRef, { quantity: newQuantity });
      fetchCartItems();
    } catch (error) {
      toast.error("Failed to update quantity.");
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  useEffect(() => {
    fetchCartItems();
  }, [user]);

  if (!user) {
    return (
      <div className="text-center mt-10 text-red-500 font-semibold">
        Please log in to view your cart.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center mt-10 text-gray-500">Loading cart...</div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-500">
        Your cart is empty.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-primary">Shopping Cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center border rounded-lg p-4 bg-white dark:bg-gray-900 shadow"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-28 h-28 object-contain mr-4"
              />
              <div className="flex-1">
                <h2 className="font-semibold text-lg">{item.title}</h2>
                <p className="text-gray-500 text-sm">{item.description}</p>
                <p className="mt-1 text-base font-semibold text-primary">
                  ₹{item.price} x {item.quantity} = ₹
                  {item.price * item.quantity}
                </p>
                <div className="flex items-center mt-2 space-x-3">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-2 rounded-full border hover:bg-gray-200"
                  >
                    <FaMinus size={12} />
                  </button>
                  <span className="px-3">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-2 rounded-full border hover:bg-gray-200"
                  >
                    <FaPlus size={12} />
                  </button>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="ml-4 text-red-500 hover:text-red-600"
                  >
                    <FaTrash size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Section */}
        <div className="border rounded-lg p-6 bg-white dark:bg-gray-900 shadow h-fit">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="flex justify-between mb-2">
            <span>Total Items</span>
            <span>{cartItems.length}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg">
            <span>Total Price</span>
            <span>₹{calculateTotal()}</span>
          </div>
          <button className="mt-6 w-full bg-primary text-white py-2 rounded-lg hover:bg-opacity-90 transition">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
