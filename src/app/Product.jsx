"use client"
import { useState, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import Show from "./Show";

export default function Product({ searchTerm }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [numProducts, setNumProducts] = useState(4);
  const [buttonLoad, setButtonLoad] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((req) => setData(req));
  }, []);

  useEffect(() => {
    const filtered = data.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchTerm, data]);

  const loadMore = () => {
    setNumProducts(numProducts + 4);
    if (numProducts >= filteredData.length) {
      setButtonLoad(false);
    }
  };

  return (
    <section className="bg-[#fff] pb-36 pt-6 w-full">
      <div className="pb-9 px-3.5 mx-auto">
        <Show products={filteredData.slice(0, numProducts)} />
      </div>
      {buttonLoad && numProducts < filteredData.length && (
        <div className="w-full flex justify-center items-center pt-11 ">
          <div
            onClick={loadMore}
            className={`font-bold pt-7 text-purple-600 text-[15px] leading-6 uppercase flex justify-center items-center transition-all duration-[0.4s] px-12 py-2.5 cursor-pointer`}
          >
            <IoIosArrowDown /> مشاهده بیشتر
          </div>
        </div>
      )}
    </section>
  );
}
