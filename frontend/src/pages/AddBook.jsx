import axios from 'axios';
import React, { useState,useEffect } from 'react'

const AddBook = () => {
    const [Data , setData] = useState({
        url: "",
        title: "",
        author: "",
        price: "",
        desc: "",
        language: ""
    })
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`
    };
    const change =(e)=>{
        const {name, value} = e.target
        setData({...Data, [name]: value})
    };
    
    const submit = async ()=>{
        try{
             if(Data.url === "" ||
                Data.title === "" ||
                Data.author === "" ||
                Data.price === "" ||
                Data.desc === "" ||
                Data.language === "" 
              )
              {
                alert("all fields are required")
              }
              else {
                const response = await axios.post("http://localhost:3000/api/v1/add-book",Data,{headers});
                setData({
                    url: "",
                    title: "",
                    author: "",
                    price: "",
                    desc: "",
                    language: ""
                });
                alert(response.data.message)
              }
             
        }catch (error){
         alert(error.response.data.message)
        }
    }
  return (
    <div className=" mx-auto p-6 bg-zinc-800 shadow rounded my-4 md:my-0">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Book</h2>
      <form onSubmit={submit} className="space-y-4">
        <input
          type="text"
          name="url"
          placeholder="Image URL"
          value={Data.url}
          onChange={change}
          className="w-full p-2 border rounded bg-zinc-900"
        />
        <input
          type="text"
          name="title"
          placeholder="Book Title"
          value={Data.title}
          onChange={change}
          className="w-full p-2 border rounded bg-zinc-900"
        />
        <div className='flex flex-col gap-4 md:flex-row  md:gap-10'>
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={Data.author}
          onChange={change}
          className="w-full p-2 border rounded bg-zinc-900"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={Data.price}
          onChange={change}
          className="w-full p-2 border rounded bg-zinc-900"
        />
        </div>
        <textarea
          name="desc"
          placeholder="Description"
          value={Data.desc}
          onChange={change}
          className="w-full p-2 border rounded bg-zinc-900"
        ></textarea>
        <input
          type="text"
          name="language"
          placeholder="Language"
          value={Data.language}
          onChange={change}
          className="w-full p-2 border rounded bg-zinc-900"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Add Book
        </button>
      </form>
    </div>
  );
};
 

export default AddBook
