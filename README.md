# QUVO-StreamingApp
QUVO es una aplicación de streaming de videos programada en react y nodejs junto a express.

En React estamos aplicando una programación por estados utilizando tecnologías que nos lo facilitan como Redux, Redux Saga, Reselect. Además de todas aquellas dependencias necesarias para lograr una web de calidad como Axios que nos permite conectarnos con nuestro Backend (Utilizando Routes), React-router para crear la jerarquía de páginas, React-form esta dependencia nos facilita la creación y validación de formularios.

En NodeJs la dependencia más importante es Express que nos permite crear el servidor, en él se han instalado otras tecnologías/dependencias como Dotenv para la creación de variables de entorno (Aumentamos la seguridad), JWT (JsonWebToken) muy útil para las sesiones de usuario (Login), Stripe será nuestra pasarela de pago, CryptoJs super necesaria para encriptar información de usuario tal como la contraseña o el mismo Token de sesión, Mongoose que nos permite realizar conexiones a una base de datos MongoDB. Cabe añadir el uso de ShellJs, nos permite usar comandos linux por lo tanto lo hace super útil para combinarlo con FFmpeg que funciona mediante terminal.

Motor de Base de datos MongoDB se trata de una base de datos relacional super flexible que nos permite realizar todas las funciones necesarias para nuestra aplicación.

Para la reproducción de video en tiempo real se ha de utilizar un servidor RTMP (Real-Time Messaging Protocol). Este ha sido configurado sobre Express.Js

Nodemailer nos permitirá enviar correos a los usuarios como por ejemplo recuperar contraseñas.

Cabe destacar que para su uso en local no se pueden pasar las películas y series una por cuestiones de copyright y otra porque ocupan. Para ello he preparado una carpeta en drive donde puedes descargar los tráiler. Estos se descomprimen dentro de la carpeta api directamente. Y reemplazamos todo. Así de esta manera al faltar las películas cuando intentes ver por ejemplo Batman no va a funcionar, pero los trailer siempre van a funcionar. 

Requisitos para la instalación:
	-NodeJs (La versión donde se ha programado es la 16.14.0).
	-Editor de código fuente, recomendado Visual studio code.
	-Navegador Web (No usar I. Explorer).

Una vez cumplas los requisitos el código fuente lo podrás encontrar adjunto con esta memoria.

Comenzamos:
Primer paso: Abrimos la carpeta del proyecto en Visual Studio Code. Para ello nos vamos a la esquina derecha superior > Archivo >  Open Folder. 

Segundo paso: Abrimos una Terminal en Visual Studio Code. Para ello en la barra superior nos vamos a Terminal > New Terminal. Esto hará que en la parte inferior se nos crea una ventana o pestaña.
Tercer paso: En la terminal y por carpeta escribiremos los siguientes comandos “cd carpeta” y luego “npm i” esto hará que comience la instalación de las dependencias de esa parte. (El proceso se repite con cada parte, cliente, admin y api). 

Cuarto y último paso: Una vez que las dependencias de todas las carpetas estén instaladas abriremos un terminal para cada parte del proyecto en este caso serían 3. Una para admin, otra para Api y otra para client. Una vez abiertos los terminales. Nos iremos a cada carpeta con “cd carpeta” y escribiremos el comando “npm start”. Las siguientes ilustraciones hacen referencia a como se veria la terminal con dichas aplicaciones en marcha. 

Con esto nuestra aplicación ya es totalmente funcional. Quizás pueda haber un error con la base de datos ya que se encuentra en la nube y si detecta una ip rara puede fallar la conexión. Para solucionar este problema contactame por correo.

