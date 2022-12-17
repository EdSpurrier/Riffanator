const standardSizes = {
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
    padding : {
        micro           : "5px",
        tiny            : "10px",
        small           : "25px",
        small_medium    : "40px",
        medium          : "50px",
        large           : "75px",
    }
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
    }
};
  
module.exports = sizes;
  