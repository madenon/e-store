import validator from "validator";
import jwt from "jsonwebtoken"
import  bcrypt  from  "bcryptjs";
import userModel from "../models/userModel.js";




const createToken = (id) =>{
    return  jwt.sign({id},process.env.JWT_SECRET)
}
// le chemin de la connexion
const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body

        const user = await userModel.findOne({email});
        if(!user){
            res.json({success:false, message:"Utilisateur non trouvé"})
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(isMatch){
            const token = createToken(user._id);
            res.json({success:true, token})
        } else{
            res.json({success:false,message:"Invalide"})
        }
        
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
        
    }
};

// le chemin de l 'enregistrement

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // verification si l 'utilisateur existe ou pas
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({
        success: false,
        message:
          "L'email existe déjà veuillez utiliser une autre adresse email",
      });
    }
    // validation de données
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Veuillez foruni une adresse email valide",
      });
    }


    if (password.trim().length < 8) {
        return res.json({
          success: false,
          message: "Mot de passe doit contenir au moins 8 caractères et ne doit pas contenir d'espace vide",
        });
      }

      // Hashing du mot de passe 

      const salt = await bcrypt.genSalt(10)
      const hashePasswordvakide = await bcrypt.hash(password,salt)
      const hashePassword =hashePasswordvakide.trim()
       const newUser = new userModel({
        name,
        email,
        password:hashePassword
       })
       const  user = await newUser.save()
       const token = createToken(user._id)
       res.json({success:true, token})
  } catch (error) {
    console.log(error)
    res.json({success:false, message:error.message})
  }
};

// l adminstrateur connexion

const adminLogin = async (req, res) => {

  try {
    const{email, password} = req.body

    if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
          const token = jwt.sign(email+password, process.env.JWT_SECRET)
          res.json({success:true, token})
    } else{
      res.json({success:false, message:"connexion impossible"})
    }
  } catch (error) {
    console.log(error)
    res.json({success:false, message:error.message})
  }
};
export { loginUser, registerUser, adminLogin };
