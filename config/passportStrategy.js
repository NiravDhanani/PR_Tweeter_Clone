const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const SignupModel = require("../model/signupmodel");
const bcrypt = require("bcrypt");

passport.use(
    new passportLocal(
      {
        usernameField: "email",
      },
      async (email, password, done) => {
        try {
          const user = await SignupModel.findOne({ email : email });
  
          if (!user) {
            console.log(`User not found`);
            return done(null, false);
          }
  
          const passwordMatch = await bcrypt.compare(password, user.password);
  
          if (!passwordMatch) {
            console.log(`Password is not a match`);
            return done(null, false);
          }
          if(passwordMatch){
            console.log(`Login...`);
            return done(null, user);
          }
          
        } catch (err) {
          console.error(err);
          return done(null, false);
        }
      }
    )
  );
  
  

passport.serializeUser((user, done) => {
  return done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    let user = await SignupModel.findById(id);
    return done(null, user);
  } catch (err) {
    return done(null, false);
  }
});

passport.setUser=(req, res, next)=>{
    if(req.isAuthenticated()){
        res.locals.users = req.user;
    }
    return next();
}
passport.chekUser=(req, res, next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/')
}

module.exports=passport;
