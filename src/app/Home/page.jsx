"use client";

import Product from "../Product";
import { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { RiShoppingBag3Fill } from "react-icons/ri";
import { BsSliders } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import useCartStore from '../Store/cartStore';

export default function Home() {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const totalQuantity = useCartStore((state) => state.totalQuantity());
    const uniqueItemCount = useCartStore((state) => state.uniqueItemCount());

    return (
        <section className="w-full flex justify-center items-center">
            <div className="bg-white text-purple-700 font-sans min-h-screen w-1/2">
                <header className="p-6 flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-center w-full">ADA SHOP</h1>
                </header>

                <div className="flex justify-start my-4 space-x-2">
                    <button
                        onClick={() => navigate("/cart")}
                        className="bg-gray-200 text-purple-600 px-4 py-2 rounded-md flex items-center space-x-2 hover:text-white hover:bg-purple-600 transition duration-300 relative"
                    >
                        <FiShoppingCart className="w-5 h-5" />
                        <span className="absolute top-2 left-5 w-4 h-4 text-sm flex justify-center items-center bg-[#ff38d4] text-purple-600 rounded ">
                            {uniqueItemCount}
                        </span>
                        <span>سبد خرید</span>
                    </button>
                    <button className="bg-purple-600 text-white px-4 py-2 rounded-md flex items-center space-x-2">
                        <RiShoppingBag3Fill className="w-5 h-5" />
                        <span>محصولات</span>
                    </button>
                    
                </div>

                <div className="flex justify-start mt-4">
                    <div className="relative w-full">
                        <input
                            type="text"
                            className="w-full p-3 border-2 border-purple-500 rounded-md focus:outline-none text-right bg-[#fff4fe]"
                            placeholder="...جستجو کنید"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <RiShoppingBag3Fill className="absolute left-3 top-3 text-purple-600 w-6 h-6" />
                    </div>
                </div>

                <div className="flex justify-between items-center w-full mx-auto mt-4">
                    <div className="flex justify-start items-center">
                        <button className="flex items-center space-x-1 border border-purple-600 text-purple-600 px-4 py-1 rounded-md hover:text-white hover:bg-purple-600 transition duration-300">
                            <BsSliders className="w-5 h-5" />
                            <span>فیلتر ها</span>
                        </button>
                    </div>
                    <div className="flex justify-end items-center">
                        <h3 className="text-center text-purple-600">محصول در سبد خرید شما قرار دارد</h3>
                        <span className="ml-2">{totalQuantity}</span>

                    </div>
                </div>

                <Product searchTerm={searchTerm} />
            </div>
        </section>
    );
}
