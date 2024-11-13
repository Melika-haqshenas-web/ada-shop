"use client"
import React, { useState } from 'react';
import Image from "next/image";
import useCartStore from '../Store/cartStore';
import { useNavigate } from "react-router-dom";

import { FiShoppingCart } from "react-icons/fi";
import { RiShoppingBag3Fill } from "react-icons/ri";
import { FaWallet } from "react-icons/fa6";

import { FcCheckmark } from "react-icons/fc";
import { IoMdClose } from "react-icons/io";

export default function Cart() {
    const navigate = useNavigate();
    const { cart, increment, decrement } = useCartStore();
    const totalQuantity = useCartStore((state) => state.totalQuantity());
    const uniqueItemCount = useCartStore((state) => state.uniqueItemCount());
    const totalPrice = useCartStore((state) => state.totalPrice());

    const [message, setMessage] = useState(null);

    const handleCheckout = () => {
        if (totalQuantity === 0) {
            setMessage("سبد خرید خالی است، لطفا محصولی اضافه کنید.");
            setTimeout(() => {
                setMessage(null);
            }, 3000);
            return; 
        }
    
        const isSuccess = Math.random() < 0.5;
        const newMessage = isSuccess ? "پرداخت با موفقیت انجام شد" : "پرداخت با خطا مواجه شد";
        setMessage(newMessage);
        setTimeout(() => {
            setMessage(null);
        }, 3000);
    };

    return (
        <section className="w-full flex justify-center items-center">
            <div className="bg-white text-purple-700 font-sans min-h-screen w-1/2">
                <header className="p-6 flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-center w-full">ADA SHOP</h1>
                </header>

                <div className="flex justify-start my-4 space-x-2">
                    <button className="bg-purple-600 text-white px-4 py-2 rounded-md flex items-center space-x-2 relative">
                        <FiShoppingCart className="w-5 h-5" />
                        <span className="absolute top-2 left-5 w-4 h-4 text-sm flex justify-center items-center bg-[#ff38d4] text-purple-600 rounded ">
                            {uniqueItemCount}
                        </span>
                        <span>سبد خرید</span>
                    </button>
                    <button
                        onClick={() => navigate("/")}
                        className="bg-gray-200 text-purple-600 px-4 py-2 rounded-md flex items-center space-x-2 hover:text-white hover:bg-purple-600 transition duration-300"
                    >
                        <RiShoppingBag3Fill className="w-5 h-5" />
                        <span>محصولات</span>
                    </button>
                </div>

                <div className="w-full">
                    {Object.values(cart).map((item) => (
                        <div key={item.id} className="flex justify-between items-center my-2 space-x-2 border border-purple-700 w-full p-4" style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)", borderRadius: "8px" }}>
                            <div className="w-1/3 flex justify-start items-center flex-wrap">
                                <p className="text-lg w-full pl-5 my-2">${item.price * item.quantity}</p>
                                <div className="flex justify-center items-center space-x-2">
                                    <button onClick={() => decrement(item.id)} className="bg-gray-200 px-3 py-1 hover:text-white hover:bg-purple-600 transition duration-300">-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => increment(item.id)} className="bg-gray-200 px-3 py-1 hover:text-white hover:bg-purple-600 transition duration-300">+</button>
                                </div>
                            </div>

                            <div className="w-1/3 flex justify-end items-center flex-col">
                                <h2 className="text-lg font-semibold w-full text-end">{item.title}</h2>
                                <p className="text-gray-500 w-full text-end">${item.price}</p>
                            </div>

                            <div className="w-1/3 flex justify-end items-center">
                                <Image src={item.image} width={100} height={100} alt={item.title} className="object-cover" />
                            </div>
                        </div>
                    ))}
                </div>
                {message && (

                    <section className={`bottom-0 left-0 h-28 z-50 fixed m-8 p-6 flex justify-center items-center flex-nowrap bg-white shadow-[0_1px_5px_0px_rgba(0,0,0,0.2)] rounded-2xl overflow-hidden`}>
                        <div className={`w-28 h-28  ${message.includes("موفقیت") ? "bg-emerald-50" : "bg-red-200"} rounded-full absolute -left-14 -bottom-1 flex justify-end items-center pr-3`}>
                            {message.includes("موفقیت") ? (
                                <FcCheckmark className="text-4xl" />

                            ) : (
                            <IoMdClose className='text-4xl text-red-600' />
                            )}
                        </div>
                        <div className={`pl-10`}>
                            <h2>{message}</h2>
                        </div>
                        <div className={` absolute bottom-0 left-0 ${message.includes("موفقیت") ? "bg-green-500" : "bg-red-500"} transition duration-500 h-1 rounded-2xl`}></div>
                    </section>
                )}

                <footer className="sticky bottom-0 p-4 bg-white shadow-lg border-t border-gray-200 mb-3">
                    <div className="flex justify-between items-center">
                        <button onClick={handleCheckout} className="bg-purple-600 text-white px-4 py-2 rounded-md flex justify-around items-center">
                            <FaWallet />
                            <span className="ml-7 text-nowrap"> تکمیل و پرداخت</span>
                        </button>
                        <div className="flex justify-end items-center flex-wrap">
                            <span className="text-[#ff38d4] text-base w-full text-end">{`تکمیل و ادامه فرایند پرداخت ${totalQuantity} کالا از ${uniqueItemCount} محصول انتخاب شده`}</span>
                            <span className="text-purple-600 w-full text-end">{`مبلغ پرداخت سفارش $ ${totalPrice}`}</span>
                        </div>
                    </div>
                </footer>
            </div>
        </section>
    );
}
