//Authentication

const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const Stripe = require("stripe");
const { default: axios } = require("axios");
const stripe = Stripe(process.env.STRIPE_KEY);
const { verify } = require("../verifyToken");

//REGISTER - Dar de alta a un usuario
router.post("/signup", async (req, res) => {
  let stripeCustomer;
  const userEmail = req.body.email.toLowerCase();
  const userName = req.body.username.toLowerCase();

  //Generamos su id de stripe llamando a su api
  const userEmailVerification = await User.find({ email: userEmail });
  //Verificar si el email existe en BD
  if (userEmailVerification.length > 0) {
    res.status(500).json("El e-mail ya se encuentra registrado");
  } else {
    //Verificar si el username existe en BD
    const userUsernameVerification = await User.find({
      username: userName,
    });

    if (userUsernameVerification.length > 0) {
      res.status(500).json("El nombre de usuario ya se encuentra registrado");
    } else {
      //A partir de aquí ya se ha verificado si existe o no el usuario y el email
      //Ahora se procede a crear el usuario en stripe
      try {
        stripeCustomer = await stripe.customers.create(
          {
            email: userEmail,
          },
          {
            apiKey: process.env.STRIPE_KEY,
          }
        );
      } catch (err) {
        res
          .status(500)
          .json("Los sentimos, ha habido un error en la creación de la cuenta");
      }

      //Si no se produjeron errores en el stripe se procede a creear la cuenta
      try {
        //Objeto con los datos del usuario
        const newUser = new User({
          name: req.body.name.toLowerCase(),
          stripe_id: stripeCustomer.id,
          surname: req.body.surname.toLowerCase(),
          acceptTerms: req.body.acceptTerms,
          username: userName,
          email: userEmail,
          profilePic: req.body.profilePic,
          password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.SECRET_KEY
          ).toString(),
        });

        //Guardamos el nuevo usuario
        const user = await newUser.save();

        if (user) {
          //Le creamos la subscripción al usuario
          const subscriptionInit = await stripe.subscriptions.create(
            {
              customer: user.stripe_id,
              items: [
                {
                  price: process.env.PRICE_SUBSCRIPTION,
                },
              ],
              payment_behavior: "default_incomplete",
              expand: ["latest_invoice.payment_intent"],
            },
            {
              apiKey: process.env.STRIPE_KEY,
            }
          );
          //Si la suscripcion existe

          if (subscriptionInit) {
            //Esconder informacion dentro de un token en un localstorage durante 24 horas
            const subscriptionToken = jwt.sign(
              {
                id: user._id,
                subscriptionId: subscriptionInit.id,
                clientSecret:
                  subscriptionInit.latest_invoice.payment_intent.client_secret,
              },
              process.env.SECRET_KEY,
              { expiresIn: "30d" }
            );

            //Enviamos token de subscripción
            res.json({ subscriptionToken });
          }
        }
      } catch (err) {
        res
          .status(500)
          .json("Los sentimos, ha habido un error en la creación de la cuenta");
      }
    }
  }
});

