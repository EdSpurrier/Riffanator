const standardFontSizes = {
    micro           : "5px",
    tiny            : "8px",
    small           : "12px",
    small_medium    : "14px",
    medium          : "16px",
    medium_large    : "18px",
    large           : "22px",
    xlarge          : "26px",
}

const fontSizes = {
    standard : standardFontSizes,
    note    : standardFontSizes.small,
    body    : standardFontSizes.small_medium,
    h1      : standardFontSizes.xlarge,
    h2      : standardFontSizes.large,
    h3      : standardFontSizes.medium_large,
    h4      : standardFontSizes.medium,

    machine : {
        controlBar : standardFontSizes.small,
    },

    grooveSkeleton : {
        controlBar : standardFontSizes.small,
    },

    riffSettings : {
        controlBar : standardFontSizes.small,
    }
}

module.exports = fontSizes;