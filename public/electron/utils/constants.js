require('dotenv').config()


exports.GetENV = () => {
    return process.env;
}

exports.NUMBER_OF_BARS = process.env.NUMBER_OF_BARS;

exports.SHOW_FILEMENU = process.env.SHOW_FILEMENU == "true" || false;

exports.HIDE_DEVTOOLS = process.env.HIDE_DEVTOOLS == "true" || false;

exports.WINDOW = {
    size    : {
        x   : parseInt(process.env.SIZE_X),
        y   : parseInt(process.env.SIZE_Y),
    },
    position    : {
        x   : parseInt(process.env.POSITION_X),
        y   : parseInt(process.env.POSITION_Y),
    }
};
