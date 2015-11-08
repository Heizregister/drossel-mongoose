# drossel
drossel - Unnecessary mongoose wrapper


[![NPM](https://nodei.co/npm/drossel.png)](https://nodei.co/npm/drossel/)

## Install
step1: npm install
```
npm install drossel
```

step2: require and prepare mongoose.model
```
var drossel = require('drossel');
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
drossel.create(model, { foo: 'abc', bar: 123 });
```

### Find (model, conditions)
Find data.  
return find data objects array.  
Tips: If no result, resolve "no content".
```
drossel.find(model, { foo: 'abc' });
```

### FindById (model, objectId)
Find data from ID.  
return find data object.  
Tips: If no result, reject "not found".
```
drossel.findById(model, 1234567890abcdef12345678);
```

### Update (model, objectId, obj)
Update data.  
return updated data object.
```
drossel.update(model, 1234567890abcdef12345678, { foo: 'xyz', bar: 456 });
```

### Remove (model, objectId)
Remove data.  
return null.
```
drossel.remove(model, 1234567890abcdef12345678);
```

### Teapot
Only available as a dummy.
```
drossel.teapot();
```

## Example

drossel returns Promises.  
results included status and data.
```
drossel.find(model, {}).then(function(result) {
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
it can response the `res.status()` and `res.json()`, when you use the `drossel.response()`.
```
var router = express.Router();
router.get('/:id?', function(req, res, next) {
  drossel.response(res, drossel.findById(model, req.params.id));
};
```
