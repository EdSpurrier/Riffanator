import { config } from "../config";
import Music from "../Music";
import Algorithms from "./Algorithms";


const RiffGenerator = {

    generateRandom(min, max) {

        // find diff
        let difference = max - min;

        // generate random number 
        let rand = Math.random();

        // multiply with difference 
        rand = Math.floor(rand * difference);

        // add with min value 
        rand = rand + min;

        return rand;
    },


    getNoteFromChance(chance, noteChances) {

        let currentNoteChance = 0;

        for (let key in noteChances) {
            currentNoteChance += noteChances[key];
            if (chance <= currentNoteChance) return parseInt(key);
        };

        console.log('getNoteFromChance', chance, noteChances, currentNoteChance);

        console.error('Should not be able to get past this note length chance');
    },


    getCurrentTimeData(currentTime, barLength, beatLength, loopLengthInTime) {
        
        let onBeat = (currentTime % beatLength === 0) || currentTime === 0;
        let currentBeat = Math.floor(currentTime/beatLength);

        let positionInBeat = (
            (currentTime-
                (currentBeat*beatLength)
            )/barLength);
        let positionInBar = (currentTime/barLength);

        let positionInRiff = (currentTime/loopLengthInTime);
        console.log({
            currentBeat: currentBeat,
            onBeat: onBeat
        },
        {
            barLength       : barLength,
            beatLength      : beatLength, 
            currentTime     : currentTime,
        });

        return {
            onBeat  : true,
            currentBeat     : currentBeat,
            positionInBeat  : positionInBeat,
            positionInBar   : positionInBar,
            positionInRiff  : positionInRiff
        }
    },



    wontFollowNote(noteData, lastNoteData) {

        console.log('wontFollow', noteData, lastNoteData);


        if (!lastNoteData) return false;

        let wontFollow = noteData.rules.wontFollow.filter(
            wontFollowNoteData => (
                (wontFollowNoteData.scaleNoteId === null    ||  wontFollowNoteData.scaleNoteId === lastNoteData.scaleNoteId) &&
                (wontFollowNoteData.octave === null         ||  wontFollowNoteData.octave === lastNoteData.octave) &&
                (wontFollowNoteData.typeof === null         ||  wontFollowNoteData.typeof === lastNoteData.typeof) &&
                (wontFollowNoteData.playStyle === null      ||  wontFollowNoteData.playStyle === lastNoteData.playStyle) &&
                (wontFollowNoteData.length === null         ||  wontFollowNoteData.length === lastNoteData.length)
            )
        );

/*         for (let key in noteData.rules.wontFollow) {
            let wontFollowNoteData = noteData.rules.wontFollow[key];
            console.log('wontFollow', [
                (wontFollowNoteData.scaleNoteId === null    ||  wontFollowNoteData.scaleNoteId === lastNoteData.scaleNoteId),
                (wontFollowNoteData.octave === null         ||  wontFollowNoteData.octave === lastNoteData.octave),
                (wontFollowNoteData.typeof === null         ||  wontFollowNoteData.typeof === lastNoteData.typeof),
                (wontFollowNoteData.playStyle === null      ||  wontFollowNoteData.playStyle === lastNoteData.playStyle),
                (wontFollowNoteData.length === null         ||  wontFollowNoteData.length === lastNoteData.length)
            ]);
        };
    
        console.log('wontFollow', wontFollow); */
        return (wontFollow.length > 0);

    },


    mustFollowNote(noteData, lastNoteData) {

        console.log('mustFollow', noteData, lastNoteData);


        if (!lastNoteData) return false;

        let mustFollow = noteData.rules.mustFollow.filter(
            mustFollowNoteData => (
                (mustFollowNoteData.scaleNoteId === null    ||  mustFollowNoteData.scaleNoteId === lastNoteData.scaleNoteId) &&
                (mustFollowNoteData.octave === null         ||  mustFollowNoteData.octave === lastNoteData.octave) &&
                (mustFollowNoteData.typeof === null         ||  mustFollowNoteData.typeof === lastNoteData.typeof) &&
                (mustFollowNoteData.playStyle === null      ||  mustFollowNoteData.playStyle === lastNoteData.playStyle) &&
                (mustFollowNoteData.length === null         ||  mustFollowNoteData.length === lastNoteData.length)
            )
        );

        return (mustFollow.length > 0);

    },


    getCanFollowNoteChance(noteData, lastNoteData) {

        console.log('canFollow', noteData, lastNoteData);
        let canFollowChance = 0;

        if (!lastNoteData) return canFollowChance;

        for (let key in noteData.rules.canFollow) {
            let canFollowNoteData = noteData.rules.canFollow[key];
            if (
                (!canFollowNoteData.scaleNoteId     || canFollowNoteData.scaleNoteId === null    ||  canFollowNoteData.scaleNoteId === lastNoteData.scaleNoteId) &&
                (canFollowNoteData.octave === null         ||  canFollowNoteData.octave === lastNoteData.octave) &&
                (!canFollowNoteData.typeof          || canFollowNoteData.typeof === null         ||  canFollowNoteData.typeof === lastNoteData.typeof) &&
                (!canFollowNoteData.playStyle       || canFollowNoteData.playStyle === null      ||  canFollowNoteData.playStyle === lastNoteData.playStyle) &&
                (!canFollowNoteData.length          || canFollowNoteData.length === null         ||  canFollowNoteData.length === lastNoteData.length)
            ) {
                canFollowChance += canFollowNoteData.chance;
                
            };
 
/*             console.log('current=>canFollowChance:', (!canFollowNoteData.scaleNoteId     || canFollowNoteData.scaleNoteId === null    ||  canFollowNoteData.scaleNoteId === lastNoteData.scaleNoteId) &&
            (canFollowNoteData.octave === null         ||  canFollowNoteData.octave === lastNoteData.octave) &&
            (!canFollowNoteData.typeof          || canFollowNoteData.typeof === null         ||  canFollowNoteData.typeof === lastNoteData.typeof) &&
            (!canFollowNoteData.playStyle       || canFollowNoteData.playStyle === null      ||  canFollowNoteData.playStyle === lastNoteData.playStyle) &&
            (!canFollowNoteData.length          || canFollowNoteData.length === null         ||  canFollowNoteData.length === lastNoteData.length), (!canFollowNoteData.scaleNoteId     || canFollowNoteData.scaleNoteId === null    ||  canFollowNoteData.scaleNoteId === lastNoteData.scaleNoteId),
            (canFollowNoteData.octave === null         ||  canFollowNoteData.octave === lastNoteData.octave), canFollowNoteData.octave, lastNoteData.octave,
            (!canFollowNoteData.typeof          || canFollowNoteData.typeof === null         ||  canFollowNoteData.typeof === lastNoteData.typeof), canFollowNoteData.typeof, lastNoteData.typeof,
            (!canFollowNoteData.playStyle       || canFollowNoteData.playStyle === null      ||  canFollowNoteData.playStyle === lastNoteData.playStyle),
            (!canFollowNoteData.length          || canFollowNoteData.length === null         ||  canFollowNoteData.length === lastNoteData.length), canFollowChance, lastNoteData, canFollowNoteData); */
        }

        return canFollowChance;

    },


    getChanceBasedOfPosition(noteData, currentTimeData) {

        /* 
        onBeat  : true,
        currentBeat     : currentBeat,
        positionInBeat  : positionInBeat,
        positionInBar   : positionInBar,
        positionInRiff  : positionInRiff 
        */


        console.log('getChanceBasedOfPosition', noteData, currentTimeData);
        let positionChance = 0;

        if(noteData.positionChance.onBeat && currentTimeData.onBeat) {
            positionChance += noteData.positionChance.onBeat;
        };

        for (let key in noteData.positionChance.positionInBeat) {
            let positionInBeat = noteData.positionChance.positionInBeat[key];
            if(positionInBeat.value === currentTimeData.positionInBeat) {
                positionChance += positionInBeat.chance;
            };
        }

        for (let key in noteData.positionChance.positionInBar) {
            let positionInBar = noteData.positionChance.positionInBar[key];
            if(positionInBar.value === currentTimeData.positionInBar) {
                positionChance += positionInBar.chance;
            };
        }

        for (let key in noteData.positionChance.positionInRiff) {
            let positionInRiff = noteData.positionChance.positionInRiff[key];
            if(positionInRiff.value === currentTimeData.positionInRiff) {
                positionChance += positionInRiff.chance;
            };
        }

        for (let key in noteData.positionChance.currentBeat) {
            let currentBeat = noteData.positionChance.currentBeat[key];
            if(currentBeat.value === currentTimeData.currentBeat) {
                positionChance += currentBeat.chance;
            };
        }


        console.log('positionChance', positionChance);
        return positionChance;
    },

    getNoteChancesFromChance(chance, noteChances) {

        let currentNoteChance = 0;

        for (let key in noteChances) {
            currentNoteChance += noteChances[key].chance;
            if (chance <= currentNoteChance) return noteChances[key];
        };

        console.log('getNoteFromChance', chance, noteChances, currentNoteChance);

        console.error('Should not be able to get past this note length chance');
    },

    generateNoteChances(chancePoints, lastNoteData, currentTimeData) {
        

        console.log(chancePoints, lastNoteData);
        

        let generatedNoteChances = [];


        for (let key in chancePoints) {


            let chancePointNoteData = chancePoints[key].noteData;

            
            let wontFollow = this.wontFollowNote(chancePointNoteData, lastNoteData);

            let mustFollow = this.mustFollowNote(chancePointNoteData, lastNoteData);

            console.log('generating', {
                key: chancePoints[key],
                wontFollow: wontFollow,
                mustFollow: mustFollow,
            });

            //  CAN THIS CHANCEPOINT NOTE PLAY?
            if(mustFollow || !wontFollow) {
                console.log('this.calculateChance()');

                let noteChance = 0;
                

                //  Use chance from:
                //  canFollow
                noteChance += this.getCanFollowNoteChance(chancePointNoteData, lastNoteData);
                console.log('noteChance', noteChance);


                console.log(
                    'CURRENTLY HERE!! >>',
                    'At moment this will always not return anything as the chance is based on what note preceeds it lastNoteData -> this is the FIRST note in the groove so there isnt any data for this!',
                    'Next we will add position [riff,beat,bar], currentBeat, onBeat => to the chance and it will then allow for other notes', 
                    'Using this data:', currentTimeData
                );

                noteChance += this.getChanceBasedOfPosition(chancePointNoteData, currentTimeData);
                //  position [riff,beat,bar], currentBeat, onBeat
                //  
                //  ADD TO THE LIST OF CHANCES

                if(noteChance > 0) {
                    generatedNoteChances.push(
                        {
                            scaleNoteId: chancePointNoteData.scaleNoteId,
                            octave: chancePointNoteData.octave,
                            typeof: chancePointNoteData.typeof,
                            playStyle: chancePointNoteData.playStyle,
                            length: chancePointNoteData.length,
                            chance: noteChance,
                            state: chancePointNoteData.state,
                        }
                    );
                }
                
            }
        };


        console.log({generatedNoteChances:generatedNoteChances});
        
        let noteChances = generatedNoteChances;


        let totalChance = 0;
        let smallestNoteLength = 0;

        for (let key in noteChances) {
            totalChance += noteChances[key].chance;

            if (key > smallestNoteLength) {
                smallestNoteLength = parseInt(key);
            };
        }

        return {
            noteChances,
            totalChance
        }
    },

    generateGooveRiff(algorithm) {
        console.log('generateGooveRiff(algorithm)', {
            algorithm
        });


        const grooveSkeleton = window.grooveSkeleton;

        let barCount = window.transport.loop.to - window.transport.loop.from + 1;

        const number_of_bars = config.number_of_bars;
        let resolutionPerBar = (1 / number_of_bars);

        let beatCount = 4;
    
        let barLength = 1/number_of_bars;
        let beatLength = barLength/beatCount;
        let lengthNote32 = barLength/32;


        let loopLengthInBars = barCount;
        let loopLengthInTime = (1/number_of_bars) * loopLengthInBars;

        let newGrooveLoop = [];
        let newGroove = [];
        let currentTime = 0;


        console.log('setting up', {
            number_of_bars: number_of_bars,
            grooveSkeleton: grooveSkeleton,
            resolutionPerBar: resolutionPerBar,
            loopLengthInBars: loopLengthInBars,
            loopLengthInTime: loopLengthInTime,
            beatLength: beatLength,
            barLength: barLength,
            lengthNote32: lengthNote32
        });


        while (currentTime < loopLengthInTime) {


            let currentTimeData = this.getCurrentTimeData(currentTime, barLength, beatLength, loopLengthInTime);
            
            //  Last note data
            let lastNoteData = null;
            if(newGrooveLoop.length > 0) {
                lastNoteData = newGrooveLoop[newGrooveLoop.length-1];
            };

            //  Base note decision on last note played

            console.log('generatorLoop', 
            {
                currentTimeData : currentTimeData,
                lastNoteData : lastNoteData
            });




            //   dont forget: 
            //   chance of space/quiet

            //  Using data given create a chanceGroup
            console.log("START BUILDING NOTE CHANCES >>> ")


            //  creating chancePoints in the algorithm file
            //  This will have CANFOLLOW & MUSTFOLLOW & WONTFOLLOW

            const { noteChances, totalChance} = this.generateNoteChances(algorithm.chancePoints, lastNoteData, currentTimeData);

            console.log("END BUILDING NOTE CHANCES <<< ")

            console.log('noteChances', noteChances, 'totalChance', totalChance);

            let randomChance = this.generateRandom(1, totalChance);
            let noteChosen = this.getNoteChancesFromChance(randomChance, noteChances);
            console.log({noteChosen:noteChosen});



            /*             
                console.log({
                    randomChance:randomChance,
                    noteType:noteType,
                    noteLength:noteLength
                }); 
            */



            let newEndTime = currentTime + lengthNote32*(32/noteChosen.length);


            // make sure the end note doesnt go over to the next bar
            if (newEndTime > loopLengthInTime)  {
                newEndTime = loopLengthInTime;
            };


            newGrooveLoop.push({
                start: currentTime,
                end: newEndTime,
                state: noteChosen.state,
                scaleNoteId: noteChosen.scaleNoteId,
                octave: noteChosen.octave,
                typeof: noteChosen.typeof,
                playStyle: noteChosen.playStyle,
                length: noteChosen.length,
            });




            currentTime = newEndTime;
        }


/* 
        while (currentTime < 1) {

            let randomChance = this.generateRandom(1, totalChance);
            let noteType = this.getNoteFromChance(randomChance, noteChances);
            let noteLength = resolutionPerBar / noteType;

            newGroove.push({
                start: currentTime,
                end: currentTime += noteLength,
                state: true
            });

        }
*/


        // first note of every beat is an octave note

        // followed by open notes that bounce along

        
        
        // understand where in the bar we are
        // then based on location then choose what length note to play and what actual note to play




        console.log('generated new newGrooveLoop', newGrooveLoop);

        // Create newGroove
        newGrooveLoop.forEach(grooveNote => {
            newGroove.push({
                start: grooveNote.start,
                end: grooveNote.end,
                state: grooveNote.state,
            });
        });


        //  Update Groove of GrooveSkeleton Directly
        window.grooveSkeleton.actions.overwriteGroove(newGroove);
        window.guitars[0].actions.cloneGrooveSkeleton();





        //  Add in notes to the groove skeleton on the guitar [0]
        console.log('Add in notes to the groove skeleton on the guitar [0]');

        
        const guitarMachine = window.guitars[0];
        const tablature = guitarMachine.tablature;

        const strings = guitarMachine.guitar.GetStrings();
        const scale = window.riffSettings.scale;
        const scaleNotes = Music.getAllScaleNotes(window.riffSettings.scale.rootNote, window.riffSettings.scale.type);

        const { filteredScaleNotes, scaleNotesOnStrings } = this.getScaleNotesOnStrings(scaleNotes, strings);


        /* 

            GUITAR TAB STRUCTURE
            {
                start: 0,        //  Percentage Start Point eg. 0.5
                end: 1,        //  Percentage End Point eg. 0.75
                state: true,     //  noteOn or noteOff
                playStyle: 'open',   //  Guitar PlayStyle
                strings: [
                    {                   //  Each String
                        fret: 0,
                        state: false,  //  noteOn or noteOff
                    },
                    {
                        fret: 0,
                        state: false,  //  noteOn or noteOff
                    },
                    {
                        fret: 0,
                        state: false,  //  noteOn or noteOff
                    },
                    {
                        fret: 0,
                        state: false,  //  noteOn or noteOff
                    },
                    {
                        fret: 0,
                        state: false,  //  noteOn or noteOff
                    },
                    {
                        fret: 0,
                        state: false,  //  noteOn or noteOff
                    }
                ]
            }

        */

        for (let key in tablature) {
            
            tablature[key].playStyle = newGrooveLoop[key].playStyle;

            let newStrings = this.getGuitarStrings(newGrooveLoop[key], scaleNotesOnStrings, guitarMachine.guitar);
            tablature[key].strings = newStrings;
        }



    },
    




    generateGooveSkeleton(generator) {

        const grooveSkeleton = window.grooveSkeleton;
        const groove = grooveSkeleton.groove;
        const transport = window.transport;
        const midi = window.midi.midiCore;
        let noteChances = generator.state.settings.grooveSkeleton.note_chance;
        
        console.log('Needs to change here');
        noteChances = Algorithms.basicNotes.note_chance;

        const number_of_bars = config.number_of_bars;
        /* 
                console.log({
                    number_of_bars: number_of_bars,
                    grooveSkeleton: grooveSkeleton,
                    noteChances: noteChances,
                    groove: groove, 
                    transport: transport, 
                    generator: generator,
                    midi: midi
                });
         */

        let totalChance = 0;
        let smallestNoteLength = 0;

        for (let key in noteChances) {
            totalChance += noteChances[key];

            if (key > smallestNoteLength) {
                smallestNoteLength = parseInt(key);
            };
        }


        let resolutionPerBar = (1 / number_of_bars);

        /*         console.log({
                    resolutionPerBar: resolutionPerBar,
                    totalChance: totalChance,
                    smallestNoteLength: smallestNoteLength
                }); */


        let newGroove = [];
        let currentTime = 0;

        while (currentTime < 1) {

            let randomChance = this.generateRandom(1, totalChance);
            let noteType = this.getNoteFromChance(randomChance, noteChances);
            let noteLength = resolutionPerBar / noteType;

            /*             console.log({
                            randomChance:randomChance,
                            noteType:noteType,
                            noteLength:noteLength
                        }); */

            newGroove.push({
                start: currentTime,
                end: currentTime += noteLength,
                state: true
            });

        }


        /*         console.log(newGroove); */
        //  Update Groove of GrooveSkeleton Directly
        window.grooveSkeleton.actions.overwriteGroove(newGroove);
        window.guitars[0].actions.cloneGrooveSkeleton();
    },




    getTabNoteFromChance(chance, chancePoints) {

        let currentNoteChance = 0;

        for (let key in chancePoints) {
            currentNoteChance += chancePoints[key].chance;
            if (chance <= currentNoteChance) return chancePoints[key];
        };

        console.error('Should not be able to get past this note length chance');
    },


    getScaleNotesOnStrings(scaleNotes, strings) {

        let scaleNotesOnStrings = [];

        /*
            scaleNoteOnString = {
                stringId: 0,
                fretId: 0,
                octave: 0,
                noteName: 'A2',
                nodeId: 45,
                scaleNoteId: 0
            }
        */


        let filteredScaleNotes = [];

        strings.forEach((string, stringId) => {
            scaleNotes.forEach((scaleNote) => {

                if (string.noteNumbers.includes(scaleNote.number)) {
                    if (!filteredScaleNotes.includes(scaleNote)) {
                        filteredScaleNotes.push(scaleNote)
                    }
                }
            });
        });


        //  Order based on noteIds
        filteredScaleNotes = filteredScaleNotes.sort(function(a, b){return b.number-a.number}).reverse();

        //  Set Octaves
        let currentOctave = -1;

        filteredScaleNotes.forEach((scaleNote, key)=> {
            if(scaleNote.scaleNoteId === 0) currentOctave++;
            scaleNote.octave = currentOctave;
        });

        strings.forEach((string, stringId) => {

            string.noteNumbers.forEach((noteNumber, fretId) => {

                const thisNote = filteredScaleNotes.filter((scaleNote)=>scaleNote.number === noteNumber);
                if(thisNote.length > 0) {
                    let scaleNoteOnString = {
                        stringId: stringId,
                        fretId: fretId,
                        octave: thisNote[0].octave,
                        noteName: string.noteNumbers[fretId],
                        noteNumber: noteNumber,
                        scaleNoteId: thisNote[0].scaleNoteId
                    }

                    scaleNotesOnStrings.push(scaleNoteOnString);
                }
                    
            });

        });



        return {
            filteredScaleNotes,
            scaleNotesOnStrings
        }
    },


    getScaleNotesOnStringFromTabPoint(tabPoint, scaleNotesOnStrings, excludeStrings = []) {
        
        let newNote = null;
        

        scaleNotesOnStrings.forEach(scaleNotesOnString => {
            //console.log('excludeStrings', excludeStrings, excludeStrings.includes(scaleNotesOnString.stringId));

            if(newNote === null) {
                //  EXCLUDE STRINGS IF STRING IS ALREADY IN USE
                if(!excludeStrings.includes(scaleNotesOnString.stringId)) {
                    if(
                        tabPoint.scaleNoteId === scaleNotesOnString.scaleNoteId &&
                        tabPoint.octave === scaleNotesOnString.octave
                        ) {
                        newNote = scaleNotesOnString;
                    }
                };
            }
            

        });

        return newNote;
    },



    getGuitarStrings(tabPoint, scaleNotesOnStrings, guitar) {

        let newStrings = new Array(guitar.GetStrings().length).fill({
            fret: 0,
            state: false,
        });
        
        if (tabPoint.typeof === 'single') {
            let scaleNoteOnString = this.getScaleNotesOnStringFromTabPoint(tabPoint, scaleNotesOnStrings, []);
            //console.log(newStrings[scaleNoteOnString.stringId]);
            newStrings[scaleNoteOnString.stringId] = {
                fret: scaleNoteOnString.fretId,
                state: true
            };
        } else if (tabPoint.typeof === 'chord') {
            console.log('chord');
            let scaleNoteOnString = this.getScaleNotesOnStringFromTabPoint(tabPoint, scaleNotesOnStrings, []);
            
            //console.log(newStrings[scaleNoteOnString.stringId]);
            newStrings[scaleNoteOnString.stringId] = {
                fret: scaleNoteOnString.fretId,
                state: true
            };

            let stringsPlayed = [];
            stringsPlayed.push(scaleNoteOnString.stringId);

            tabPoint.chord.forEach(chordNote => {
                let chordNoteOnString = this.getScaleNotesOnStringFromTabPoint(chordNote, scaleNotesOnStrings, stringsPlayed);
                //console.log(stringsPlayed  );
                if (chordNoteOnString) {
                    //console.log(newStrings[chordNoteOnString.stringId]);
                    newStrings[chordNoteOnString.stringId] = {
                        fret: chordNoteOnString.fretId,
                        state: true
                    };
                    stringsPlayed.push(chordNoteOnString.stringId);
                }

            });
        }

        return newStrings;
    },


    generateGuitarMachineTab() {

        const guitarMachine = window.guitars[0];
        const tablature = guitarMachine.tablature;

        const strings = guitarMachine.guitar.GetStrings();
        const scale = window.riffSettings.scale;
        const scaleNotes = Music.getAllScaleNotes(window.riffSettings.scale.rootNote, window.riffSettings.scale.type);

        const { filteredScaleNotes, scaleNotesOnStrings } = this.getScaleNotesOnStrings(scaleNotes, strings);

        const chancePoints = Algorithms.basicNotes.chancePoints;


        /* 

            GUITAR TAB STRUCTURE
            {
                start: 0,        //  Percentage Start Point eg. 0.5
                end: 1,        //  Percentage End Point eg. 0.75
                state: true,     //  noteOn or noteOff
                playStyle: 'open',   //  Guitar PlayStyle
                strings: [
                    {                   //  Each String
                        fret: 0,
                        state: false,  //  noteOn or noteOff
                    },
                    {
                        fret: 0,
                        state: false,  //  noteOn or noteOff
                    },
                    {
                        fret: 0,
                        state: false,  //  noteOn or noteOff
                    },
                    {
                        fret: 0,
                        state: false,  //  noteOn or noteOff
                    },
                    {
                        fret: 0,
                        state: false,  //  noteOn or noteOff
                    },
                    {
                        fret: 0,
                        state: false,  //  noteOn or noteOff
                    }
                ]
            }

        */

        let totalChance = 0;

        for (let key in chancePoints) {
            totalChance += chancePoints[key].chance;
        }

        tablature.forEach(tabNote => {
            //console.log('tabNote', tabNote);

            let randomChance = this.generateRandom(1, totalChance);
            let tabPoint = this.getTabNoteFromChance(randomChance, chancePoints);


            tabNote.playStyle = tabPoint.playStyle;

            //tabNote.strings = this.getGuitarStrings(tabPoint, guitarMachine.guitar);
            let newStrings = this.getGuitarStrings(tabPoint, scaleNotesOnStrings, guitarMachine.guitar);

            /*          console.log({
                         randomChance:randomChance,
                         tabPoint:tabPoint,
                         tabNote:tabNote,
                         newStrings:newStrings
                     }); */
            tabNote.strings = newStrings;
        });

/*         console.log({
            guitarMachine: guitarMachine,
            chancePoints: chancePoints,
            totalChance: totalChance,
            strings: strings,
            scale: scale,
            scaleNotes: scaleNotes,
            scaleNotesOnStrings: scaleNotesOnStrings,
            filteredScaleNotes: filteredScaleNotes,
            tablature:tablature
        }); */

    },








}

export default RiffGenerator;