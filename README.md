![logo contempo](https://github.com/therealedsheenan/contempo-node-api/blob/master/contempo-node-api.png)

# Contempo-node-api
The API specially created for implementing the authentication for [contempo-auth](https://github.com/therealedsheenan/contempo-auth).

### Instructions
Install of the dependencies by running

1.) `yarn install`

Make sure that you also installed Mongo Database in your system.
Run the mongo database then launch the node server:

2.) `npm start`

Next, make sure that you create the `.env` file containing the following:

SECRET_KEY

USERNAME

PASSWORD

The SECRET_KEY will be be the requirement for hashing your password to the database.
If you have an admin account in your mongo db, you may specify by adding your
USERNAME and PASSWORD credentials respectively.

checkout .sample-env.

### Work in progress
1.) Implementation of a chatbox by expanding this api.

2.) Create API made in GO PL


### Additional Information
Added Realtime feed from the server to the user.
Checkout the Socket.io configurations on the `src/socket/socketEvents.js`.


