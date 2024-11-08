import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { Card } from "@mui/material";
import Piechart from "../components/Charts/Piechart";
import Linechart from "../components/Charts/Linechart";
import Linechart1 from "../components/Charts/Linecharts1";

const Dashboard = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [data, setData] = useState(null);
  const [products, setProducts] = useState(null);
  const [listitem, setListItem] = useState("");
  const [listdata, setListData] = useState(null);
  const [category, setCategory] = useState("");

  useEffect(() => {
    const fetch = async (retries = 5, delay = 2000) => {
      try {
        const response = await axios.get(
          `https://newkartbackend-1.onrender.com/analytics/data?sellerId=${currentUser._id}`
        );
        setData(response.data.orders);
        setProducts(response.data.products);
      } catch (error) {
        console.log(error);
        if (retries > 0) {
          setTimeout(() => fetch(retries - 1, delay), delay);
        }
      }
    };
    fetch();
  }, [currentUser._id]);

  const categories = products
    ? products.reduce((acc, product) => {
        const { category } = product;
        if (!acc[category]) acc[category] = [];
        acc[category].push(product);
        return acc;
      }, {})
    : {};

  const categoryCount = {};
  let totalsales = 0;

  data &&
    data.forEach((order) => {
      order.products.forEach((product) => {
        totalsales += product.productPrice;
        const category = product.category || "Laptop";
        categoryCount[category] = (categoryCount[category] || 0) + 1;
      });
    });

  const categoryvalues = Object.values(categoryCount);

  return (
    <>
      <div className="mt-16  flex p-3 text-white text-lg  items-center  justify-around gap-3  rounded-md pt-7">
        {["Mobile", "Laptop", "Tablet", "Television"].map((type) => (
          <div
            key={type}
            className=" object-contain flex items-center hover:bg-slate-700 justify-center bg-gray-400  md:p-2 rounded-md"
          >
            <button
              onClick={() => {
                setListItem((prev) => (prev === type ? "" : type));
                setListData(categories[type]);
              }}
              className="flex"
            >
              <p className="lg:text-lg md:text-base sm:text-sm  p-1 text-xs">{`${type} Inventory`}</p>
              <ExpandLessIcon
                style={{
                  transform:
                    listitem === type ? "rotate(0deg)" : "rotate(180deg)",
                  transition: "transform 0.3s ease",
                }}
                className=" mt-1"
              />
            </button>
          </div>
        ))}
      </div>
      <div className="p-6  min-h-screen">
        {/* Inventory List */}
        <div className="flex flex-col  gap-3">
          {listdata &&
            listitem &&
            listdata.map((item) => (
              <div key={item._id} className="flex h-36">
                <Card
                  elevation={1}
                  className="flex flex-row items-center w-1/2 border border-gray-700 p-4 gap-4"
                >
                  <div className="w-[40%] h-full">
                    <img
                      src={item.images[0]}
                      alt=""
                      className="w-full h-full object-contain p-1"
                    />
                  </div>
                  <div>
                    <p className="font-medium">Name: {item.name}</p>
                    <p className="text-lg font-bold text-red-700">
                      Stock Remaining: {item.stock}
                    </p>
                  </div>
                </Card>
              </div>
            ))}
        </div>

        <div className="flex sm:p-4 p-2  flex-col lg:flex-row justify-around gap-3 items-start ">
          {/* Total Sales (Pie Chart) */}
          <div className="w-full lg:w-1/2 p-4 bg-white rounded-lg shadow-xl">
            <h2 className="text-md pb-3 font-medium text-gray-600">
              Total Sales
            </h2>
            <div className="flex justify-center items-center h-72 sm:h-96">
              <Piechart data={categoryvalues} />
            </div>
          </div>

          {/* Sales Performance (Line Chart) */}
          <div className="w-full lg:w-1/2 p-4 bg-white rounded-lg shadow-xl">
            <h2 className="text-md pb-3 font-medium text-gray-600">
              Sales Performance
            </h2>
            <div className="h-72 sm:h-96  w-full">
              <Linechart data={data} />
            </div>
          </div>
        </div>

        {/* Category Selector and Linechart */}
        <div className="flex sm:p-4 p-2  flex-col lg:flex-row justify-between gap-3 items-center ">
          {/* Sales per Category */}
          <div className="w-full  lg:w-1/2 flex flex-col items-start bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-center mb-2">
              Sales per Category
            </h2>

            <select
              className="border border-gray-300 rounded-md p-2 mb-4 w-full"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              <option value="">Choose category</option>
              <option value="Mobile">Mobile</option>
              <option value="Laptop">Laptop</option>
              <option value="Tablet">Tablet</option>
              <option value="Television">Television</option>
            </select>

            {/* Pass category and data props to the Linechart1 component */}
            <div className="flex justify-center items-center w-full h-72 sm:h-96">
              <Linechart1 category={category} data={data} />
            </div>
          </div>

          {/* Total Business */}
          <div className=" w-1/2 flex items-center justify-center sm:h-96 ">
            <div className="w-full lg:w-1/2 flex flex-col h-1/3 items-center justify-center bg-white  p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-2 ">Total Business</h2>
              <p className="text-2xl text-green-700 font-bold">
                ₹{' '}{totalsales} Rupees
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
