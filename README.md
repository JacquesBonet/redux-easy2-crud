# Redux EASY2 CRUD

redux-easy2-crud is a library permitting to communicate with a Restful server following the CRUD architecture.

The avantage of this library is :

* Action, reducer and middleware are shorter to write

There is only 4 actions, CREATE, READ, UPDATE, DELETE.

Its no more neccessary to specify (for ex a todo action) like  CREATE_TODO, READ_TODO, UPDATE_TODO, DELETE_TODO but CREATE, READ, UPDATE, DELETE, and associate a additionnal parameter to the redux action. This parameter specify the kind of the ressource (path).

The path permits to identify the managed ressource.

* no redundency on the code

This project focus only on action, reducer and middleware.

The connections of these modules to Redux containers don't change.



### Install
```
npm install

npm install json-server -g
```

### Testing

```
json-server --port 3001 db.json

npm test

```

### Todo

Enhance the sample with a real application (the concept has been validate with a no open source application)

Add more tests

Create a real application with this middleware
