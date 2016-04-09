
# poly-style

poly-filling CSS attributes, for react style objects.

*Updated for React v15.* Poly-filling is now happening after attribute checking in the browser runtime. Only needed attributes are added.

# example

``` js
var polyStyle = require('poly-style');

var styleObj = polyStyle({
  display: 'flex',
  flexDirection: 'column'
});

//...
  <div style={styleObj}>
    //...
  </div>

/*
> styleObj
{
  //  if in IE for example
  display: '-ms-flexbox',
  flexDirection: 'column',
  msFlexDirection: 'column'
}
*/
```

## Attributes supported
  - display: 'flex'
  - flex
  - order
  - flex-direction
  - align-items
  - justify-content
  - flex-wrap
  - transform
  - user-select
