# Structural metadata REST API with json-server
A REST API jsom-server to serve structural metadata

## What you’ll need
In order to run the json-server, your environment should fulfill the following requirements:

* Nodejs (https://nodejs.org) ;
* Json Server (https://github.com/typicode/json-server); 
 


## How to run

To run the server the commnand:
```
> node server.js

```
 
The application will be avaible at http://localhost:5300/

### Configuration

By default the server start on listening port 5300. To change the default port you need to edit the 'server.js' file:

```...
server.listen(5300, function() {
  console.log("JSON Server is running");
});
...
```

To add a new REST entrypoint with new type of data, you need to put in the folder a file json containing an array of object json and add the entrypoint in the 'db.js' file.