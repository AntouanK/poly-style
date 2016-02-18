
var polyStyle = require('../src');
var test = require('tape');
var ERROR_TYPE = 'ERROR_TYPE';

//  every spec specifies:
//  name
//  input value
//  output value
//  type ( ERROR_TYPE if it throws )

var specs = [
  {
    testName: 'null input',
    in: null,
    type: ERROR_TYPE
  },

  {
    testName: 'string input',
    in: '',
    type: ERROR_TYPE
  },

  {
    testName: 'empty object input',
    in: {},
    out: {}
  },

  {
    testName: 'display: block',
    in: {
      display: 'block'
    },
    out: {
      display: 'block'
    }
  },

  {
    testName: 'display: flex',
    in: {
      display: 'flex'
    },
    out: {
      display: '-webkit-box;display: -moz-box;display: -ms-flexbox;display: -webkit-flex;display: flex'
    }
  },

  {
    testName: 'flex: `1 0`',
    in: {
      flex: '1 0'
    },
    out: {
      flex: '1 0',
      MsFlex: '1 0',
      WebkitFlex: '1 0',
    }
  },

  {
    testName: `order: '1'`,
    in: {
      order: '1'
    },
    out: {
      order: '1',
      MsFlexOrder: '1',
      WebkitOrder: '1',
    }
  },

  {
    testName: `flex-direction: column`,
    in: {
      flexDirection: 'column'
    },
    out: {
      flexDirection: 'column',
      MsFlexDirection: 'column',
      WebkitFlexDirection: 'column'
    }
  },

  {
    testName: `align-items: flex-start`,
    in: {
      alignItems: 'flex-start'
    },
    out: {
      alignItems: 'flex-start',
      MsFlexAlign: 'start',
      WebkitAlignItems: 'flex-start',
    }
  },

  {
    testName: `align-items: flex-end`,
    in: {
      alignItems: 'flex-end'
    },
    out: {
      alignItems: 'flex-end',
      MsFlexAlign: 'end',
      WebkitAlignItems: 'flex-end',
    }
  },

  {
    testName: `justify-content: flex-start`,
    in: {
      justifyContent: 'flex-start'
    },
    out: {
      justifyContent: 'flex-start',
      MsFlexPack: 'start',
      WebkitJustifyContent: 'flex-start',
    }
  },

  {
    testName: `justify-content: flex-end`,
    in: {
      justifyContent: 'flex-end'
    },
    out: {
      justifyContent: 'flex-end',
      MsFlexPack: 'end',
      WebkitJustifyContent: 'flex-end',
    }
  },

  {
    testName: `justify-content: space-around`,
    in: {
      justifyContent: 'space-around'
    },
    out: {
      justifyContent: 'space-around',
      MsFlexPack: 'distribute',
      WebkitJustifyContent: 'space-around',
    }
  },

  {
    testName: `justify-content: space-between`,
    in: {
      justifyContent: 'space-between'
    },
    out: {
      justifyContent: 'space-between',
      MsFlexPack: 'justify',
      WebkitJustifyContent: 'space-between',
    }
  },

  {
    testName: `flex-wrap: wrap`,
    in: {
      flexWrap: 'wrap'
    },
    out: {
      flexWrap: 'wrap',
      MsFlexWrap: 'wrap',
      WebkitFlexWrap: 'wrap',
    }
  },

  {
    testName: `transform: 'scale(1)'`,
    in: {
      transform: 'scale(1)'
    },
    out: {
      transform: 'scale(1)',
      MsTransform: 'scale(1)',
      MozTransform: 'scale(1)',
      WebkitTransform: 'scale(1)'
    }
  },

  {
    testName: `user-select: none`,
    in: {
      userSelect: 'none'
    },
    out: {
      userSelect: 'none',
      MsUserSelect: 'none',
      MozUserSelect: 'none',
      WebkitUserSelect: 'none'
    }
  }
];



test('test poly-style', function (t) {

  t.plan(specs.length);

  specs
  .forEach(spec => {

    if(spec.type === ERROR_TYPE){
      t.throws(
        polyStyle.bind(null, spec.in),
        spec.testName
      );
    }
    else {
      t.deepEquals(
        //  passing "in" to polyStyle...
        polyStyle(spec.in),
        //  should gives us "out"
        spec.out,
        spec.testName
      )
    }
  })

});
