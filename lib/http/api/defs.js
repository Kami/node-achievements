var swiz = require('swiz');
var o = swiz.struct.Obj;
var f = swiz.struct.Field;
var Chain = swiz.Chain;


exports.defs = [
  o('users',
    {
      'fields': [
        f('id', {'ignorePublic': true, 'attribute': true}),
        f('username', {'val' : new Chain().isString().notEmpty()}),
        f('email', {'val' : new Chain().isEmail().notEmpty()}),
        f('aliases', {'val' : new Chain().isArray(new Chain().isString())}),
        f('points', {'ignorePublic': true}),
      ],

      'singular': 'user',
      'plural': 'users'
    }),

  o('providers',
    {
      'fields': [
        f('id', {'ignorePublic': true, 'attribute': true}),
        f('name', {'val' : new Chain().isString().notEmpty()}),
        f('description', {'val' : new Chain().isString().optional()})
      ],

      'singular': 'provider',
      'plural': 'providers'
    }),
];


exports.validity = swiz.defToValve(exports.defs);
