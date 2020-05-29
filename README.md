# Remembrall

People often struggle remembering their thoughts. Twitter may be a solution for
some of them, but it lacks the option of hiding your personal ideas for only
yourself and sharing some others with the rest of the world. When someone
shares a personal thought with others it often causes controversy depending on
who had the thought or the comments that might be harmful or direct. Here is
where “Remembrall” comes in to help.

## Installation

Install the required packages and run the application locally with:
```bash
npm install
npm start dev
```

## Deployed version
Please visit the following link for the deployed version of Remmembrall: 
```
https://remembrallapp.herokuapp.com/
```

## Endpoints
```
/                         GET - Endpoint used for the main page
/tweet/:id                GET - Endpoint used to retrieve a single thought
/api/tweets/:id/like      POST- Endpoint used to like a thought
/register                 GET - Endpoint used to get the registration information
/register                 POST- Endpoint used to register a user
/login                    POST- Endpoint used to login in Remembrall
/logout                   GET - Endpoint used to logout from Remembrall
/account                  GET - Endpoint used to validate if a user is logged in
/account                  PATCH-Endpoint used to update a user's information
/upload                   PATCH-Endpoint used to upload a picture
/tweet                    POST- Endpoint used to post a thought
/edit/:id                 PATCH-Endpoint used to update a thought
/delete/:id               GET - Endpoint used to delete a thought
/search                   GET - Endpoint used to search for thoughts given a word
/:username                GET - Endpoint used to see a user's profile
```

## Dev
* Pablo César Ruíz Hernández A01197044