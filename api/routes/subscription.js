const router = require("express").Router();
const Subscription = require("../models/Subscription");
const CryptoJS = require("crypto-js");
const { verify, verifySubscriptionToken } = require("../verifyToken");
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_KEY);
const User = require("../models/User");
const jwt = require("jsonwebtoken");

router.post("/create-subscription", async (req, res) => {
  //Price ids serian el total a pagar
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const subscription = await stripe.subscriptions.create(
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
      res.send({
        subscriptionId: subscription.id,
        clientSecret: subscription.latest_invoice.payment_intent.client_secret,
      });
    }
  } catch (error) {
    return res.status(400).send({ error: { message: error.message } });
  }
});

//Verificar si el usuario posee la subscripción
router.get("/fetch-subscriptions", async (req, res) => {
  // Simulate authenticated user. In practice this will be the
  // Stripe Customer ID related to the authenticated user.
  const customerId = req.body.stripe_id;

  const subscriptions = await stripe.subscriptions.list(
    {
      customer: customerId,
      status: "active",
      expand: ["data.default_payment_method"],
    },
    {
      apiKey: process.env.STRIPE_KEY,
    }
  );

  res.json({ subscriptions });
});


router.get("/token-validation", verifySubscriptionToken, async (req, res) => {
  //Validación de token de suscripción
  //Verificamos el token primero usando el middleware verifySubscriptionToken
  try {
    //Si obtenemos todos estos datros del token proseguimos
    if (
      req.tmpSubToken.subscriptionId &&
      req.tmpSubToken.clientSecret &&
      req.tmpSubToken.id
    ) {
      //Buscamos al usuario para comprobar que existe
      const user = await User.findById(req.tmpSubToken.id);

      //Si existe creamos el token de acceso para su posterior uso
      if (user) {
        const accessTokenData = jwt.sign(
          {
            id: user._id,
            isAdmin: user.isAdmin,
          },
          process.env.SECRET_KEY,
          { expiresIn: "86400000" }
        );
        //Devolvemos el token de acceso y el codigo secreto del usuario
        res
          .status(200)
          .json({
            accessToken: {accessToken: accessTokenData},
            secret: req.tmpSubToken.clientSecret,
          });

      //Si no se ha encontrado al usuario
      } else {
        res
          .status(400)
          .json({
            status: "FAILED",
            message:
              "Error, no se pudo realizar el pago. No se encuentra al usuario",
          });
      }
      //Si no se posee de clave secreta
    } else {
      res
        .status(400)
        .json({
          status: "FAILED",
          message:
            "Error, no se pudo realizar el pago. No posees clave secreta",
        });
    }
  
    //Ocurre in error en el try catch
  } catch (err) {
    res
      .status(400)
      .json({
        status: "FAILED",
        message: "Error, no se puede realizar el pago",
      });
  }
});

module.exports = router;
