import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaCheck } from "react-icons/fa";

const AllOrders = () => {
  const [AllOrders, setAllOrders] = useState();
  const [Options, setOptions] = useState(-1);
  const [Value, setValue] = useState({status: ""});
  // const [selectedId, setSelectedId] = useState(null);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:3000/api/v1/get-all-orders", { headers });
      setAllOrders(response.data.data);
    };
    fetchData();
  }, [AllOrders]);

  const change = (e) => {
    setValue({status: e.target.value});
  };

  const submitChange = async (i) => {

    const id = AllOrders[i]._id
    // console.log("Sending:", Value, headers);
    const response =  await axios.put(`http://localhost:3000/api/v1/update-status/${id}`,Value, {headers});
    

    alert(response.data.message)
    
  };

  AllOrders && AllOrders.splice(AllOrders.length - 1,1)

  if (!AllOrders) {
    return <div className="flex items-center justify-center text-white px-4 py-8">Loading...</div>;
  }

  return (
    <>
      {AllOrders && AllOrders.book < 0 && (
        <div className='h-full bg-zinc-800 flex items-center justify-center'>
          <h1 className='font-semibold text-2xl md:text-6xl text-center'>No Book data</h1>
        </div>
      )}

      {AllOrders && AllOrders.length > 0 && (
        <div className='h-full p-2 md:p-4 text-zinc-100'>
          <h1 className='text-2xl md:text-5xl font-semibold text-zinc-500 mb-4 md:mb-8'>
            Your Order History
          </h1>

          <div className='overflow-x-auto'>
            <div className='min-w-[600px] bg-zinc-800 rounded py-2 px-4 flex text-sm md:text-base gap-2'>
              <div className='w-[5%] font-semibold'>Sr.</div>
              <div className='w-[25%] font-semibold'>Books</div>
              <div className='w-[40%] font-semibold'>Description</div>
              <div className='w-[10%] font-semibold'>Price</div>
              <div className='w-[20%] font-semibold'>Status</div>
            </div>

            {AllOrders.map((items, i) => (
              <div
                key={i}
                className='min-w-[600px] bg-zinc-800 rounded py-2 px-4 mt-2 hover:bg-zinc-900 transition-all flex text-sm md:text-base gap-2'
              >
                <div className='w-[5%] text-center'>{i + 1}.</div>
                <div className='w-[25%] truncate'>
                  <Link to={`/view-book-detail/${items.book._id}`} className="hover:text-blue-300">
                    {items.book.title}
                  </Link>
                </div>
                <div className='w-[40%] truncate'>
                  {items.book.desc.slice(0, 50)} ...
                </div>
                <div className='w-[10%]'>{items.book.price}</div>
                <div className='w-[20%]'>
                  <button
                    className='hover:scale-105 transition-all duration-300'
                    onClick={() => {
                      setOptions(i);
                      setValue({status:items.status});
                      // setSelectedId(items._id); 
                    }}
                  >
                    <h1
                      className={`font-semibold ${
                        items.status === "Order Placed"
                          ? "text-green-500"
                          : items.status === "Cancelled"
                          ? "text-red-500"
                          : "text-yellow-500"
                      }`}
                    >
                      {items.status}
                    </h1>
                  </button>
                  <div className={`${Options === i ? "flex" : "hidden"} mt-1 items-center gap-2`}>
                    <select
                      name="status"
                      onChange={change}
                      value={Value.status}
                      className='bg-gray-800 text-sm rounded px-1 py-0.5'
                    >
                      {["Order Placed", "Out for delivery", "Delivered", "Cancelled"].map((statusOption, j) => (
                        <option value={statusOption} key={j}>
                          {statusOption}
                        </option>
                      ))}
                    </select>
                    <button  onClick={()=>{
                      setOptions(-1);
                      submitChange(i);
                      }}
                       className='text-green-500 hover:text-pink-600'>
                      <FaCheck />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default AllOrders;
