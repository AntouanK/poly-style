
# poly-style

poly-filling CSS attributes, for react style objects.

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
{ display: '-webkit-box;display: -moz-box;display: -ms-flexbox;display: -webkit-flex;display: flex',
  flexDirection: 'column',
  MsFlexDirection: 'column',
  WebkitFlexDirection: 'column'
}
*/
```
