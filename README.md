# Redux EASY2 CRUD

redux-easy2-crud is a library permitting to communicate with a Restful server following CRUD architecture.

The avantage of this library is :

* Action, reducer and middleware are shorter to write

There is only 4 actions, CREATE, READ, UPDATE, DELETE.

Its no more neccessary to specify actions like CREATE_XXX, READ_XXX, UPDATE_XXX, DELETE_XXX (for ex a todo action we normally have CREATE_TODO, READ_TODO, UPDATE_TODO, DELETE_TODO). 
With easy2_crud the action are CREATE, READ, UPDATE, DELETE and we associate a additionnal "path" parameter to the redux action. This parameter specify the kind of the ressource (path).

The "path" permits to identify the managed ressource.

The interest of doing like that is we reduce code to write and redundency on the code.


This project focus only on action, reducer and middleware.

The connections of these modules to Redux containers is the same than regular Redux action. 



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