//LOGIN - Loguear a un usuario
router.post("/signin", async (req, res) => {
  const userEmail = req.body.email.toLowerCase();
  try {
    //Primer paso obtener la stripe ID por su email (Controlar que el usuario exista)
    const user = await User.findOne({ email: userEmail });
    if (!user) res.status(401).json("El email o contraseña introducido no existe");

    //Encriptamos la contraseña que nos ha escrito el usuario a loguearse para 
    //poder comprarla con la que hay en BD
    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    //Si no existe el usuario
    if (!user) {
      return res
        .status(400)
        .json("El email o contraseña introducido no existe");
    } else {
      //Comprobamos si la contraseña coincide con la del usuario
      if (originalPassword !== req.body.password) {
        return res
          .status(400)
          .json("La contraseña es incorrecta");
      } else {
        //Buscar subscripcciones del usuario
        const findSubscriptions = await stripe.subscriptions.list(
          {
            customer: user.stripe_id,
            status: "active",
            expand: ["data.default_payment_method"],
          },
          {
            apiKey: process.env.STRIPE_KEY,
          }
        );

        //Si tiene subscripción activa
        if (
          findSubscriptions.data.length > 0 &&
          findSubscriptions.data[0].status === "active"
        ) {
          //Esconder informacion dentro de un token en un localstorage durante 24 horas
          //Le permitimos acceso a la web
          const accessToken = jwt.sign(
            {
              id: user._id,
              isAdmin: user.isAdmin,
            },
            process.env.SECRET_KEY,
            { expiresIn: "30d" }
          );

          //Devolvemos el access token
          res.json({ accessToken });
        } else {
          //Si no posee una subscripción activa
          //Iniciamos la subscripcion del usuario
          const subscriptionInit = await stripe.subscriptions.create(
            {
              customer: user.stripe_id,
              items: [
                {
                  price: process.env.PRICE_SUBSCRIPTION,
                },
              ],
              payment_behavior: "default_incomplete",
              expand: ["latest_invoice.payment_intent"],
            },
            {
              apiKey: process.env.STRIPE_KEY,
            }
          );

          if (subscriptionInit) {
            //Esconder informacion dentro de un token en un localstorage durante 24 horas
            const subscriptionToken = jwt.sign(
              {
                id: user._id,
                subscriptionId: subscriptionInit.id,
                clientSecret:
                  subscriptionInit.latest_invoice.payment_intent.client_secret,
              },
              process.env.SECRET_KEY,
              { expiresIn: "30d" }
            );

            //Enviamos token de subscripción
            res.json({ subscriptionToken });
          } else {
            res.json({
              status: "FAILED",
              message: "Algo ha ido mal en el servidor",
            });
          }
        }
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN - Loguear a un usuario
router.post("/admin/signin", async (req, res) => {
  const userEmail = req.body.email.toLowerCase();
  try {
    //Comprobamos que el email del usuario está en BD
    const user = await User.findOne({ email: userEmail });
    if (!user) res.status(401).json("El email o contraseña introducido no existe");

    //Encriptamos la contraseña que nos ha escrito el usuario a loguearse para poder comprarla con la que hay en BD
    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    //Comprobamos si la contraseña coincide con la de la BD
    if (originalPassword !== req.body.password) res.status(401).json("La contraseña no es correcta");

    if (user.isAdmin === false )res.status(401).json("No eres admin");
    //Esconder informacion dentro de un token en un localstorage durante 3 dias
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.SECRET_KEY,
      { expiresIn: "3d" }
    );

    //Enviamos el accessToken que se ha generado
    res.json({ accessToken });
  } catch (err) {
    //res.status(500).json(err);
  }
});


//Verificar suscripcion y token de usuario
router.get("/check-session", verify, async (req, res) => {
  //Primero se comprueba el token con el middleWare verify
  //Si existe la id del usuario en dicho token
  if (req.user.id) {
    //Obtenemos los datos del usuario de BD
    const user = await User.findById(req.user.id)

    //Si no nos devuelve nada
    if (!user) {
      //Enviamos un estado fallido esto quiere decir que el usuario no existe
      return res.status(500).json("FAILED")
    } else {
      //Si el usuario finalmente existe realizamos una petición a stripe
      //Este nos devolverá un json y en el habrá un atributo de "STATUS"
      const findSubscription = await stripe.subscriptions.list(
        {
          //Enviamos la id de stripe del usuario
          customer: user.stripe_id,
          status: "active",
          expand: ["data.default_payment_method"],
        },
        {
          apiKey: process.env.STRIPE_KEY,
        }
      );
      //Si stripe nos devuelve datos
       if (findSubscription.data.length > 0) {
         //Y además el estado de la suscripcion es active
         if (findSubscription.data[0].status === "active") {
           //El usuario esta listo para nuestra web.
           return res.status(200).json("SUCCESS")
         }
         return res.status(500).json("FAILED")
       }
       return res.status(500).json("FAILED")
    }
  } else {
    return res.status(500).json("FAILED")
  }
});

module.exports = router;
