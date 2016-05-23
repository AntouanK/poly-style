
'use strict';

var isObject = require('./isObject');
var testEle = document.createElement('div');

var MODE = 'LATEST';

if(!testEle.style){
  throw new Error('no style object in the test element');
}

//  IE
if(typeof testEle.style['-ms-flex-direction'] === 'string'){
  MODE = 'OLD-IE';
}
//  Safari ( iOS )
else if(
  typeof testEle.style.webkitAlignItems === 'string' &&
  typeof testEle.style.flex !== 'string'
){
  MODE = 'OLD-SAFARI'
}

var displayFn = (function() {
  //  IE
  if(MODE === 'OLD-IE'){
    return function(styleObj) {
      if(styleObj.display === 'flex'){ styleObj.display = '-ms-flexbox'; }
    }
  }
  //  Safari ( iOS )
  else if(MODE === 'OLD-SAFARI'){
    return function(styleObj) {
      if(styleObj.display === 'flex'){ styleObj.display = '-webkit-flex'; }
    }
  }
  //  anything else, 'flex' works
  else if(MODE === 'LATEST'){
    return function() {};
  }
})();

var flexFn = (function() {
  //  IE
  if(MODE === 'OLD-IE'){
    return function(styleObj) { styleObj.msFlex = styleObj.flex; }
  }
  //  Safari ( iOS )
  else if(MODE === 'OLD-SAFARI'){
    return function(styleObj) { styleObj.WebkitFlex = styleObj.flex; }
  }
  else if(MODE === 'LATEST'){
    return function() {};
  }
})();

var flexOrderFn = (function() {
  //  IE
  if(MODE === 'OLD-IE'){
    return function(styleObj) { styleObj.msFlexOrder = styleObj.order; }
  }
  //  Safari ( iOS )
  else if(MODE === 'OLD-SAFARI'){
    return function(styleObj) { styleObj.WebkitOrder = styleObj.order; }
  }
  else if(MODE === 'LATEST'){
    return function() {};
  }
})();

var flexDirectionFn = (function() {
  //  IE
  if(MODE === 'OLD-IE'){
    return function(styleObj) {
      styleObj.msFlexDirection = styleObj.flexDirection;
    }
  }
  //  Safari ( iOS )
  else if(MODE === 'OLD-SAFARI'){
    return function(styleObj) {
      styleObj.WebkitFlexDirection = styleObj.flexDirection;
    }
  }
  else if(MODE === 'LATEST'){
    return function() {};
  }
})();

var flexAlignItemsFn = (function() {
  //  IE
  if(MODE === 'OLD-IE'){
    return function(styleObj) {
      if(styleObj.alignItems === 'flex-start'){
        styleObj.msFlexAlign = 'start';
      }
      else if(styleObj.alignItems === 'flex-end'){
        styleObj.msFlexAlign = 'end';
      }
      else {
        styleObj.msFlexAlign = styleObj.alignItems;
      }
    }
  }
  //  Safari ( iOS )
  else if(MODE === 'OLD-SAFARI'){
    return function(styleObj) {
      styleObj.WebkitAlignItems = styleObj.alignItems;
    }
  }
  else if(MODE === 'LATEST'){
    return function() {};
  }
})();

var justifyContentFn = (function() {
  //  IE
  if(MODE === 'OLD-IE'){
    return function(styleObj) {
      if(styleObj.justifyContent === 'space-between'){
        styleObj.msFlexPack = 'justify';
      }
      else if(styleObj.justifyContent === 'space-around'){
        styleObj.msFlexPack = 'distribute';
      }
      else if(styleObj.justifyContent === 'flex-start'){
        styleObj.msFlexPack = 'start';
      }
      else if(styleObj.justifyContent === 'flex-end'){
        styleObj.msFlexPack = 'end';
      }
      else if(styleObj.justifyContent === 'center'){
        styleObj.msFlexPack = 'center';
      }
    }
  }
  //  Safari ( iOS )
  else if(MODE === 'OLD-SAFARI'){
    return function(styleObj) {
      styleObj.WebkitJustifyContent = styleObj.justifyContent;
    }
  }
  else if(MODE === 'LATEST'){
    return function() {};
  }
})();

var flexWrapFn = (function() {
  //  IE
  if(MODE === 'OLD-IE'){
    return function(styleObj) { styleObj.msFlexWrap = styleObj.flexWrap; }
  }
  //  Safari ( iOS )
  else if(MODE === 'OLD-SAFARI'){
    return function(styleObj) { styleObj.WebkitFlexWrap = styleObj.flexWrap; }
  }
  else if(MODE === 'LATEST'){
    return function() {};
  }
})();

var transformFn = (function() {
  //  IE
  if(MODE === 'OLD-IE'){
    return function(styleObj) { styleObj.msTransform = styleObj.transform; }
  }
  //  Safari ( iOS )
  else if(MODE === 'OLD-SAFARI'){
    return function(styleObj) { styleObj.WebkitTransform = styleObj.transform; }
  }
  else if(typeof testEle.style['-moz-transform'] === 'string'){
    return function(styleObj) { styleObj.MozTransform = styleObj.transform; }
  }
  else if(MODE === 'LATEST'){
    return function() {};
  }
})();

var userSelectFn = (function() {
  //  IE
  if(MODE === 'OLD-IE'){
    return function(styleObj) { styleObj.msUserSelect = styleObj.userSelect; }
  }
  //  Safari ( iOS )
  else if(MODE === 'OLD-SAFARI'){
    return function(styleObj) { styleObj.WebkitUserSelect = styleObj.userSelect; }
  }
  else if(typeof testEle.style['-moz-transform'] === 'string'){
    return function(styleObj) { styleObj.MozUserSelect = styleObj.userSelect; }
  }
  else if(MODE === 'LATEST'){
    return function() {};
  }
})();



//  pass a react-style object, and get back that same object,
//  with extra fields if needed, to polyfill CSS attributes
/*
  example:
  {
    display: 'flex',
    flex: '1 0 auto',
    flexDirection: 'column',

  }
*/
var polyStyle = function polyStyle(styleObj) {

  if(!isObject(styleObj)){
    throw new Error('Style value given is not an Object!');
  }

  //  display: flex ->
  //                    display: -webkit-flexbox
  //                    display: -moz-box
  //                    display: -ms-flexbox
  //                    display: -webkit-flex
  //                    display: flex
  if(styleObj.display === 'flex'){
    displayFn(styleObj);
  }

  //  flex
  if(typeof styleObj.flex === 'string'){
    flexFn(styleObj);
  }

  //  order
  if(typeof styleObj.order === 'string'){
    flexOrderFn(styleObj);
  }

  //  flex-direction
  if(typeof styleObj.flexDirection === 'string'){
    flexDirectionFn(styleObj);
  }

  //  align-items
  if(typeof styleObj.alignItems === 'string'){
    flexAlignItemsFn(styleObj);
  }

  //  justify-content
  if(typeof styleObj.justifyContent === 'string'){
    justifyContentFn(styleObj);
  }

  //  flex-wrap
  if(typeof styleObj.flexWrap === 'string'){
    flexWrapFn(styleObj);
  }

  //  transform
  if(typeof styleObj.transform === 'string'){
    transformFn(styleObj);
  }

  //  userSelect
  if(typeof styleObj.userSelect === 'string'){
    userSelectFn(styleObj);
  }

  return styleObj;
};

module.exports = polyStyle;
