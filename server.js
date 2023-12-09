//Allowa us to use .env file
require('dotenv').config();
//Dependencies
const mongoose = require("mongoose");
const Tweet = require("./tweet.js");

// Global configuration
const mongoURI = process.env.MONGO_URI;
const db = mongoose.connection;

//input examples
// const myFirstTweet = {                            //fields match exactly like schema in tweet.js //FOR SINGLE FEILD
//     title: "Deep Thoughts",
//     body: "Friends, I am the realest coder alive",
//     author: "Arthur",
//   };
  const manyTweets = [                                          //FOR MANY FEILDS
    {
      title: "Deep Thoughts",
      body: "Friends, I am the realest coder alive",
      author: "Arthur",
    },
    {
      title: "Sage Advice",
      body: "Friends, I am awesome and you are too",
      author: "Arthur",
      likes: 20,
    },
    {
      title: "Is TI the Jadakiss of the South",
      body: "TI is severely underrated and we need to fix that expeditiously",
      author: "Arthur",
      likes: 40,
    },
    {
      title: "Crypto",
      body: "Friends, I have spent $2300 to be one of the first people to own a random jpeg and that makes me cool",
      author: "Arthur",
      likes: 162,
    },
    {
      title: "Confusion",
      body: "Friends, why do you just respond with the word `dislike`? Surely you mean to click the like button?",
      author: "Arthur",
      likes: -100,
    },
    {
      title: "Vespa",
      body: "Friends, my Vespa has been upgraded to run on old french fry oil. Its top speed is now 11 mph",
      author: "Arthur",
      likes: 2,
    },
    {
      title: "Licensed",
      body: "Friends, I am now officially licensed to teach yogalates. Like this to get 10% off a private lesson",
      author: "Arthur",
      likes: 3,
    },
    {
      title: "Water",
      body: "Friends, I have been collecting rain water so I can indulge in locally sourced raw water. Ask me how",
      author: "Arthur",
    },
  ];
// Connect to Mongo
mongoose.connect(mongoURI);
// mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Connection Error/Success
// Define callback functions for various events
db.on("error", (err) => console.log(err.message + " is mongod not running?"));
db.on("open", () => console.log("mongo connected: ", mongoURI));
db.on("close", () => console.log("mongo disconnected"));

// Automatically close after 5 seconds
// for demonstration purposes to see that you must use `db.close()` in order to regain control of Terminal tab
// setTimeout(() => {     // to disconect the mongo db
//     db.close();
//   }, 5000);

//========================================================================================================================================================================
// THIS MAKES ONE NEW ADDITION TO THE DATABASE 
// Tweet.create(myFirstTweet)
// // if database transaction succeeds
// .then((tweet) => {                          //create db tweet if successs go to catch if sucess go n closedb 
//   console.log(tweet)
// })
// // if database transaction fails
// .catch((error) => {                      //catch error does'nt crash the app
//   console.log(error)
// })
// // close db connection either way          // each have call back function 
// .finally(() => {
//  db.close()
// })
//=====================================================================================================================================================================
//THIS WILL ADD MANY NEW THINGS TO THE DATABASE
// Tweet.insertMany(manyTweets)
// // if database transaction succeeds
// .then((tweets) => {
//   console.log(tweets)
// })
// // if database transaction fails
// .catch((error) => {
//   console.log(error)
// })
// // close db connection either way
// .finally(() => {
//  db.close()
// })
//==========================================================================================================================================
//IF THE DATABASE TRANSTATION FAILS WE CAN CONSOLE.LOG THE ERROR 

//FINDING DOCUMENTS WITH MONGOOSE 

