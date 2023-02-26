const { default: Music } = require("./Music");

exports.config = {

    tempo: 105,
    number_of_bars: 8,
    loop: {
        from: 1,
        to: 1,
    },

   

    fileManager: {
        saveFolder: '',
        fileName: 'riffname-[tag].json'
    },

    riffSettings : {
        riffName    : 'Riff Name',
        rootOctave  : 2,
        bars        : 4,
        scale  : {
            rootNote    : 'A',
            type        : Music.getScaleByName('Minor').type,
        },
    },

    generator : {
        settings: {
            grooveSkeleton: {
                note_chance : {
                    length_1: 0,
                    length_2: 0,
                    length_4: 0,
                    length_8: 30,
                    length_16: 45,
                    length_32: 22,
                }
            },

            guitarMachine: {
                
            }
        }
    },

    grooveSkeleton: {
        resolution      : 32,
        outputOctave    : 2,
        playStyle       : 'chugga',
        midi            : {
            output          : {
                name    : 'Riffanator [GrooveSkeleton]',
                id      : 0
            },
        }
    },

    guitarMachine: {
        machines        : [
            {
                rootOctave      : 1,
                fretCount       : 24,
                midi            : {
                    output          : {
                        name    : 'Riffanator [Guitar 1]',
                        id      : 0
                    },
                },
                guitar          : null,
                tablature       : [
        
                ],
            },
            {
                rootOctave      : 1,
                fretCount       : 24,
                midi            : {
                    output          : {
                        name    : 'Riffanator [Guitar 2]',
                        id      : 0
                    },
                },
                guitar          : null,
                tablature       : [
        
                ],
            }
        ]
        
    },

};