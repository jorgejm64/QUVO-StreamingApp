const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const User = require("../models/User");
const { verify } = require("../verifyToken");

router.get("/list-subscription", verify, async (req, res) => {
  if (req.user.id) {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(403).send("El usuario no existe");
    } else {
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
      return res.status(200).json(findSubscriptions.data);
    }
  } else {
    return res.status(403).send("No estas autenticado");
  }
});

router.get("/cancel-subscription", verify, async (req, res) => {
  console.log(req.user.id)
  if (req.user.id) {
    const user = await User.findById(req.user.id);

    if (user) {
      const findUserSubscription = await stripe.subscriptions.list(
        {
          customer: user.stripe_id,
          status: "active",
          expand: ["data.default_payment_method"],
        },
        {
          apiKey: process.env.STRIPE_KEY,
        }
      );

      if (findUserSubscription.data[0].id) {
        const deletedSubscription = await stripe.subscriptions.del(
          findUserSubscription.data[0].id,
          {
            apiKey: process.env.STRIPE_KEY,
          }
        );
        return res.send({ status: "SUCCESS", message: deletedSubscription });
      }
    }
    return res.send({ status: "FAILED" });
  }
  return res.send({ status: "FAILED" });
});

router.post("/create-customer", async (req, res) => {
  // Create a new customer object
  const customer = await stripe.customers.create({
    email: req.body.email,
  });

  // Save the customer.id in your database alongside your user.
  // We're simulating authentication with a cookie.
  res.cookie("customer", customer.id, { maxAge: 900000, httpOnly: true });

  res.send({ customer: customer });
});

module.exports = router;
