import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import Login from "./Login";

const PlaceOrder = () => {
  const { navigate, backendUrl, cartItems, token,getCartAmount , setCartItems, delivery_fee, products } = useContext(ShopContext);
  const [method, setMethod] = useState("cash");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    rue: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
    pointrelaix: "",
  });

  const onChangeHandler = (event)=>{
    const name= event.target.name
    const value = event.target.value

    setFormData(data=>({...data,[name]:value}))
  }

  const onSubmitHanlder =async (event) =>{
 event.preventDefault()
 try {
  let orderItems = []
  for(const items in cartItems){
    for(const item in cartItems[items]){
      if(cartItems[items][item]> 0){
         const itemInfo = structuredClone(products.find(product =>product?._id===items));
         if(itemInfo){
          itemInfo.size = item;
          itemInfo.quantity=cartItems[items][item]
          orderItems.push(itemInfo)
         }
      }

    }
  }
let orderData = {
  address: formData,
  items:orderItems,
  amount:getCartAmount() + delivery_fee

}
switch(method){
 // Api de payemt en cahs 
 case 'cash':
  const response = await axios.post(backendUrl + "/api/order/place",orderData,{headers:{token}})
   if(response.data.success){
    setCartItems({})
    navigate("/orders")
   } else{
    console.log(error)
    toast.error(response.data.message)
   }
 break;

 case 'stripe':
   const responseStripe = await axios.post(backendUrl + "/api/order/stripe", orderData, {headers:{token}})
  if(responseStripe.data.success){
    const {session_url} = responseStripe.data 
    window.location.replace(session_url)
  } else{
    toast.error(responseStripe.data.message)
  }
   break;

 default :
 break;
}


} catch (error) {
  console.log(error)
  toast.error(error.message)
 }

  }
  return (!token  ?  <Login /> :
    <form onSubmit={onSubmitHanlder}
    className="flex flex-col sm:flex-row justify-between gap-4
  pt-5 sm:pt-5 sm:min-h-14 min-h-[80vh] border-t"
  >
    {/* ----------------  Lef Side ---- */}
    <div className="flex flex-col gap-4 w-full sm:max-w-[400px]">
      <div className="text-xl sm:text-xl my-3">
        <Title text1={"Infromation Sur"} text2={"La livraison"} />
      </div>

      <p className="text-center  text-slate-400 font-semibold   justify-center ">
        Nom et prénom  <span className="w-1 text-red-500 text-2xl font-bold">*</span>
      </p>
      <div className="flex gap-3">
        <input onChange={onChangeHandler} value={formData.firstName} name="firstName"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Votre nom"
          required
        />
        <input
        onChange={onChangeHandler} value={formData.lastName} name="lastName"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Votre prénom"
          required
        />
      </div>
      <p className="text-center  text-slate-400 font-semibold  justify-center">
        Email <span className="w-1 text-red-500 text-2xl font-bold">*</span>
      </p>
      <input
      onChange={onChangeHandler} value={formData.email} name="email"
        type="email"
        className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        placeholder="votre email"
        required
      />
      <p className="text-center  text-slate-400 font-semibold  justify-center">
        La rue <span className="w-1 text-red-500 text-2xl font-bold">*</span>
      </p>
      <input
      onChange={onChangeHandler} name="rue" value={formData.rue}
        type="text"
        className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        placeholder="La rue"
        required
      />

      <p className="text-center  text-slate-400 font-semibold   justify-center">
        Ville et la commune <span className="w-1 text-red-500 text-2xl font-bold">*</span>
      </p>
      <div className="flex gap-3">
        <input
        onChange={onChangeHandler}  value={formData.city}  name="city"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Ville"
          required
        />
        <input
        onChange={onChangeHandler}  name="state" value={formData.state}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Commune"
          required
        />
      </div>

      <p className="text-center  text-slate-400 font-semibold  justify-center">
        Code postal et pays <span className="w-1 text-red-500 text-2xl font-bold">*</span>
      </p>
      <div className="flex gap-3">
        <input
        onChange={onChangeHandler} value={formData.zipcode}  name="zipcode"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="number"
          placeholder="Code postal"
          required
        />
        <input
        onChange={onChangeHandler} name="country"  value={formData.country}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Pays"
          required
        />
      </div>

      <p className="text-center  text-slate-400 font-semibold  justify-center">
        {" "}
        Votre numéro de téléphone portable  <span className="w-1 text-red-500 text-2xl font-bold">*</span>
      </p>
      <input
      onChange={onChangeHandler} value={formData.phone} name="phone"
        className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        type="text"
        placeholder="Votre numéro"
        required
      />
     
     <p className="text-center  text-slate-400 font-semibold  justify-center">
        {" "}
        Vous pouvez recevoir le colis sur un poit rélais  
      </p>
     
      <input
      onChange={onChangeHandler} value={formData.pointrelaix} name="pointrelaix"
        className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        type="text"
        placeholder="Ecole, lieu plubic, boutique .. "
      />
    </div>
    {/* 88888888888888 cotde droit ---- */}
    <div className="mt-8">
      <div className="mt-8 min-w-80">
        <CartTotal />
      </div>
      <div className="mt-12">
        <Title text1={"Methode de "} text2={"Payyement"} />
        {/*Methode de  Pyament */}
        <div className="flex gap-3 flex-col lg:flex-row">
          <div
            onClick={() => setMethod("stripe")}
            className="flex  items-center gap-3 border p-2 px-3 cursor-pointer"
          >
            <p
              className={`min-w-3.5 h-3.5 border rounded-full  ${
                method === "stripe" ? "bg-green-400" : ""
              }`}
            ></p>
            <img className="h-5 mx-4" src={assets.stripe_logo} alt="" />
          </div>

         
          <div
            onClick={() => setMethod("cash")}
            className="flex  items-center gap-3 border bg-slate-200 p-2 px-3 cursor-pointer"
          >
            <p
              className={`min-w-3.5 h-3.5 border rounded-full  ${
                method === "cash" ? "bg-green-400" : ""
              }`}
            ></p>
            <p className="text-gray-700 text-sm   uppercase font-medium mx-4">
              Payé à la livraison
            </p>
          </div>
        </div>
        <div className=" w-full text-end mt-8">
          <button
            
            className="bg-black text-white uppercase px-16 py-3 text-sm"
          >
            Valider votre commande
          </button>
        </div>
      </div>
    </div>
  </form>
       
  );
};

export default PlaceOrder;