//Mongoose has 4 methods for this
//find- generic
//findById- finds by ID - great for Show routes!
//findOne- limits the search to the first document found
//where- allows you to build queries, we won't cover this today 
//===================================================================================================================================================
//START BY FINDING ALL THE TWEETS, WE DO THIS USING 
//FIND({})
// Tweet.find({})
// // if database transaction succeeds
// .then((tweets) => {
//   console.log(tweets)
// })
// // if database transaction fails       //TO SEE ERROR 
// .catch((error) => {
//   console.log(error)
// })
// // close db connection either way
// .finally(() => {
//  db.close()
// })
//==================================================================================================================================================================
//FINDING ONLY 2THING TITLE AND BODY 
// Tweet.find({}, "title body")
// // if database transaction succeeds
// .then((tweets) => {
//   console.log(tweets)
// })
// // if database transaction fails
// .catch((error) => {
//   console.log(error)
// })
// // close db connection either way
// .finally(() => {
//  db.close()
// })
//==========================================================================================================================================================================
//Let's look for a specific tweet:
// Tweet.find({ title: "Water" })
// // if database transaction succeeds
// .then((tweet) => {
//   console.log(tweet)
// })
// // if database transaction fails
// .catch((error) => {
//   console.log(error)
// })
// // close db connection either way
// .finally(() => {
//  db.close()
// })
//============================================================================================================================================================
//We can also use advanced query options. Let's find the tweets that have 20 or more likes
// Tweet.find({ likes: { $gte: 20 } })
// // if database transaction succeeds
// .then((tweets) => {
//   console.log(tweets)
// })
// // if database transaction fails
// .catch((error) => {
//   console.log(error)
// })
// // close db connection either way
// .finally(() => {
//  db.close()
// })
//===============================================================================================================================================
//Delete Documents with Mongoose
//remove()danger! Will remove all instances
//findOneAndRemove()- this seems like a great choice
//.findByIdAndRemove()- finds by ID - great for delete routes in an express app!

// Tweet.findOneAndDelete({ title: "Deep Thoughts" })    //function .findOneAndDelete -- to del one item
// // if database transaction succeeds
// .then((tweet) => {
//   console.log(tweet)
// })
// // if database transaction fails
// .catch((error) => {
//   console.log(error)
// })
// // close db connection either way
// .finally(() => {
//  db.close()
// })
//=======================================================================================================
//delete by ID

// Tweet.findByIdAndDelete('65736e7d0a426e49fe3c88ac') 
//     .then((tweet) => {
//         console.log(tweet)
//     })
//     .catch((error) => {
//         console.log(error)
//     })
//     .finally(() => {
//         db.close()
//     })
// //=====================================================================================================================================================
//Update Documents with Mongoose
//update()- the most generic one
//findOneAndUpdate()- Let's us find one and update it
//findByIdAndUpdate()- Let's us find by ID and update - great for update/put routes in an express app!

// Tweet.findOneAndUpdate(
//     { title: "Vespa" },
//     { sponsored: true },
//     { new: true })  ////We'll see the console.logged tweet will have the value of sponsored updated to true. Without {new: true}we would get the original unaltered tweet back.
//   // if database transaction succeeds
//   .then((tweet) => {
//     console.log(tweet)
//   })
//   // if database transaction fails
//   .catch((error) => {
//     console.log(error)
//   })
//   // close db connection either way
//   .finally(() => {
//    db.close()
//   })

  //====================================================================================================================================================================
//Intermediate
//We can count how many tweets we have with likes greater than 20
// Tweet.countDocuments({ likes: { $gte: 20 } })
// // if database transaction succeeds
// .then((count) => {
//   console.log(count)
// })
// // if database transaction fails
// .catch((error) => {
//   console.log(error)
// })
// // close db connection either way
// .finally(() => {
//  db.close()
// })
//Advanced!
//=========================================================================================================================================================================
// Tweet.find({ likes: { $gte: 20 } }, "title createdAt -_id")
//   .limit(10)
//   .sort("createdAt")
//   .exec()
// // if database transaction succeeds
// .then((tweets) => {
//   console.log(tweets)
// })
// // if database transaction fails
// .catch((error) => {
//   console.log(error)
// })
// // close db connection either way
// .finally(() => {
//  db.close()
// })

//=================================================================================================================================================
//Making A Model with Mongoose










