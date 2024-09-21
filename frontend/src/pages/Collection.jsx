import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products,search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [sortType, setSortType] = useState("relavent")


const toggleCategory = (e) =>{
  if(category.includes(e.target.value)){
    setCategory(prev=>prev.filter(item=>item !==e.target.value))

  }
  else{
    setCategory(prev=>[...prev, e.target.value])
  }
}
  const toggleSubCategory = (e)=>{
    if(subCategory.includes(e.target.value)){
      setSubCategory(prev=>prev.filter(item=>item !==e.target.value))
    }
    else{
      setSubCategory(prev=>[...prev, e.target.value])
    }
  }

  const  applyFilter = () =>{
    let  productsCopy = products.slice()
    if(showSearch && search){
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))

    }
    if(category.length > 0){
      productsCopy = productsCopy.filter(item=> category.includes(item.category))

    }
    if(subCategory.length > 0){
      productsCopy= productsCopy.filter(item =>subCategory.includes(item.subCategory))
    }
    setFilterProducts(productsCopy)
  }
  const sortProduct = () =>{
 let fpCopy  = filterProducts.slice();
 switch(sortType){
   case 'low-high':
    setFilterProducts(fpCopy.sort((a,b)=>(a.price - b.price)));
    break;

    case 'high-low':
    setFilterProducts(fpCopy.sort((a,b)=>(b.price - a.price)));
    break
  
   default:
    applyFilter()
    break;
 }
  }
 
  useEffect(()=>{
  applyFilter();
  },[category, subCategory, search, showSearch, products])


  useEffect(()=>{
    sortProduct();
    },[sortType])
  


  return (
    <div className="flex flex-col  sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter options */}
      <div className="max-w-52">
        <div className="flex items-center text-center gap-3">
          <p
            onClick={() => setShowFilter(!showFilter)}
            className="my-2 text-xl flex items-center cursor-pointer gap-2"
          >
            Filtrer
          </p>
          <img
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
            alt=""
          />
        </div>
        {/* Categorie filtrer */}

        <div
          className={`border shadow border-r-2 bg-black/10 border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium uppercase">Catégorie</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input className="w-3 cursor-pointer" value={"Men"}  onChange={toggleCategory} type="checkbox" />
              HOMMES
            </p>
            <p className="flex gap-2">
              <input className="w-3 cursor-pointer" value={"Women"} onChange={toggleCategory}  type="checkbox" />
              FEMMES
            </p>
            <p className="flex gap-2">
              <input className="w-3 cursor-pointer" value={"Kids"} onChange={toggleCategory}  type="checkbox" />
              ENFANTS
            </p>
            <p className="flex gap-2">
              <input className="w-3 cursor-pointer" value={"Electroniques"} onChange={toggleCategory}  type="checkbox" />
              Electroniques
            </p>

            {/*               <option value="Electroniques">ELECTRONIQUES</option>
 */}
            <p className="flex gap-2">
              <input className="w-3 cursor-pointer" value={"Autres"} onChange={toggleCategory}  type="checkbox" />
              AUTRES
            </p>

          </div>
        </div>
        {/* SubCategory filter */}
        <div
          className={`border shadow border-r-2 bg-black/10 border-gray-300 pl-5 py-3 my-5 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium uppercase">Sous Catégorie</p>
          <div className="flex flex-col gap-2   text-sm font-light text-gray-700">
            <p className="flex gap-2 uppercase">
              <input className="w-3 cursor-pointer" value={"Topwear"} type="checkbox"  onChange={toggleSubCategory} />
              Vêtements du Hauts
            </p>
            <p className="flex gap-2 uppercase">
              <input className="w-3 cursor-pointer" value={"Bottomwear"} type="checkbox"  onChange={toggleSubCategory}/>
              Vêtements du bas
            </p>
            <p className="flex gap-2 uppercase">
              <input className="w-3 cursor-pointer" value={"Winterwear"} type="checkbox" onChange={toggleSubCategory} />
              Vêtements d'hiver
            </p>
            <p className="flex gap-2 uppercase">
              <input className="w-3  cursor-pointer" value={"Parfum"} type="checkbox" onChange={toggleSubCategory} />
              Parfums
            </p>
            <p className="flex gap-2 uppercase">
              <input className="w-3" value={"Chaussures"} type="checkbox" onChange={toggleSubCategory} />
              Chaussures
            </p>
            <p className="flex gap-2 uppercase">
              <input className="w-3  cursor-pointer" value={"Accessoires"} type="checkbox" onChange={toggleSubCategory}/>
              Accesssoirs
            </p>
            <p className="flex gap-2 uppercase">
              <input className="w-3  cursor-pointer" value={"Television"} type="checkbox" onChange={toggleSubCategory}/>
              Télévision
            </p>
            <p className="flex gap-2 uppercase">
              <input className="w-3  cursor-pointer" value={"Ordinateurs"} type="checkbox"onChange={toggleSubCategory} />
               Ordinateurs
            </p>
            <p className="flex gap-2 uppercase">
              <input className="w-3  cursor-pointer " value={"Telephones"} type="checkbox" onChange={toggleSubCategory}/>
              Téléphones
            </p>
            <p className="flex gap-2 uppercase">
              <input className="w-3  cursor-pointer " value={"Montres"} type="checkbox" onChange={toggleSubCategory}/>
              Montres connectées
            </p>
            <p className="flex gap-2 uppercase">
              <input className="w-3  cursor-pointer " value={"Pagnes"} type="checkbox" onChange={toggleSubCategory}/>
              Pagnes africains 
            </p>
            <p className="flex gap-2 uppercase">
              <input className="w-3  cursor-pointer " value={"Frigos"} type="checkbox" onChange={toggleSubCategory}/>
             Réfrigérateur
            </p>
            
            <p className="flex gap-2 uppercase">
              <input className="w-3 cursor-pointer" value={"Autres"} type="checkbox" onChange={toggleSubCategory}/>
              Autres
            </p>

           
          </div>
        </div>
      </div>
      {/* Cote droit */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4 ">
          <Title text1={"Toute"} text2={"COLLECTIONS"} />
          {/* Trier les produits */}
          <select onChange={(e)=>setSortType(e.target.value)} className="border-2 border-gray-300 text-sm px-2  shadow border-r-2 bg-black/10 pl-5 py-3 my-5">
            <option  value="relavent">Pertinente</option>
            <option value="low-high">Prix du plus pétit au plus élevé</option>
            <option value="high-low">Prix du plus haut au plus bas</option>
          </select>
        </div>

        {/* MAp les produit */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 gap-y-5">
          {filterProducts.map((item, index) => (
            <ProductItem key={index} 
             name={item.name} id={item._id} price={item.price}
             image={item.image}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
