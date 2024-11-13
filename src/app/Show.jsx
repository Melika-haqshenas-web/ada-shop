
"use client";
import React from 'react';
import Image from "next/image";
import { FiShoppingCart } from "react-icons/fi";
import useCartStore from './Store/cartStore';



export default function Show({ products }) {
    const { cart, addToCart, increment, decrement } = useCartStore();

    return (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((val) => (
                <div className="flex flex-col items-center p-4 rounded-lg" key={val.id}>
                    <div className="w-full h-[300px] flex justify-center items-center">
                        <Image src={val.image} width={200} height={200} alt="product" className="object-cover" />
                    </div>
                    <div className="w-full flex flex-col items-start mt-4">
                        <h2 className="text-lg font-semibold">{val.title}</h2>
                        <span className={`text-sm tracking-wider block pt-2 text-[#be44b4]`}>
                            ${val.price}
                        </span>
                    </div>
                    {cart[val.id] ? (
                        <div className="flex items-center justify-around w-full py-2 mt-auto">
                            <button className="bg-gray-200 px-3 py-1 hover:text-white hover:bg-purple-600 transition duration-300" onClick={() => decrement(val.id)}>-</button>
                            <span className="px-4">{cart[val.id].quantity}</span>
                            <button className="bg-gray-200 px-3 py-1 hover:text-white hover:bg-purple-600 transition duration-300" onClick={() => increment(val.id)}>+</button>
                        </div>
                    ) : (
                        <button onClick={() => addToCart(val)} className="flex items-center justify-around w-full bg-gray-100 py-2 mt-auto hover:text-white hover:bg-purple-600 transition duration-300">
                            <FiShoppingCart /> خرید محصول
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
}
