exports.config = {

    tempo: 120,
    number_of_bars: 8,
    loop: {
        from: 1,
        to: 4,
    },


    grooveSkeleton: {
        resolution      : 32,
        outputOctave    : 1,
        playStyle       : 'chugga',
        midi            : {
            output          : {
                name    : 'Riff Generator',
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
                        name    : 'Riff Generator [Guitar A]',
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
                        name    : 'Riff Generator [Guitar B]',
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