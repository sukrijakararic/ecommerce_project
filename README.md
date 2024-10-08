# codecademy e-commerce-rest-api Project / Pleigns

This project was about building a REST API capable of performing CRUD operations on multiple endpoints. I chose to make an API that allows users to buy planes.

I had a great time doing this project and learned a lot about API development. The main challenge I had was structuring a local-strategy to allow users to log in, and it was awesome learning about that.

I hope that this project is enjoyable to interact with as it was making it!

## What you need to run the project on your machine

In order to run the project on your machine, you will need to have Node.js installed. You will also need PgAdmin4 or any other RDBMS. You will also need an HTTP client such as [POSTMAN](https://www.postman.com/) to make requests and finally, a text editor such as [VScode](https://code.visualstudio.com/download).

## How to run the project

In order to run the project, first you will have to make a database (call it whatever you want). Then you'll need to open the directory in your code-editor and run a few commands in the terminal. 

1. Copy the code on your local machine.

2. `npm install` (This will install all necessary packages)

4. create a ".env" file in the project directory. Within the file you'll need to input some configuration variables. For guidance on what to put in that file, please check the example.env file provided in the project directory.

4. `npm run create-db` (This script will populate your db with tables)

Once all of that is done, you're good to go. You can start the server with `npm start` and make requests to the API endpoints. The API endpoints are documented in the swagger file, so you can view them by going to `http://localhost:<your local PORT>/docs` in your browser. You can also view detailed instructions on how to use the api endpoints in the root path `http://localhost:<your local PORT>/`.  Have fun!
