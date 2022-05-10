const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const { verify, verifyTokenAndAuthorization } = require("../verifyToken");

//UPDATE en el cliente (No admin) Verificamos el token y luego procedemos a realizar la funcion
router.put("/update", verify, async (req, res) => {
  const userEmail = req.body.email.toLowerCase();
  const userName = req.body.username.toLowerCase();

  const userNewData = new User({
    name: req.body.name.toLowerCase(),
    surname: req.body.surname.toLowerCase(),
    username: userName,
    email: userEmail,
    //profilePic: req.body.profilePic,
  });

  //Si la id del usuario es igual a la solicitada por url o si este usuario es admin
  if (req.user.id) {
    //Update a BD
    try {
      //Buscamos al usuario
      const user = await User.findById(req.user.id);

      //Encriptamos la contraseña que nos ha escrito el usuario
      const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
      const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

      //Si hay usuario
      if (user) {
        //Si el email del usuario no coincide con el introducido
        if (user.email !== userEmail) {
          //Verificaremos si hay otra cuenta con el mismo email introducido
          const userEmailVerification = await User.find({ email: userEmail });

          //Si el email existe
          if (userEmailVerification.length > 0) {
            return res
              .status(403)
              .json({ message: "El email ya se encuentra registrado" });
          } else if (user.username !== userName) {
            const userNameVerification = await User.find({
              username: userName,
            });
            //Verificamos si existe el nombre de usuario
            if (userNameVerification.length > 0) {
              return res
                .status(403)
                .json({ message:"El nombre de usuario ya se encuentra registrado"});
            } else if (originalPassword !== req.body.password) {
              return res
                .status(403)
                .json({ message: "La contraseña es incorrecta" });
            } else {
              //Procederemos a acutalizar el usuario
              const updateUser = await User.findByIdAndUpdate(
                //Parametro por cabecera
                req.user.id,
                //Formulario con los cambios en el usuario
                {
                  $set: {
                    name: req.body.name.toLowerCase(),
                    surname: req.body.surname.toLowerCase(),
                    username: userName,
                    email: userEmail,
                  },
                },
                //Nos devolverá el nuevo usuario
                { new: true }
              );
              return res
                .status(200)
                .json({ message: "Tus datos han sido actualizados" });
            }

            //Comparamos si las contraseñas coinciden
          } else if (originalPassword !== req.body.password) {
            return res
              .status(403)
              .json({ message: "La contraseña es incorrecta" });
          } else {
            //Procederemos a acutalizar el usuario
            const updateUser = await User.findByIdAndUpdate(
              //Parametro por cabecera
              req.user.id,
              //Formulario con los cambios en el usuario
              { $set: userNewData },
              //Nos devolverá el nuevo usuario
              { new: true }
            );
            return res.status(200).json({ message: "Tus datos han sido actualizado" });
          }
        } else if (user.username !== userName) {
          const userNameVerification = await User.find({ username: userName });
          //Verificamos si existe el nombre de usuario
          if (userNameVerification.length > 0) {
            return res
              .status(403)
              .json({
                message: "El nombre de usuario ya se encuentra registrado",
              });
          } else if (originalPassword !== req.body.password) {
            return res
              .status(403)
              .json({ message: "La contraseña es incorrecta" });
          } else {
            //Procederemos a acutalizar el usuario
            const updateUser = await User.findByIdAndUpdate(
              //Parametro por cabecera
              req.user.id,
              //Formulario con los cambios en el usuario
              {
                $set: {
                  name: req.body.name.toLowerCase(),
                  surname: req.body.surname.toLowerCase(),
                  username: userName,
                  email: userEmail,
                },
              },
              //Nos devolverá el nuevo usuario
              { new: true }
            );
            return res
              .status(200)
              .json({ message: "Tus datos han sido actualizados" });
          }
        }
        if (originalPassword !== req.body.password) {
          return res
            .status(403)
            .json({ message: "La contraseña es incorrecta" });
        } else {
          //Procederemos a acutalizar el usuario
          const updateUser = await User.findByIdAndUpdate(
            //Parametro por cabecera
            req.user.id,
            //Formulario con los cambios en el usuario
            {
              $set: {
                name: req.body.name.toLowerCase(),
                surname: req.body.surname.toLowerCase(),
                username: userName,
                email: userEmail,
              },
            },
            //Nos devolverá el nuevo usuario
            { new: true }
          );
          return res
            .status(200)
            .json({ message: "Tus datos han sido actualizados" });
        }
      } else {
        return res
          .status(403)
          .json({
            message:
              "Algo extraño esta sucediendo, por favor cierra sesión y vuelve a intertarlo",
          });
      }
    } catch (err) {
      //return res.status(500).json({ message: err });
    }
  } else {
    //Forbidden estado
    return res
      .status(403)
      .json({ message: "Solo puedes actualizar tu cuenta!" });
  }
});

