const jwt = require("jsonwebtoken");
//Verificacion de tokens, de esta manera comprobaremos que el token de un usuario sea totalmente veridico
function verify(req, res, next) {
  //Tomamos el token de la cabecera
  const authHeader = req.headers.token;
  //Si hay un token
  if (authHeader) {
    //Tomamos la parte que no importa, la segunda (array[0 ,1])
    const token = authHeader.split(" ")[1];
    //Usamos la funcion verify (proveida por jwt) para verificar que el tokan del usuario es valido, si hay algun error. Sabremos que no lo es
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        res.sendStatus(403).json("Your token is not valid!");
      } else {
        req.user = user;
        //Leave the function
        next();
      }
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
}

const verifyTokenAndAuthorization = (req, res, next) => {
  verify(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allow to do that!");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verify(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allow to do that!");
    }
  });
};

function verifySubscriptionToken(req, res, next) {
  //Tomamos el token de la cabecera
  const authHeader = req.headers.token;
  //Si hay un token
  if (authHeader) {
    //Tomamos la parte que no importa, la segunda (array[0 ,1])
    const token = authHeader.split(" ")[1];
    
    //Usamos la funcion verify (proveida por jwt) para verificar que el tokan del usuario es valido, si hay algun error. Sabremos que no lo es
    jwt.verify(token, process.env.SECRET_KEY, (err, tmpSubToken) => {
      console.log(tmpSubToken)
      if (err) {
        console.log("ERROR")
        res.status(403).json({status: "FAILED", message: "Your token is not valid!"});
      } else {
        req.tmpSubToken = tmpSubToken;
        //Leave the function
        next();
      }
    });
  } else {
    return res.status(401).json("!No puedes usar este token, inicia sesión de nuevo!");
  }
} 

module.exports = { verify, verifyTokenAndAuthorization, verifyTokenAndAdmin, verifySubscriptionToken };
