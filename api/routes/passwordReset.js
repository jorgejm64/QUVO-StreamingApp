const User = require("../models/User");
const Token = require("../models/Token");
const sendEmail = require("../utils/sendEmails");
const Joi = require("joi");
const crypto = require("crypto");
const CryptoJS = require("crypto-js");
const router = require("express").Router();

//Generar link y enviar por correo
router.post("/", async (req, res) => {
  try {
    //Esquema de valiación de datos
    const schema = Joi.object({ email: Joi.string().email().required() });
    //Validamos los datos
    const { error } = schema.validate(req.body);
    //Si hubo algun fallo en la validación enviamos un mensaje
    if (error)
      return res
        .status(400)
        .json({ status: "FAILED", message: error.details[0].message });

    //Obtenemos el usuario por email
    const user = await User.findOne({ email: req.body.email });
    //Si no existe ese email en la BD mostramos un mensaje
    if (!user)
      return res
        .status(400)
        .json({ status: "FAILED", message: "Comprueba los datos, algo está mal o no existe" });

    //Comprobamos que este usuario tenga un toekn creado
    let token = await Token.findOne({ user_id: user._id });
    //Si no es el caso se genera un token que expira en 1 hora
    if (!token) {
      token = await new Token({
        user_id: user._id,
        token: crypto.randomBytes(32).toString("hex"),
        createdAt: Date.now(),
        expiresAt: Date.now() + 3600000
      }).save();
    }

    //Link que se le envia al usuario
    const link = `${process.env.BASE_URL_CLIENT}/passwordreset/${user._id}/${token.token}`;

    //Enviamos el email
    await sendEmail(user.email, "Resetear contraseña", link);

    //Enviamos al front un mensaje con un aviso
    res.json({
      status: "SUCCESS",
      message: "Se te ha enviado un email con el link de recuperación",
      url: `/emailsend/${user.email}`
    });
  } catch (err) {
    res.send("An error ocurred");
  }
});

//Recuperar contraseña con link
router.post("/:user_id/:token", async (req, res) => {
  try {
    //Obtenemos el usuario de base de datos con su ID
    const user = await User.findById(req.params.user_id);
    //Si no existe enviamos un error
    if (!user)
      return res
        .status(400)
        .json({ status: "FAILED", message: "El link no es valido" });

    //Obtenemos el token de usuario
    const token = await Token.findOne({
      user_id: user._id,
      token: req.params.token,
    });

    //Si no existe en BD enviamos un mensaje
    if (!token)
      return res
        .status(400)
        .json({ status: "FAILED", message: "El link no es valido" });

    //Encryptamos la contraseña
    user.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString();

    //Guardamos los datos del usuario
    await user.save();

    //Eliminamos el token generado
    await token.delete();

    res.json({
      status: "SUCCESS",
      message: "La contraseña ha sido recuperada con éxito",
    });
  } catch (err) {
    res.send("Ha ocurrido un error");
  }
});

module.exports = router;
