const standardColors = {

  black: '#000',
  white: '#fff',

  grey50: '#E0E0E0',
  grey100: '#F5F5F5',
  grey200: '#EEEEEE',
  grey300: '#E0E0E0',
  grey400: '#BDBDBD',
  grey500: '#9E9E9E',
  grey600: '#757575',
  grey700: '#616161',
  grey800: '#424242',
  grey900: '#212121',

  blueGrey50: '#ECEFF1',
  blueGrey100: '#CFD8DC',
  blueGrey200: '#B0BEC5',
  blueGrey300: '#90A4AE',
  blueGrey400: '#78909C',
  blueGrey500: '#607D8B',
  blueGrey600: '#546E7A',
  blueGrey700: '#455A64',
  blueGrey800: '#37474F',
  blueGrey900: '#263238',

  amberA100: '#FFE57F',
  amberA200: '#FFD740',
  amberA400: '#FFC400',
  amberA700: '#FFAB00',


  orangeA100: '#FFD180',
  orangeA200: '#FFAB40',
  orangeA400: '#FF9100',
  orangeA700: '#FF6D00',
}


const colors = {
  background    : standardColors.grey900,
  text          : standardColors.white,

  primary       : standardColors.blue500,
  primaryHover  : standardColors.blue900,


  instrumentTrack : {
    background  : standardColors.blueGrey900,
    text        : standardColors.white,

    guitar  : {
      background  : standardColors.blueGrey50,
    }

  },



  trackScore : {
    background  : standardColors.grey300,
    border      : standardColors.grey600,
    text        : standardColors.grey900,
    note  : {
      unselected  : standardColors.orangeA700,
      selected    : standardColors.amberA700,
      hover       : standardColors.amberA200,
    },
    
    lines : {
      beat        : standardColors.blueGrey400,
      bar         : standardColors.blueGrey700,
    }
  },




  dashboard : {
    button  : {
      unselected  : standardColors.grey500,
      selected    : standardColors.white,
      hover       : standardColors.grey200,
    },
    background: standardColors.grey900,
    border: standardColors.grey400,
    text: standardColors.white
  },

  transport : {
    button  : {
      unselected  : standardColors.grey500,
      selected    : standardColors.white,
      hover       : standardColors.grey200,
    },
    background: standardColors.grey800,
    border: standardColors.grey400,
    text: standardColors.white,
    input   : {
      background  : standardColors.grey600,
    } 

  },

  sideBar : {
    button  : {
      unselected  : standardColors.grey500,
      selected    : standardColors.white,
      hover       : standardColors.grey200,
    },
    background: standardColors.grey800,
    border: standardColors.grey400,
    text: standardColors.white,
  },

  dark : {
    background: standardColors.grey900,
    border: standardColors.black,
    text: standardColors.white,
  },

  eventConsole : {
    background: standardColors.grey700,
    border: standardColors.black,
    text: standardColors.black,
  },

  slidePanel : {
    background: standardColors.grey700,
    border: standardColors.black,
    text: standardColors.black,
  },



};

module.exports = colors;
