# drossel-mongoose
Unnecessary mongoose wrapper

[![NPM](https://nodei.co/npm/drossel-mongoose.png)](https://nodei.co/npm/drossel-mongoose/)

## What is this?
"drossel-mongoose" add value similar to the HTTP status code, on the results of the mongoose.

## Install
step1: npm install
```
npm install drossel-mongoose
```

step2: require and prepare mongoose.model
```
var drmg = require('drossel-mongoose');
var mongoose = require('mongoose');
var model = mongoose.model('Example', new mongoose.Schema({
  foo: { type: String },
  bar: { type: Number }
}));
```

## Usage (database operation)

### Create (model, obj)
Create data.  
return created data object.
```
drmg.create(model, { foo: 'abc', bar: 123 });
```

### Find (model, conditions)
Find data.  
return find data objects array.  
Tips: If no result, resolve "no content".
```
drmg.find(model, { foo: 'abc' });
```

### FindOne (model, conditions)
Find data once.  
return find data object.  
Tips: If no result, reject "not found".
```
drmg.findOne(model, { foo: 'abc' });
```

### FindById (model, objectId)
Find data from ID.  
return find data object.  
Tips: If no result, reject "not found".
```
drmg.findById(model, 1234567890abcdef12345678);
```

### Update (model, objectId, obj)
Update data.  
return updated data object.
```
drmg.update(model, 1234567890abcdef12345678, { foo: 'xyz', bar: 456 });
```

### Remove (model, objectId)
Remove data.  
return null.
```
drmg.remove(model, 1234567890abcdef12345678);
```

## Usage (optional)

### Resolve ()
This is useful when you want to continue the process.  
if undefined or null arguments, return resolve "continue."  
if empty array arguments, return resolve "no content."  
if other arguments, return resolve "success."
```
drmg.resolve(opt_args);
```

### BadRequest ()
return reject "400 Bad Request"
```
drmg.badRequest();
```

### Unauthorized ()
return reject "401 Unauthorized"
```
drmg.unauthorized();
```

### Forbidden ()
return reject "403 Forbidden"
```
drmg.forbidden();
```

### NotFound ()
return reject "404 Not Found"
```
drmg.notFound();
```

### Conflict ()
return reject "409 Conflict"
```
drmg.conflict();
```

### Teapot ()
return reject "418 I'm a teapot"
```
drmg.teapot();
```

### All (Array<promises>)
This is customized Promise.all().  
if onFulfilled, each status will be omitted.
```
drmg.all([drmg.find(), drmg.find(), drmg.find()]);
```

### Response (res, promises)
This is useful when you are using the "Express".  
execute `res.status()` and `res.json()` .
```
drmg.response(res, drmg.someFunction());
```

## Example
drossel-mongoose returns Promises.  
results included status and data.
```
drmg.find(model, {}).then(function(result) {
  console.log(result);
});

// {
//   status: {
//     code: 200,
//     message: 'success.'
//   },
//   data: [{ foo: 'abc', bar: 123 }]
// }
```

If you're using the Express framework,  
it can response the `res.status()` and `res.json()`, when you use the `drmg.response()`.
```
var router = express.Router();
router.get('/:id?', function(req, res, next) {
  drmg.response(res, drmg.findById(model, req.params.id));
};
```
