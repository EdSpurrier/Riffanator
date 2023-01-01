const standardSizes = {
    zero            : "0px",
    micro           : "5px",
    tiny            : "10px",
    small           : "25px",
    small_medium    : "40px",
    medium          : "50px",
    large           : "75px",
    panels          : {
        width : {
            small   : "300px",
            medium  : "500px",
            large   : "750px",
        }
    },

    gutters : {
        micro           : "5px",
        tiny            : "10px",
        small           : "25px",
        small_medium    : "40px",
        medium          : "50px",
        large           : "75px",
    },

    padding : {
        micro           : "5px",
        tiny            : "10px",
        small           : "25px",
        small_medium    : "40px",
        medium          : "50px",
        large           : "75px",
    },

    grooveSkeleton      : {
        height : {
            track : "35px"
        }
    },

    tracks          : {
        height : {
            tiny    : "150px",
            small   : "200px",
            medium  : "400px",
            large   : "600px",
        }
    },
}

const sizes = {
    transport : {
        height  : standardSizes.medium,
        input   : {
            height : standardSizes.small,
            padding: standardSizes.micro,
        }
    },
    sideBar : {
        width   : standardSizes.medium
    },
    eventConsole : {
        width   : standardSizes.panels.width.large,
        padding : standardSizes.padding.small,
    },
    slidePanel : {
        width   : standardSizes.panels.width.large,
        padding : standardSizes.padding.small,
    },


    grooveSkeleton : {

        controlBar : {
            paddingHorizontal: standardSizes.tiny,
        },
        track : {
            height              : standardSizes.grooveSkeleton.height.track,
            marginHorizontal   : standardSizes.gutters.small,
            marginVertical     : standardSizes.zero,
        }
    
      },


    instrumentTrack : {
        controlBar : {
            height: standardSizes.small_medium,
            paddingHorizontal: standardSizes.tiny, 
        },

        marginVertical : standardSizes.medium,
        paddingVertical : standardSizes.small,


    },

    guitarInstrumentTrack : {
        marginVertical : standardSizes.medium,
        paddingVertical : standardSizes.tiny,  

        trackScore : {
            height          : standardSizes.tracks.height.tiny,
            marginVertical : 0,
            paddingVertical : 0,
        }
    },

    trackScore : {
        height          : standardSizes.tracks.height.medium,
        marginVertical : standardSizes.small,
        paddingVertical : standardSizes.small,
    }
};
  
module.exports = sizes;
  