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

## Usage

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

### Remove (model, conditions)
Remove data.  
return null.
```
drmg.remove(model, { _id: 1234567890abcdef12345678 });
```

### All (array)
Promise.all for drossel-mongoose.  
return drossel-mongoose response.
```
drmg.all([
  drmg.find(model, {foo: 'foo'}),
  drmg.remove(model, {bar: 'bar'})
]);
```

### status
return HTTP status code list.  
ex) SUCCESS, NOT_FOUND, BAD_REQUEST, TEAPOT, ...
```
console.log(drmg.status.SUCCESS) //200
```

### response (status, data)
return custom drossel-mongoose response.
```
drmg.response(drmg.status.SUCCESS, {
  lgtm: 'LGTM!'
}); // {status: 200, data: {lgtm: 'LGTM!'}}
```

### expressResponse (res, response)
useful to Express framework.  
Please refer to the example of use for more information.

## Example
drossel-mongoose returns Promises.  
results included status and data.
```
drmg.find(model, {}).then(function(result) {
  console.log(result);
});

// {
//   status: 200,
//   data: [{ foo: 'abc', bar: 123 }]
// }
```

If you're using the Express framework,  
it can response the `res.status()` and `res.json()`, when you use the `drmg.expressResponse()`.
```
var router = express.Router();
router.get('/:id?', function(req, res, next) {
  drmg.expressResponse(res, drmg.findById(model, req.params.id));
};
```

or, it can custom response.
```
var router = express.Router();
router.get('/', function(req, res, next) {
  drmg.expressResponse(res, drmg.response(drmg.status.SUCCESS, {
    lgtm: 'Looks Good To Me!'
  }));
});
```
