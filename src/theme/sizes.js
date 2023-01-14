const standardSizes = {
    zero: "0px",
    micro: "5px",
    tiny: "10px",
    small: "25px",
    small_medium: "40px",
    medium: "50px",
    large: "75px",

    spacing: {

    },

    panels: {
        width: {
            small: "300px",
            medium: "500px",
            large: "750px",
        }
    },

    borders: {
        top: "1px 0px 0px 0px",
        bottom: "0px 0px 1px 0px",
        left: "0px 0px 0px 1px",
        right: "0px 1px 0px 0px",
        vertical: "1px 0px 1px 0px",
        horizontal: "0px 1px 0px 1px",
        all: "1px 1px 1px 1px",
    },

    gutters: {
        micro: "5px",
        tiny: "10px",
        small: "25px",
        small_medium: "40px",
        medium: "50px",
        large: "75px",
    },

    padding: {
        micro: "5px",
        tiny: "10px",
        small: "25px",
        small_medium: "40px",
        medium: "50px",
        large: "75px",
    },

    grooveSkeleton: {
        height: {
            controlBar: "20px",
            track: "40px",
            guide: "7px"
        }
    },

    tracks: {
        height: {
            tiny: "150px",
            small: "200px",
            medium: "400px",
            large: "600px",
        }
    },
}

const sizes = {
    transport: {
        height: standardSizes.medium,
        input: {
            height: standardSizes.small,
            padding: standardSizes.micro,
        }
    },
    sideBar: {
        width: standardSizes.medium
    },
    eventConsole: {
        width: standardSizes.panels.width.large,
        padding: standardSizes.padding.small,
    },
    slidePanel: {
        width: standardSizes.panels.width.large,
        padding: standardSizes.padding.small,
    },


    machine : {
        paddingVertical: standardSizes.padding.micro,
        border: standardSizes.borders.vertical,
        paddingHorizontal: standardSizes.gutters.small,

        controlBar: {
            height: standardSizes.grooveSkeleton.height.controlBar,
            controlSpacingHorizontal: standardSizes.tiny,
            iconSpacingHorizontal: standardSizes.micro,
            marginBottom: standardSizes.padding.micro,
            input: {
                height: standardSizes.small,
                padding: standardSizes.micro,
            }
        },
    },

    grooveSkeleton: {

        paddingVertical: standardSizes.padding.micro,
        border: standardSizes.borders.vertical,
        paddingHorizontal: standardSizes.gutters.small,

        controlBar: {
            height: standardSizes.grooveSkeleton.height.controlBar,
            controlSpacingHorizontal: standardSizes.tiny,
            iconSpacingHorizontal: standardSizes.micro,
            marginBottom: standardSizes.padding.micro,
            input: {
                height: standardSizes.small,
                padding: standardSizes.micro,
            }
        },

        track: {
            height: standardSizes.grooveSkeleton.height.track,
            marginVertical: standardSizes.zero,
            marginBottom: standardSizes.padding.micro,
        },

        guide: {
            height: standardSizes.grooveSkeleton.height.guide,
        }

    },

    

    riffSettings: {
        border: standardSizes.borders.vertical,
        paddingVertical: standardSizes.padding.tiny,
        paddingHorizontal: standardSizes.gutters.small,

        controlBar: {
            height: standardSizes.grooveSkeleton.height.controlBar,
            paddingHorizontal: standardSizes.gutters.small,
            controlSpacingHorizontal: standardSizes.tiny,
            iconSpacingHorizontal: standardSizes.micro,
            marginBottom: standardSizes.padding.micro,
        },

    },


    pianoKeyboard: {
        paddingVertical: standardSizes.padding.micro,
        border: standardSizes.borders.all,
        marginHorizontal: standardSizes.gutters.small,

        key: {
            
        },

        whiteKey: {
            border: standardSizes.borders.horizontal,
        },

        blackKey: {

        }

    },



    instrumentTrack: {
        controlBar: {
            height: standardSizes.small_medium,
            paddingHorizontal: standardSizes.tiny,
        },

        marginVertical: standardSizes.medium,
        paddingVertical: standardSizes.small,


    },

    guitarInstrumentTrack: {
        marginVertical: standardSizes.medium,
        paddingVertical: standardSizes.tiny,

        trackScore: {
            height: standardSizes.tracks.height.tiny,
            marginVertical: 0,
            paddingVertical: 0,
        }
    },

    trackScore: {
        height: standardSizes.tracks.height.medium,
        marginVertical: standardSizes.small,
        paddingVertical: standardSizes.small,
    }
};

module.exports = sizes;
