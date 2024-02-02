const SignupModel = require("../model/signupmodel");
const bcrypt = require("bcrypt");

const indexpage = async (req, res) => {
    if(res.locals.users){
        return res.redirect('/home')
    }
  return res.render("Login");
};

const addUser = async (req, res) => {
  try {
    let usercode = Math.floor(Math.random() * 100);
    const {name, f_name, l_name, email, phone, password } = req.body;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    let Add = await SignupModel.create({
      f_name,l_name,
      name : `${f_name} ${l_name}`,
      email,
      phone,
      profile: req.file.path,
      password: hashedPassword,
      username: `${usercode}@${f_name}`,
    });
    if (Add) {
      console.log(`User Registered`);
      return res.redirect("/");
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};


const logOut = (req, res) => {
  req.logout((err) => {
      if (err) {
          console.log(err);
          return false;
      }
      return res.redirect('/');
  });
};


module.exports = {
  indexpage,
  addUser,
  logOut,
};
