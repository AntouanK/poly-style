
'use strict';

var isObject = require('./isObject');

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
var polyStyle = (styleObj) => {

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
    styleObj.display = `-webkit-box;display: -moz-box;display: -ms-flexbox;display: -webkit-flex;display: flex`;
  }

  //  flex
  if(typeof styleObj.flex === 'string'){
    styleObj.MsFlex = styleObj.flex;
    styleObj.WebkitFlex = styleObj.flex;
  }

  //  order
  if(typeof styleObj.order === 'string'){
    styleObj.MsFlexOrder = styleObj.order;
    styleObj.WebkitOrder = styleObj.order;
  }

  //  flex-direction
  if(typeof styleObj.flexDirection === 'string'){
    styleObj.MsFlexDirection = styleObj.flexDirection;
    styleObj.WebkitFlexDirection = styleObj.flexDirection;
  }

  //  align-items
  if(typeof styleObj.alignItems === 'string'){
    if(styleObj.alignItems === 'flex-start'){
      styleObj.MsFlexAlign = 'start';
    }
    else if(styleObj.alignItems === 'flex-end'){
      styleObj.MsFlexAlign = 'end';
    }
    else {
      styleObj.MsFlexAlign = styleObj.alignItems;
    }
    styleObj.WebkitAlignItems = styleObj.alignItems;
  }

  //  justify-content
  if(typeof styleObj.justifyContent === 'string'){
    if(styleObj.justifyContent === 'space-between'){
      styleObj.MsFlexPack = 'justify';
    }
    else if(styleObj.justifyContent === 'space-around'){
      styleObj.MsFlexPack = 'distribute';
    }
    else if(styleObj.justifyContent === 'flex-start'){
      styleObj.MsFlexPack = 'start';
    }
    else if(styleObj.justifyContent === 'flex-end'){
      styleObj.MsFlexPack = 'end';
    }
    styleObj.WebkitJustifyContent = styleObj.justifyContent;
  }

  //  flex-wrap
  if(typeof styleObj.flexWrap === 'string'){
    styleObj.MsFlexWrap = styleObj.flexWrap;
    styleObj.WebkitFlexWrap = styleObj.flexWrap;
  }

  //  transform
  if(typeof styleObj.transform === 'string'){
    styleObj.MsTransform = styleObj.transform;
    styleObj.MozTransform = styleObj.transform;
    styleObj.WebkitTransform = styleObj.transform;
  }

  //  userSelect
  if(typeof styleObj.userSelect === 'string'){
    styleObj.WebkitUserSelect = styleObj.userSelect;
    styleObj.MozUserSelect = styleObj.userSelect;
    styleObj.MsUserSelect = styleObj.userSelect;
  }

  return styleObj;
};

module.exports = polyStyle;