//DELETE
router.delete("/:id", verify, async (req, res) => {
  //Si la id del usuario es igual a la solicitada por url o si este usuario es admin
  if (req.user.id === req.params.id || req.user.isAdmin) {
    //Delete a BD
    try {
      //Buscamos y eliminamos al usuario
      await User.findByIdAndDelete(req.params.id);
      res.status(200).send("El usuario ha sido eliminado");
    } catch (err) {
      res.status(500).send(err);
    }
  } else {
    //Forbidden estado
    res.status(403).send("Solo puedes eliminar tu cuenta! ");
  }
});

//GET
router.get("/find", verify, async (req, res) => {
  console.log(req.user.id);
  //Delete a BD
  try {
    //Realizamos la busqueda de un usuario
    const user = await User.findById(req.user.id);

    //No queremos mostrar la contraseña ni la id, solo el resto de datos
    const { password, _id, isAdmin, ...info } = user._doc;

    res.status(200).send(info);
  } catch (err) {
    res.status(500).send(err);
  }
});

//GET user data to show on profile
router.get("/data", verify, async (req, res) => {
  //Delete a BD
  try {
    //Realizamos la busqueda de un usuario
    const user = await User.findById(req.user.id);
    //No queremos mostrar la contraseña, sol oel resto de datos
    const { password, ...info } = user._doc;

    res.status(200).send(info);
  } catch (err) {
    res.status(500).send(err);
  }
});

//GET user profile pic for navbar
router.get("/img", verify, async (req, res) => {
  //Delete a BD
  try {
    //Realizamos la busqueda de un usuario
    const user = await User.findById(req.user.id);
    res.status(200).send(user.profilePic);
  } catch (err) {
    res.status(500).send(err);
  }
});

//GET ALL only admin purpose
router.get("/", verifyTokenAndAuthorization, async (req, res) => {
  //Tomamos un quey en la que solo queramos ver los usaurio nuevos
  const query = req.query.new;
  //Solo podremos ver todos los usaurio si eres admin
  if (req.user.isAdmin) {
    //Delete a BD
    try {
      //Si poseemos la query, es porque queremo ver los usuarios nuevos por lo tanto tendrás un limite de 10
      //Si no deseas ver los nuevos usuarios, se te mostrarán todos los disponibles
      const users = query
        ? await User.find().sort({ _id: -1 }).limit(5)
        : await User.find();
      res.status(200).send(users);
    } catch (err) {
      res.status(500).send(err);
    }
  } else {
    //Forbidden estado
    res.status(403).send("No tienes permitido ver esta opcion");
  }
});

//GET USER STATS
router.get("/stats", async (req, res) => {
  //Vamos a obtener un rango de tiempo del dia actual al del año pasado
  const today = new Date();
  //Para obtener el año pasado restamos 1 a la fecha obtenida
  const lastYear = today.setFullYear(today.setFullYear() - 1);

  /*const monthsArray = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Noviembre",
    "Diciembre",
  ];*/

  try {
    const data = await User.aggregate([
      //Obtener usuario creados por mes
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
