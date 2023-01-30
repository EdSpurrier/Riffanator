const standardColors = {
  grey50:   '#E0E0E0',
  grey100:  '#F5F5F5',

  black: '#000',
  white: '#fff',

  
  blue50 : "#e3f2fd",
  blue100 : "#bbdefb",
  blue200 : "#90caf9",
  blue300 : "#64b5f6",
  blue400 : "#42a5f5",
  blue500 : "#2196f3",
  blue600 : "#1e88e5",
  blue700 : "#1976d2",
  blue800 : "#1565c0",
  blue900 : "#0d47a1",

  
  cyan50  : "#e0f7fa",
  cyan100 : "#b2ebf2",
  cyan200 : "#80deea",
  cyan300 : "#4dd0e1",
  cyan400 : "#26c6da",
  cyan500 : "#00bcd4",
  cyan600 : "#00acc1",
  cyan700 : "#0097a7",
  cyan800 : "#00838f",
  cyan900 : "#006064",

  purple50    : "#f3e5f5",
  purple100   : "#e1bee7",
  purple200   : "#ce93d8",
  purple300   : "#ba68c8",
  purple400   : "#ab47bc",
  purple500   : "#9c27b0",
  purple600   : "#8e24aa",
  purple700   : "#7b1fa2",
  purple800   : "#6a1b9a",
  purple900   : "#4a148c",

  tealGreen50   : "#e0f2f1",
  tealGreen100  : "#b2dfdb",
  tealGreen200  : "#80cbc4",
  tealGreen300  : "#4db6ac",
  tealGreen400  : "#26a69a",
  tealGreen500  : "#009688",
  tealGreen600  : "#00897b",
  tealGreen700  : "#00796b",
  tealGreen800  : "#00695c",
  tealGreen900  : "#004d40",

  grey50:   '#E0E0E0',
  grey100:  '#F5F5F5',
  grey200:  '#EEEEEE',
  grey300:  '#E0E0E0',
  grey400:  '#BDBDBD',
  grey500:  '#9E9E9E',
  grey600:  '#757575',
  grey700:  '#616161',
  grey750:  '#525252',
  grey800:  '#424242',
  grey850:  '#313131',
  grey900:  '#212121',
  grey950:  '#141414',
  grey1000: '#101010',

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

  brown50   : "#efebe9",
  brown100  : "#d7ccc8",
  brown200  : "#bcaaa4",
  brown300  : "#a1887f",
  brown400  : "#8d6e63",
  brown500  : "#795548",
  brown600  : "#6d4c41",
  brown700  : "#5d4037",
  brown800  : "#4e342e",
  brown900  : "#3e2723",

  
  yellow50    : "#fffde7",
  yellow100   : "#fff9c4",
  yellow200   : "#fff59d",
  yellow300   : "#fff176",
  yellow400   : "#ffee58",
  yellow500   : "#ffeb3b",
  yellow600   : "#fdd835",
  yellow700   : "#fbc02d",
  yellow800   : "#f9a825",
  yellow900   : "#f57f17",

  indigo50    : "#e8eaf6",
  indigo100   : "#c5cae9",
  indigo200   : "#9fa8da",
  indigo300   : "#7986cb",
  indigo400   : "#5c6bc0",
  indigo500   : "#3f51b5",
  indigo600   : "#3949ab",
  indigo700   : "#303f9f",
  indigo800   : "#283593",
  indigo900   : "#1a237e",
  
  amberA100: '#FFE57F',
  amberA200: '#FFD740',
  amberA400: '#FFC400',
  amberA700: '#FFAB00',


  orangeA100: '#FFD180',
  orangeA200: '#FFAB40',
  orangeA400: '#FF9100',
  orangeA700: '#FF6D00',

  deepOrange50    : "#fbe9e7",
  deepOrange100   : "#ffccbc",
  deepOrange200   : "#ffab91",
  deepOrange300   : "#ff8a65",
  deepOrange400   : "#ff7043",
  deepOrange500   : "#ff5722",
  deepOrange600   : "#f4511e",
  deepOrange700   : "#e64a19",
  deepOrange800   : "#d84315",
  deepOrange900   : "#bf360c",



  green700: '#689F38',
  green900: '#33691E',

  cyan200: '#80DEEA',
  cyan600: '#0097A7',
  
  red900: '#B71C1C',
}


