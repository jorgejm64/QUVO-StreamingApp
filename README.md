# QUVO-StreamingApp
QUVO es una aplicación de streaming de videos programada en React y Express.

QUVO is a video streaming app built on React and Express.

You'll need knowledge on React, Express, NodeJs, MongoDB & FFmpeg to make it functional.

![alt text](https://github.com/jorgejm64/QUVO-StreamingApp/blob/main/images/quvoTV_1.png)

Basic instalation: each root folder such as "Api, Admin & Client" use "npm install" to install all the dependencies.

Second step: need to configure the .env file into the Api folder. 

Third step: Configure an admin user in mondoDB you can see the data scheme in the user folder into the Api tree.

Four step: Using this link https://drive.google.com/file/d/13qUYSMO-Him6f2er7ue9bCrW4oA-HN-W/view?usp=sharing you'll download two videos to test your app this. Unzip and then paste the data folder into the content folder into Api tree. Into the content folder you can see another folder named users.

If you did all that, you can access to the admin panel using the localhost url that NodeJs provide you use the command "npm start". (Remember that you can have some problems if you have another services running in the background).

On it you must log in with the user that you created in MongoDB. Then add a Movie or Serie you need to use TMDB Api to get the serie or movie information. For example if you want to import a Movie use this ID:315162 this will add puss in boots the last wish automaticlly. You add the pictures (From TMDB go to images and copy the link of the image that you like)

![alt text](https://github.com/jorgejm64/QUVO-StreamingApp/blob/main/images/quvoTV_4.png?raw=true)

Then in the bottom of the new Movie page you'll see a dropdown select menu. Here is doing an ls command on the folder "api/content/data/example_data/trailer" and "api/content/data/example_data/vid" so if you not see anything probably you dont have downloaded the Drive folder or somthing is missing on the folder. Look is everything is righ.

![alt text](https://github.com/jorgejm64/QUVO-StreamingApp/blob/main/images/quvoTV_5.png?raw=true)

Go to the client side and log in with the admin user that you have created, then subscribe using the stripe test card.

![alt text](https://github.com/jorgejm64/QUVO-StreamingApp/blob/main/images/quvoTV_2.png?raw=true)

Finally is everything is correct you'll have acces to all your Movies and Series that you have added

![alt text](https://github.com/jorgejm64/QUVO-StreamingApp/blob/main/images/quvoTV_3.png?raw=true)
