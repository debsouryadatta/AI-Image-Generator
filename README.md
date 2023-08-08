1. Installing vite react tailwind in client folder, changing the tailwind config file
2. npm install file-saver(For downloading the files that are posted)
3. npm i react-router-dom(For Routing Purpose)
4. Creating the navbar ui and the routes for the whole application in App.jsx
5. Creating the Hero Section, Results section in Home.jsx
6. Creating the Hero Section, Form Section, Preview Section, Loader, Generate, Share buttons in CreatePost.jsx
7. Creating the FormField.jsx input, taking the props from the CreatePost.jsx and showing them
8. Writing the code for handleChange & handleSurpriseMe functions



9. Starting with the backend part, npm init -y, npm i cloudinary cors dotenv express mongoose nodemon openai
10. Altering the package.json, type: module & start: nodemon index.js
11. Writing the code for basic express server
12. Connecting the mongodb with our application & Creating mongoose model
13. Creating postRoutes & dalleRoutes and implementing them in the index.js
14. Creating the dalleRoutes.js for calling the openai api(for generating the images)
15. Going back to the frontend(createPost.jsx) and calling the backend route for generating the images which gets shown in the createPost page
16. Creating account in cloudinary and copying the cloudname, apikey, apisecret in our .env file
17. Working on the postRoutes.js -> cloudinary configuration, creating route for creating a post(saving the images in the cloudinary, getting the url which gets saved in the mongoDb), route for getting all posts
18. Working on the handleSubmit button in the createPost.jsx for posting a post from the frontend to the backend server



19. Using fetchPosts function inside the useEffect hook in the Home.jsx for getting the posts from the backend
20. Creating downloadImage function(Using filesaver package) on utils folder to use that function in the Card component
21. Creating the Ui of the card component in card.jsx
22. Creating handleSearchChange function for getting the searchedResults, using setTimeout/clearTimeout functions for good practice
23. Finally giving the props(also contains the handleSearchChange function) to the FormField component in the Home.jsx


24. Then deploying this Website on Vercel.
25. Fixing the vercel errors by watching the onboarding page vercel deployments






Building new features for Social Media

// Add Login/Register Functionality - Both Frontend and Backend
26. Create a UserSchema, create middlewares - authentication, error-handler, not-found
27. Create routes for Login/Register(With JWT and hashing)
28. Adding the Login/Register Page UI
29. Post request from both the pages and saving the received JWT on local storage
30. Also adding the logout functionality(deleting the JWT)


// Modifying the Post route and the Post schema
31. Modifying the post schema with properties like - likes, comments, createdBy
32. Modifying the post route by adding the createdBy property before saving it to mongoDB



// Check Login Route
33. Create a separate route to check authentication with the JWT sent by the user, and sent back the user details as per the JWT, to the frontend(in JSON format)
34. Taking Navbar as a separate component on the frontend, using the above route to toggle between the Login Logout button as per the sent json of the above route
35. The checkLogin route will also be handy, we can check if the user is logged in or not before liking and commenting




// Adding Like & Comment functionality
36. Create like & comment schema and routes (For now we are not putting any restrictions on likes and comments)
37. Create the frontend for like & comment
38. Also Like and comment should be protected route, so authentication middleware should be present before liking or commenting


// For now thats it, further modification coming soon!

// SignIn with google functionality with OAuth
39. Deleting the previous auth methods, new way of authentication - calling the JWT api from the frontend to get the jwt
40. After signin in OAuth, we get the user, we take nickname & email for creating JWT
41. If user is not present in the MOngoDB, save it to db & create JWT then send it to the frontend
42. If user is present, check for the name & the email in the mongoDB & create the JWT then send it to the frontend



// Update Profile feature
43. We will be using shadcn ui for the dialog component