const colors = {
  background    : standardColors.grey900,
  text          : standardColors.white,

  primary       : standardColors.blue500,
  primaryHover  : standardColors.blue900,

  midiCore : {
    background  : standardColors.grey850,
    text        : standardColors.white,
    border      : standardColors.grey800,
  },


  riffSettings : {
    background  : standardColors.grey850,
    text        : standardColors.white,
    border      : standardColors.grey800,
  },


  machine       : {
    background  : standardColors.grey850,
    text        : standardColors.white,
    border      : standardColors.grey800,

    controlBar : {
      background  : standardColors.grey850,
      text        : standardColors.white,
      icon        : standardColors.white,
    },

    tablature   : {
        noteOn          : standardColors.cyan600,
        selected        : standardColors.cyan300,
        hover           : standardColors.cyan500,
        noteOff         : standardColors.grey800,
    },

    fretboard   : {
      background        : standardColors.grey700,
      horizontalBorder  : standardColors.grey850,
      verticalBorder    : standardColors.grey850,
      text              : standardColors.black,
      icon              : standardColors.black,
      tuningText        : standardColors.white,
      singleDotFret     : standardColors.grey750,
      doubleDotFret     : standardColors.grey800,
      fretHover         : standardColors.grey600,
      fretNote          : {
          background : standardColors.amberA400,
          text : standardColors.black,
      }
    }
  },


  controlBar : {
    button  : {
      unselected  : standardColors.grey600,
      selected    : standardColors.white,
      hover       : standardColors.grey200,
    },
  },

  grooveSkeleton : {
    background  : standardColors.grey850,
    text        : standardColors.white,
    border      : standardColors.grey800,

    controlBar : {
      background  : standardColors.grey850,
      text        : standardColors.white,
      icon        : standardColors.white,
    },

    track : {
      background      : standardColors.blueGrey700,
      text            : standardColors.black,
      noteOn          : standardColors.green700,
      noteOff         : standardColors.red900,
      noteBorder      : standardColors.black,
      positionMarker  : standardColors.orangeA400,

      guideBackground : standardColors.blueGrey900,
      guideBar        : standardColors.blueGrey200,
      guideBeat       : standardColors.blueGrey300,
      guideNote       : standardColors.blueGrey700,
      guidePlayMarker : standardColors.red900,

    }

  },


  pianoKeyboard : {
    background  : standardColors.grey850,
    text        : standardColors.white,
    border      : standardColors.grey800,

    key : {
      border              : standardColors.grey800,
      onHoverBackground   : standardColors.orangeA200,
      activeBackground    : standardColors.tealGreen700,
    },

    whiteKey : {
      background          : standardColors.white,
    },

    blackKey : {
      background          : standardColors.grey1000,
    },

  },



  instrumentTrack : {
    background  : standardColors.blueGrey900,
    text        : standardColors.white,

    guitar  : {
      background  : standardColors.blueGrey50,
      slice       : standardColors.grey400,
      border      : standardColors.grey400,

      slice      : {
        noteOn      : standardColors.green700,
        noteOff     : standardColors.red900,

        selected    : standardColors.amberA700,
        hover       : standardColors.grey700,
      },

      string      : {
        noteOn      : standardColors.green700,
        noteOff     : standardColors.red900,

        selected    : standardColors.orangeA400,
        hover       : standardColors.orangeA200,
      }
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
    background: standardColors.grey1000,
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
    },
    slider  : {
      background  : standardColors.grey850,
      thumb       : standardColors.white,
      range       : standardColors.grey700,
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
