const Algorithms = {
    myOwnSickness : {
        name: 'My Own Sickness',

        chancePoints: [
            {
                // Chance is based off:
                //  1. The last note played
                //  2. Position in the beat & bar & riff
                //  3. Current beat


                //   This add chance up to create a chance total for each note from all the related data...

                noteData: {
                    //  Note data of which is in chance
                    scaleNoteId: 1,         //  Note Id in the set scale
                    octave: 1,              //  Lowest = 0 - related to lowest allowed note of that note on the guitar fretboard
                    typeof: 'single',       //  Single note or chord (different chord types here eg. octave chord)
                    playStyle: 'open',    //  Play style of note
                    length: 16,             //  Length of note
                    state: true,
                    positionChance: 
                        {
                            onBeat: 20,
                            positionInBeat: [
                                {
                                    value: 0,
                                    chance: 100,
                                },
                                {
                                    value: -1,      //  -1 means all the rest
                                    chance: 0,
                                },
                            ],
                            positionInBar: [
                                {
                                    value: 0,
                                    chance: 100,
                                },
                                {
                                    value: 0.5,
                                    chance: 10,
                                },
                                {
                                    value: -1,      //  -1 means all the rest
                                    chance: 0,
                                },
                            ],
                            positionInRiff: [
                                {
                                    value: 0,      //  -1 means all the rest
                                    chance: 100,
                                },
                            ],
                            currentBeat: [
                                {
                                    value: 0,
                                    chance: 100,
                                },
                                {
                                    value: 2,
                                    chance: 100,
                                },
                                {
                                    value: -1,      //  -1 means all the rest
                                    chance: 0,
                                },
                            ],
                        }
                    ,
                    rules : {
                        
                        wontFollow: [
                            {
                                scaleNoteId: 0,         //  Note Id in the set scale
                                octave: 1,              //  Lowest = 0 - related to lowest allowed note of that note on the guitar fretboard
                                typeof: null,           //  Single note or chord (different chord types here eg. octave chord)
                                playStyle: null,        //  Play style of note
                                length: null,           //  Length of note
                            }                         
                        ],

                        canFollow: [
                            {
                                //  Means this note CAN follow any of these notes
                                //  null value means that the variable isn't used in the calculation
                                scaleNoteId: 0,         //  Note Id in the set scale
                                octave: 0,              //  Lowest = 0 - related to lowest allowed note of that note on the guitar fretboard
                                typeof: 'single',       //  Single note or chord (different chord types here eg. octave chord)
                                playStyle: 'open',
                                chance: 50
                            }
                        ],

                        mustFollow: [
                            {
                                //  Means this note must follow a certain note    
                                //  null value means that the variable isn't used in the calculation
                                scaleNoteId: 0,         //  Note Id in the set scale
                                octave: 0,              //  Lowest = 0 - related to lowest allowed note of that note on the guitar fretboard
                                typeof: 'single',       //  Single note or chord (different chord types here eg. octave chord)
                                playStyle: 'open',
                                chance: 50
                            }
                        ]

                    }
                },
                
            },
            {
                // Chance is based off:
                //  1. The last note played
                //  2. Position in the beat & bar & riff
                //  3. Current beat


                //   This add chance up to create a chance total for each note from all the related data...

                noteData: {
                    //  Note data of which is in chance
                    scaleNoteId: 0,         //  Note Id in the set scale
                    octave: 1,              //  Lowest = 0 - related to lowest allowed note of that note on the guitar fretboard
                    typeof: 'single',       //  Single note or chord (different chord types here eg. octave chord)
                    playStyle: 'open',    //  Play style of note
                    length: 8,             //  Length of note
                    state: true,
                    positionChance: 
                        {
                            onBeat: 20,
                            positionInBeat: [
                                {
                                    value: 0,
                                    chance: 100,
                                },
                                {
                                    value: -1,      //  -1 means all the rest
                                    chance: 0,
                                },
                            ],
                            positionInBar: [
                                {
                                    value: 0,
                                    chance: 100,
                                },
                                {
                                    value: 0.5,
                                    chance: 10,
                                },
                                {
                                    value: -1,      //  -1 means all the rest
                                    chance: 0,
                                },
                            ],
                            positionInRiff: [
                                {
                                    value: 0,      //  -1 means all the rest
                                    chance: 100,
                                },
                            ],
                            currentBeat: [
                                {
                                    value: 0,
                                    chance: 100,
                                },
                                {
                                    value: 2,
                                    chance: 100,
                                },
                                {
                                    value: -1,      //  -1 means all the rest
                                    chance: 0,
                                },
                            ],
                        }
                    ,
                    rules : {
                        
                        wontFollow: [
                            {
                                scaleNoteId: 0,         //  Note Id in the set scale
                                octave: 1,              //  Lowest = 0 - related to lowest allowed note of that note on the guitar fretboard
                                typeof: null,           //  Single note or chord (different chord types here eg. octave chord)
                                playStyle: null,        //  Play style of note
                                length: null,           //  Length of note
                            }                         
                        ],

                        canFollow: [
                            {
                                //  Means this note CAN follow any of these notes
                                //  null value means that the variable isn't used in the calculation
                                scaleNoteId: 0,         //  Note Id in the set scale
                                octave: 0,              //  Lowest = 0 - related to lowest allowed note of that note on the guitar fretboard
                                typeof: 'single',       //  Single note or chord (different chord types here eg. octave chord)
                                playStyle: 'open',
                                chance: 50
                            }
                        ],

                        mustFollow: [
                            {
                                //  Means this note must follow a certain note    
                                //  null value means that the variable isn't used in the calculation
                                scaleNoteId: 0,         //  Note Id in the set scale
                                octave: 0,              //  Lowest = 0 - related to lowest allowed note of that note on the guitar fretboard
                                typeof: 'single',       //  Single note or chord (different chord types here eg. octave chord)
                                playStyle: 'open',
                                chance: 50
                            }
                        ]

                    }
                },
                
            },

            {
                // Chance is based off:
                //  1. The last note played
                //  2. Position in the beat & bar & riff
                //  3. Current beat


                //   This add chance up to create a chance total for each note from all the related data...

                noteData: {
                    //  Note data of which is in chance
                    scaleNoteId: 0,         //  Note Id in the set scale
                    octave: 0,              //  Lowest = 0 - related to lowest allowed note of that note on the guitar fretboard
                    typeof: 'single',       //  Single note or chord (different chord types here eg. octave chord)
                    playStyle: 'open',    //  Play style of note
                    length: 16,             //  Length of note
                    state: true,
                    positionChance: [
                        {
                            positionInBeat: [
                                {
                                    value: 0,
                                    chance: 0,
                                },
                                {
                                    value: -1,      //  -1 means all the rest
                                    chance: 100,
                                },
                            ],
                            positionInBar: [
                                {
                                    value: 0,
                                    chance: 0,
                                },
                                {
                                    value: 0.5,
                                    chance: 50,
                                },
                                {
                                    value: -1,      //  -1 means all the rest
                                    chance: 100,
                                },
                            ],
                            positionInRiff: [
                                {
                                    value: 0,      //  -1 means all the rest
                                    chance: 0,
                                },
                                {
                                    value: -1,      //  -1 means all the rest
                                    chance: 100,
                                },
                            ],
                            currentBeat: [
                                {
                                    value: -1,      //  -1 means all the rest
                                    chance: 100,
                                },
                            ],
                        }
                    ],
                    rules : {
                        
                        wontFollow: [
                                           
                        ],

                        canFollow: [
                            {
                                //  Means this note CAN follow any of these notes
                                //  null value means that the variable isn't used in the calculation
                                scaleNoteId: 0,         //  Note Id in the set scale
                                octave: 1,              //  Lowest = 0 - related to lowest allowed note of that note on the guitar fretboard
                                typeof: 'single',       //  Single note or chord (different chord types here eg. octave chord)
                                playStyle: null,
                                chance: 50
                            },
                            {
                                //  Means this note CAN follow any of these notes
                                //  null value means that the variable isn't used in the calculation
                                scaleNoteId: 0,         //  Note Id in the set scale
                                octave: 0,              //  Lowest = 0 - related to lowest allowed note of that note on the guitar fretboard
                                typeof: 'single',       //  Single note or chord (different chord types here eg. octave chord)
                                playStyle: null,
                                chance: 50
                            }
                        ],

                        mustFollow: [
                            {
                                //  Means this note must follow a certain note    
                                //  null value means that the variable isn't used in the calculation
                                scaleNoteId: 0,         //  Note Id in the set scale
                                octave: 1,              //  Lowest = 0 - related to lowest allowed note of that note on the guitar fretboard
                                typeof: 'single',       //  Single note or chord (different chord types here eg. octave chord)
                                playStyle: 'open',
                                chance: 100
                            }
                        ]

                    }
                },
                
            },
            {
                // Chance is based off:
                //  1. The last note played
                //  2. Position in the beat & bar & riff
                //  3. Current beat


                //   This add chance up to create a chance total for each note from all the related data...

                noteData: {
                    //  Note data of which is in chance
                    scaleNoteId: 0,         //  Note Id in the set scale
                    octave: 0,              //  Lowest = 0 - related to lowest allowed note of that note on the guitar fretboard
                    typeof: 'single',       //  Single note or chord (different chord types here eg. octave chord)
                    playStyle: 'open',    //  Play style of note
                    length: 8,             //  Length of note
                    state: true,
                    positionChance: [
                        {
                            positionInBeat: [
                                {
                                    value: 0,
                                    chance: 0,
                                },
                                {
                                    value: -1,      //  -1 means all the rest
                                    chance: 100,
                                },
                            ],
                            positionInBar: [
                                {
                                    value: 0,
                                    chance: 0,
                                },
                                {
                                    value: 0.5,
                                    chance: 50,
                                },
                                {
                                    value: -1,      //  -1 means all the rest
                                    chance: 100,
                                },
                            ],
                            positionInRiff: [
                                {
                                    value: 0,      //  -1 means all the rest
                                    chance: 0,
                                },
                                {
                                    value: -1,      //  -1 means all the rest
                                    chance: 100,
                                },
                            ],
                            currentBeat: [
                                {
                                    value: -1,      //  -1 means all the rest
                                    chance: 100,
                                },
                            ],
                        }
                    ],
                    rules : {
                        
                        wontFollow: [
                                           
                        ],

                        canFollow: [
                            {
                                //  Means this note CAN follow any of these notes
                                //  null value means that the variable isn't used in the calculation
                                scaleNoteId: 0,         //  Note Id in the set scale
                                octave: 1,              //  Lowest = 0 - related to lowest allowed note of that note on the guitar fretboard
                                typeof: 'single',       //  Single note or chord (different chord types here eg. octave chord)
                                playStyle: null,
                                chance: 50
                            },
                            {
                                //  Means this note CAN follow any of these notes
                                //  null value means that the variable isn't used in the calculation
                                scaleNoteId: 0,         //  Note Id in the set scale
                                octave: 0,              //  Lowest = 0 - related to lowest allowed note of that note on the guitar fretboard
                                typeof: 'single',       //  Single note or chord (different chord types here eg. octave chord)
                                playStyle: null,
                                chance: 50
                            }
                        ],

                        mustFollow: [
                            {
                                //  Means this note must follow a certain note    
                                //  null value means that the variable isn't used in the calculation
                                scaleNoteId: 0,         //  Note Id in the set scale
                                octave: 1,              //  Lowest = 0 - related to lowest allowed note of that note on the guitar fretboard
                                typeof: 'single',       //  Single note or chord (different chord types here eg. octave chord)
                                playStyle: 'open',
                                chance: 100
                            }
                        ]

                    }
                },
                
            }
        ]
        
    },


    basicNotes : {
        note_chance : {
            1: 0,
            2: 0,
            4: 2,
            8: 50,
            16: 15,
            32: 0,
        },
        chancePoints : [
            {
                scaleNoteId: 0,            //  Note Id in the set scale
                octave: 0,            //  Lowest = 0 - related to lowest allowed note of that note on the guitar fretboard
                typeof: 'single',     //  Single note or chord (different chord types here eg. octave chord)
                chance: 30,            //  Chance of it being this
                playStyle: 'chugga'
            },
            {
                scaleNoteId: 2,            //  Note Id in the set scale
                octave: 0,            //  Lowest = 0 - related to lowest allowed note of that note on the guitar fretboard
                typeof: 'single',     //  Single note or chord (different chord types here eg. octave chord)
                chance: 10,            //  Chance of it being this
                playStyle: 'chugga'
            },
            {
                scaleNoteId: 3,            //  Note Id in the set scale
                octave: 0,            //  Lowest = 0 - related to lowest allowed note of that note on the guitar fretboard
                typeof: 'single',     //  Single note or chord (different chord types here eg. octave chord)
                chance: 10,            //  Chance of it being this
                playStyle: 'chugga'
            },
            {
                scaleNoteId: 3,            //  Note Id in the set scale
                octave: 0,            //  Lowest = 0 - related to lowest allowed note of that note on the guitar fretboard
                typeof: 'single',     //  Single note or chord (different chord types here eg. octave chord)
                chance: 0,            //  Chance of it being this
                playStyle: 'chugga'
            },
            {
                scaleNoteId: 5,            //  Note Id in the set scale
                octave: 0,            //  Lowest = 0 - related to lowest allowed note of that note on the guitar fretboard
                typeof: 'single',     //  Single note or chord (different chord types here eg. octave chord)
                chance: 0,            //  Chance of it being this
                playStyle: 'chugga'
            },
            {
                scaleNoteId: 0,            //  Note Id in the set scale
                octave: 1,            //  Lowest = 0 - related to lowest allowed note of that note on the guitar fretboard
                typeof: 'single',     //  Single note or chord (different chord types here eg. octave chord)
                chance: 15,            //  Chance of it being this
                playStyle: 'open'
            },
            {
                scaleNoteId: 0,            //  Note Id in the set scale
                octave: 2,            //  Lowest = 0 - related to lowest allowed note of that note on the guitar fretboard
                typeof: 'single',     //  Single note or chord (different chord types here eg. octave chord)
                chance: 5,            //  Chance of it being this
                playStyle: 'chugga'
            },
            {
                scaleNoteId: 0,            //  Note Id in the set scale
                octave: 2,            //  Lowest = 0 - related to lowest allowed note of that note on the guitar fretboard
                typeof: 'chord',     //  Single note or chord (different chord types here eg. octave chord)
                chord: [{
                    scaleNoteId: 5,            //  Note Id in the set scale
                    octave: 2,            //  Lowest = 0 - related to lowest allowed note of that note on the guitar fretboard
                },{
                    scaleNoteId: 0,            //  Note Id in the set scale
                    octave: 3,            //  Lowest = 0 - related to lowest allowed note of that note on the guitar fretboard
                }],
                chance: 5,            //  Chance of it being this
                playStyle: 'open'
            },
            {
                scaleNoteId: 3,            //  Note Id in the set scale
                octave: 0,            //  Lowest = 0 - related to lowest allowed note of that note on the guitar fretboard
                typeof: 'chord',     //  Single note or chord (different chord types here eg. octave chord)
                chord: [{
                    scaleNoteId: 1,            //  Note Id in the set scale
                    octave: 1,            //  Lowest = 0 - related to lowest allowed note of that note on the guitar fretboard
                },{
                    scaleNoteId: 4,            //  Note Id in the set scale
                    octave: 1,            //  Lowest = 0 - related to lowest allowed note of that note on the guitar fretboard
                }],
                chance: 100,            //  Chance of it being this
                playStyle: 'open'
            }
        ]
    },




};

export default Algorithms;