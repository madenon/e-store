import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios"
import { backendUrl } from "../App";
import { toast } from 'react-toastify';

const Add = ({token}) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Electroniques");
  const [subCategory, setSubCategory] = useState("Autres");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(backendUrl + "/api/product/add",formData,{headers:{token}})
 if(response.data.success){
  toast.success(response.data.message)
  setName("");
  setDescription("");
  setPrice("");
  setImage1(false)
  setImage2(false)
  setImage3(false)
  setImage4(false)

  
 }else{
  toast.error(response.data.message)
 }
    } catch (error) {
      console.log(error)
      toast.error(error.message)

    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-3"
    >
      <div>
        <p className="mb-2">Télécharger une image</p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <img
              className="w-20"
              src={!image1 ? assets.upload_arera : URL.createObjectURL(image1)}
              alt=""
            />
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              id="image1"
              hidden
            />
          </label>
          <label htmlFor="image2">
            <img
              className="w-20"
              src={!image2 ? assets.upload_arera : URL.createObjectURL(image2)}
              alt=""
            />
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              id="image2"
              hidden
            />
          </label>
          <label htmlFor="image3">
            <img
              className="w-20"
              src={!image3 ? assets.upload_arera : URL.createObjectURL(image3)}
              alt=""
            />
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              id="image3"
              hidden
            />
          </label>
          <label htmlFor="image4">
            <img
              className="w-20"
              src={!image4 ? assets.upload_arera : URL.createObjectURL(image4)}
              alt=""
            />
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              id="image4"
              hidden
            />
          </label>
        </div>
      </div>
      <div className="w-full">
        <p className="mb-2">Nom du produit</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="type de produit"
          required
        />
      </div>

      <div className="w-full">
        <p className="mb-2">La description du produit</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="type de produit"
          required
        ></textarea>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
          <div>
            <p className="mb-2">Catégorie produit</p>
            <select
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              className="w-full px-3 py-2"
            >
              <option value="Women">FEMMES</option>
              <option value="Men">HOMMES</option>
              <option value="Kids">ENFANTS</option>
              <option value="Electroniques">ELECTRONIQUES</option>
              <option value="Autres">AUTRES</option>
            </select>
          </div>

          <div>
            <p className="mb-2">Sous Catégorie</p>
            <select
              onChange={(e) => setSubCategory(e.target.value)}
              value={subCategory}
              className="w-full px-3 py-2"
            >
              <option value="Topwear">Vêtements du Hauts</option>
              <option value="Bottomwear"> Vêtements du bas</option>
              <option value="Winterwear"> Vêtements d'hiver</option>
              <option value="Ordinateurs">Odinateurs</option>
              <option value="Telephones">Téléphones</option>
              <option value="Frigos">Refrigérateurs</option>
              <option value="Accessoires">Accessoires</option>
              <option value="Pagnes">Pagne africains</option>
              <option value="Chaussures">Chaussures</option>
              <option value="Parfum">Parfum</option>
              <option value="Montres">Montres Connectée</option>
              <option value="Television">Télévision</option>
              <option value="Casques">Casques</option>
              <option value="Ecouteurs">Ecouteurs</option>
              <option value="Autres">Autres</option>
            </select>
          </div>
          <div>
            <p className="mb-2">Prix du produit</p>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-3 py-2 sm:w-[120px]"
              type="Number"
              placeholder="99876"
            />
          </div>
        </div>

        <div>
          <p className="mb-2">La taille du produit</p>
          <div className="flex flex-wrap gap-3">
            <div
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("S")
                    ? prev.filter((item) => item !== "S")
                    : [...prev, "S"]
                )
              }
            >
              <p
                className={`${
                  sizes.includes("S") ? "bg-pink-100" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
                S
              </p>
            </div>
            <div
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("M")
                    ? prev.filter((item) => item !== "M")
                    : [...prev, "M"]
                )
              }
            >
              <p
                className={`${
                  sizes.includes("M") ? "bg-pink-100" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
                M
              </p>
            </div>

            <div
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("L")
                    ? prev.filter((item) => item !== "L")
                    : [...prev, "L"]
                )
              }
            >
              <p
                className={`${
                  sizes.includes("L") ? "bg-pink-100" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
                L
              </p>
            </div>

            <div
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("XXL")
                    ? prev.filter((item) => item !== "XXL")
                    : [...prev, "XXL"]
                )
              }
            >
              <p
                className={`${
                  sizes.includes("XXL") ? "bg-pink-100" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
                XXL
              </p>
            </div>

            <div
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("Grand")
                    ? prev.filter((item) => item !== "Grand")
                    : [...prev, "Grand"]
                )
              }
            >
              <p
                className={`${
                  sizes.includes("Grand") ? "bg-pink-100" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
                Grand
              </p>
            </div>

            <div
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("Moyen")
                    ? prev.filter((item) => item !== "Moyen")
                    : [...prev, "Moyen"]
                )
              }
            >
              <p
                className={`${
                  sizes.includes("Moyen") ? "bg-pink-100" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
                Moyen
              </p>
            </div>
            <div
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("Petit")
                    ? prev.filter((item) => item !== "Petit")
                    : [...prev, "Petit"]
                )
              }
            >
              <p
                className={`${
                  sizes.includes("Petit") ? "bg-pink-100" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
                Petit
              </p>
            </div>

            <div
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("1M")
                    ? prev.filter((item) => item !== "1M")
                    : [...prev, "1M"]
                )
              }
            >
              <p
                className={`${
                  sizes.includes("1M") ? "bg-pink-100" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
                1M
              </p>
            </div>
            <div
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("2M")
                    ? prev.filter((item) => item !== "2M")
                    : [...prev, "2M"]
                )
              }
            >
              <p
                className={`${
                  sizes.includes("2M") ? "bg-pink-100" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
                2M
              </p>
            </div>

            <div
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("3M")
                    ? prev.filter((item) => item !== "3M")
                    : [...prev, "3M"]
                )
              }
            >
              <p
                className={`${
                  sizes.includes("3M") ? "bg-pink-100" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
                3M
              </p>
            </div>
            <div
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("5M")
                    ? prev.filter((item) => item !== "5M")
                    : [...prev, "5M"]
                )
              }
            >
              <p
                className={`${
                  sizes.includes("5M") ? "bg-pink-100" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
                5M
              </p>
            </div>
            <div
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("10M")
                    ? prev.filter((item) => item !== "10M")
                    : [...prev, "10M"]
                )
              }
            >
              <p
                className={`${
                  sizes.includes("10M") ? "bg-pink-100" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
                10M
              </p>
            </div>
            <div
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("30-32")
                    ? prev.filter((item) => item !== "30-32")
                    : [...prev, "30-32"]
                )
              }
            >
              <p
                className={`${
                  sizes.includes("30-32") ? "bg-pink-100" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
                30-32
              </p>
            </div>

            <div
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("33-34")
                    ? prev.filter((item) => item !== "33-34")
                    : [...prev, "33-34"]
                )
              }
            >
              <p
                className={`${
                  sizes.includes("33-34") ? "bg-pink-100" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
                33-34
              </p>
            </div>
            <div
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("35-36")
                    ? prev.filter((item) => item !== "35-36")
                    : [...prev, "35-36"]
                )
              }
            >
              <p
                className={`${
                  sizes.includes("35-36") ? "bg-pink-100" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
                35-36
              </p>
            </div>
            <div
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("37-38")
                    ? prev.filter((item) => item !== "37-38")
                    : [...prev, "37-38"]
                )
              }
            >
              <p
                className={`${
                  sizes.includes("37-38") ? "bg-pink-100" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
                37-38
              </p>
            </div>

            {/* 32 */}


            <div
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("32 GO")
                    ? prev.filter((item) => item !== "32 GO")
                    : [...prev, "32 GO"]
                )
              }
            >
              <p
                className={`${
                  sizes.includes("32 GO") ? "bg-pink-100" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
                32 GO
              </p>
            </div>

            {/* 64 */}


            <div
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("64 GO")
                    ? prev.filter((item) => item !== "64 GO")
                    : [...prev, "64 GO"]
                )
              }
            >
              <p
                className={`${
                  sizes.includes("64 GO") ? "bg-pink-100" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
                64 GO
              </p>
            </div>
            {/* Giga 128 */}


            <div
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("128 GO")
                    ? prev.filter((item) => item !== "128 GO")
                    : [...prev, "128 GO"]
                )
              }
            >
              <p
                className={`${
                  sizes.includes("128 GO") ? "bg-pink-100" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
                128 GO
              </p>
            </div>


            <div
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("256 GO")
                    ? prev.filter((item) => item !== "256 GO")
                    : [...prev, "256 GO"]
                )
              }
            >
              <p
                className={`${
                  sizes.includes("256 GO") ? "bg-pink-100" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
                256 GO
              </p>
            </div>

            <div
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("1TO")
                    ? prev.filter((item) => item !== "1TO")
                    : [...prev, "1TO"]
                )
              }
            >
              <p
                className={`${
                  sizes.includes("1TO") ? "bg-pink-100" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
                1TO
              </p>
            </div>

            {/* Couleure */}


            <div
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("Noir")
                    ? prev.filter((item) => item !== "Noir")
                    : [...prev, "Noir"]
                )
              }
            >
              <p
                className={`${
                  sizes.includes("Noir") ? "bg-pink-100" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
                Noir
              </p>
            </div>

            <div
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("Rouge")
                    ? prev.filter((item) => item !== "Rouge")
                    : [...prev, "Rouge"]
                )
              }
            >
              <p
                className={`${
                  sizes.includes("Rouge") ? "bg-pink-100" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
                Rouge
              </p>
            </div>

            <div
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("Blanc")
                    ? prev.filter((item) => item !== "Blanc")
                    : [...prev, "Blanc"]
                )
              }
            >
              <p
                className={`${
                  sizes.includes("Blanc") ? "bg-pink-100" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
                Blanc
              </p>
            </div>

            <div
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("Gris")
                    ? prev.filter((item) => item !== "Gris")
                    : [...prev, "Gris"]
                )
              }
            >
              <p
                className={`${
                  sizes.includes("Gris") ? "bg-pink-100" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
              Gris
              </p>
            </div>

            <div
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("Beige")
                    ? prev.filter((item) => item !== "Beige")
                    : [...prev, "Beige"]
                )
              }
            >
              <p
                className={`${
                  sizes.includes("Beige") ? "bg-pink-100" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
              Beige
              </p>
            </div>

            <div
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("Marron")
                    ? prev.filter((item) => item !== "Marron")
                    : [...prev, "BeiMarronge"]
                )
              }
            >
              <p
                className={`${
                  sizes.includes("Marron") ? "bg-pink-100" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
              Marron
              </p>
            </div>

            <div
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("100 Pages")
                    ? prev.filter((item) => item !== "100 Pages")
                    : [...prev, "100 Pages"]
                )
              }
            >
              <p
                className={`${
                  sizes.includes("100 Pages") ? "bg-pink-100" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
               100  pages
              </p>
            </div>
            <div
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("120 Pages")
                    ? prev.filter((item) => item !== "120 Pages")
                    : [...prev, "120 Pages"]
                )
              }
            >
              <p
                className={`${
                  sizes.includes("120 Pages") ? "bg-pink-100" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
               120  pages
              </p>
            </div>

            <div
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("150 Pages")
                    ? prev.filter((item) => item !== "150 Pages")
                    : [...prev, "150 Pages"]
                )
              }
            >
              <p
                className={`${
                  sizes.includes("150 Pages") ? "bg-pink-100" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
               150  pages
              </p>
            </div>
            <div
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("200 Pages")
                    ? prev.filter((item) => item !== "200 Pages")
                    : [...prev, "200 Pages"]
                )
              }
            >
              <p
                className={`${
                  sizes.includes("200 Pages") ? "bg-pink-100" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
               200  pages
              </p>
            </div>


            <div
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("300 Pages")
                    ? prev.filter((item) => item !== "300 Pages")
                    : [...prev, "300 Pages"]
                )
              }
            >
              <p
                className={`${
                  sizes.includes("200 Pages") ? "bg-pink-100" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
               300  pages
              </p>
            </div>
            <div
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("400 Pages")
                    ? prev.filter((item) => item !== "400 Pages")
                    : [...prev, "400 Pages"]
                )
              }
            >
              <p
                className={`${
                  sizes.includes("400 Pages") ? "bg-pink-100" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
               400  pages
              </p>
            </div>

            <div
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("500 Pages")
                    ? prev.filter((item) => item !== "500 Pages")
                    : [...prev, "500 Pages"]
                )
              }
            >
              <p
                className={`${
                  sizes.includes("500 Pages") ? "bg-pink-100" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
               500  pages
              </p>
            </div>


            <div
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("Maths, Pc Seconde C")
                    ? prev.filter((item) => item !== "Maths, Pc Seconde C")
                    : [...prev, "Maths, Pc Seconde C"]
                )
              }
            >
              <p
                className={`${
                  sizes.includes("Maths, Pc Seconde C") ? "bg-pink-100" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
               Top Chrono  Seconde C
              </p>
            </div>



            <div
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("Maths, Pc Première C")
                    ? prev.filter((item) => item !== "Maths, Pc Première C")
                    : [...prev, "Maths, Pc Première C"]
                )
              }
            >
              <p
                className={`${
                  sizes.includes("Maths, Pc Première C") ? "bg-pink-100" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
               Top Chrono  Première C
              </p>
            </div>

            <div
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("Maths, Pc Première D")
                    ? prev.filter((item) => item !== "Maths, Pc Première D")
                    : [...prev, "Maths, Pc Première D"]
                )
              }
            >
              <p
                className={`${
                  sizes.includes("Maths, Pc Première D") ? "bg-pink-100" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
               Top Chrono  Première D
              </p>
            </div>

            <div
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("Maths, Pc Tle D")
                    ? prev.filter((item) => item !== "Maths, Pc Tle D")
                    : [...prev, "Maths, Pc Tle D"]
                )
              }
            >
              <p
                className={`${
                  sizes.includes("Maths, Pc Tle D") ? "bg-pink-100" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
               Top Chrono  Tle D
              </p>
            </div>

            <div
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("Maths, Pc Tle C")
                    ? prev.filter((item) => item !== "Maths, Pc Tle C")
                    : [...prev, "Maths, Pc Tle C"]
                )
              }
            >
              <p
                className={`${
                  sizes.includes("Maths, Pc Tle C") ? "bg-pink-100" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
               Top Chrono  Tle C
              </p>
            </div>


            <div
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("Philo, H-G Tle A")
                    ? prev.filter((item) => item !== "Philo, H-G Tle A")
                    : [...prev, "Philo, H-G Tle A"]
                )
              }
            >
              <p
                className={`${
                  sizes.includes("Philo, H-G Tle A") ? "bg-pink-100" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
               Top Chrono  Tle A
              </p>
            </div>

            
            <div
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("Philo, H-G Première A")
                    ? prev.filter((item) => item !== "Philo, H-G Première A")
                    : [...prev, "Philo, H-G Première A"]
                )
              }
            >
              <p
                className={`${
                  sizes.includes("Philo, H-G Première A") ? "bg-pink-100" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
                Top Chrono Première A
              </p>
            </div>
            <div
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("Math, Pc Ang, Fr 3 ième")
                    ? prev.filter((item) => item !== "Math, Pc Ang, Fr 3 ième")
                    : [...prev, "Math, Pc Ang, Fr 3 ième"]
                )
              }
            >
              <p
                className={`${
                  sizes.includes("Math, Pc Ang, Fr 3 ième") ? "bg-pink-100" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
                Top Chrono 3 ième 
              </p>
            </div>

            <div
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("Maths-info prepa")
                    ? prev.filter((item) => item !== "Maths-info prepa")
                    : [...prev, "Maths-info prepa"]
                )
              }
            >
              <p
                className={`${
                  sizes.includes("Maths-info prepa") ? "bg-pink-100" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
                Prépa sup ,Math-info
              </p>
            </div>
            <div
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("Prépa Economie Première année")
                    ? prev.filter((item) => item !== "Prépa Economie Première année")
                    : [...prev, "Prépa Economie Première année"]
                )
              }
            >
              <p
                className={`${
                  sizes.includes("Prépa Economie Première année") ? "bg-pink-100" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
                Prépa Economie Première année
              </p>
            </div>
            <div
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("Economie Première-Deuxième année")
                    ? prev.filter((item) => item !== "Economie Première-Deuxième année")
                    : [...prev, "Economie Première-Deuxième année"]
                )
              }
            >
              <p
                className={`${
                  sizes.includes("Economie Première-Deuxième année") ? "bg-pink-100" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
               Economie Première-Deuxième année
              </p>
            </div>

            <div
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("Droit des affaires Première-Deuxième")
                    ? prev.filter((item) => item !== "Droit des affaires Première-Deuxième")
                    : [...prev, "Droit des affaires Première-Deuxième"]
                )
              }
            >
              <p
                className={`${
                  sizes.includes("Droit des affaires Première-Deuxième") ? "bg-pink-100" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
               Droit des affaires Première-Deuxième 
              </p>
            </div>


          
            <div
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("39-40")
                    ? prev.filter((item) => item !== "39-40")
                    : [...prev, "39-40"]
                )
              }
            >
              <p
                className={`${
                  sizes.includes("39-40") ? "bg-pink-100" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
                39-40
              </p>
            </div>
            <div
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("41-42")
                    ? prev.filter((item) => item !== "41-42")
                    : [...prev, "41-42"]
                )
              }
            >
              <p
                className={`${
                  sizes.includes("41-42") ? "bg-pink-100" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
                41-42
              </p>
            </div>
            <div
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("43-44")
                    ? prev.filter((item) => item !== "43-44")
                    : [...prev, "43-44"]
                )
              }
            >
              <p
                className={`${
                  sizes.includes("43-44") ? "bg-pink-100" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
                43-44
              </p>
            </div>
            <div
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("Autre")
                    ? prev.filter((item) => item !== "Autre")
                    : [...prev, "Autre"]
                )
              }
            >
              <p
                className={`${
                  sizes.includes("Autre") ? "bg-pink-100" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
                Autre
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <input
          onChange={() => setBestseller((prev) => !prev)}
          checked={bestseller}
          type="checkbox"
          id="bestseller"
        />
        <label className="cursor-pointer uppercase" htmlFor="bestseller">
          Ajouter comme meilleure vente
        </label>
      </div>

      <button className="w-28 py-3 mt-4 bg-black text-white" type="submit">
        AJOUTER
      </button>
    </form>
  );
};

export default Add;
