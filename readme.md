STEP 1: CONFIGURE THE POSTGRES DATABASE
###### ##################################################################################


Windows: ( Go to directory "/bin/windows" )
- Open the file env.bat and make sure to set a valid postgress configuration:
- Set the environement variables as follows:

SET PGDATABASE=here give a name for your database
SET PGUSER=here enter an existing postgres user name havin auth to create an manage databases
SET PGPASSWORD=here enter the password of your postgres user set just above
SET PGHOST=localhost or your custom host
SET PGPORT=5432 or the port number you are using for postgres

- run the command: "npm run conf-win"
- (The database will be created and the data will be inserted)
- (If there are errors please make sure that the environement variables are set correctly and run the command again)
######
Linux: ( Go to directory "/bin/linux" )

- Open the file env.sh and make sure to set a valid postgress configuration
- Set the environement variables as it is described above for windows
- run the command: npm run conf-lin
- (The database will be created and the data will be inserted)
- (If there are errors please make sure that the environement variables are set correctly and run the command again)

###### ######################################################################
STEP 2: CONFIGURE THE ENVIREONEMENT VARIABLES FOR NODE.JS AND INSTALL MODULES

- Open .env file located in the root folder and set the environement variables
- Set the environement variables as follows:

  DB_USER="your postgres user"
  DB_HOST="localhost"
  DB_DATABASE="your database name, the same as the one used for the scripts in STEP ONE"
  DB_PASSWORD="your password"
  DB_PORT=5432 or your custom port 

- Now, run the command: "npm install" to install the node_modules

###### ######################################################################
STEP 3: START THE SERVER 

run the command: "npm start" to start the server

###### ######################################################################

STEP 4: TEST THE API ROUTES

- If you are using Postman, there is a conf file present on the folder postman
- For browser usage:

The routes are:

For level 1:
localhost:3000/categories

For level 2:
localhost:3000/categories/children

For level 3:
localhost:3000/categories/all


