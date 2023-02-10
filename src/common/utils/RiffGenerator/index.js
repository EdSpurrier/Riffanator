import { config } from "../config";
import Music from "../Music";


const RiffGenerator = {
    
    generateRandom(min, max) {

        // find diff
        let difference = max - min;
    
        // generate random number 
        let rand = Math.random();
    
        // multiply with difference 
        rand = Math.floor( rand * difference);
    
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

        console.error('Should not be able to get past this note length chance');
    },

    generateGooveSkeleton(generator) {

        const grooveSkeleton = window.grooveSkeleton;
        const groove = grooveSkeleton.groove;
        const transport = window.transport;
        const midi = window.midi.midiCore;
        const noteChances = generator.state.settings.grooveSkeleton.note_chance;

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
            
            if(key > smallestNoteLength) {
                smallestNoteLength = parseInt(key);
            };
        }


        let resolutionPerBar = (1/number_of_bars);

/*         console.log({
            resolutionPerBar: resolutionPerBar,
            totalChance: totalChance,
            smallestNoteLength: smallestNoteLength
        }); */


        let newGroove = [];
        let currentTime = 0;

        while(currentTime < 1) {

            let randomChance = this.generateRandom(1, totalChance);
            let noteType = this.getNoteFromChance(randomChance, noteChances);
            let noteLength = resolutionPerBar/noteType;

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


    getGuitarStrings (tabPoint, guitar) {


        return null;
    },


    generateGuitarMachineTab() {

        

        const guitarMachine = window.guitars[0];
        const tablature = guitarMachine.tablature;

        const strings = guitarMachine.guitar.GetStrings();
        const scale =  window.riffSettings.scale;
        const scaleNotes =  Music.getAllScaleNotes(window.riffSettings.scale.rootNote, window.riffSettings.scale.type);

        const chancePoints = [
            {
                scaleNote   : 0,            //  Note Id in the set scale
                octaveStep  : 0,            //  Lowest = 0 - related to lowest allowed note of that note on the guitar fretboard
                typeof      : 'single',     //  Single note or chord (different chord types here eg. octave chord)
                chance      : 20,            //  Chance of it being this
                playStyle   : 'chugga'
            },
            {
                scaleNote   : 1,            //  Note Id in the set scale
                octaveStep  : 0,            //  Lowest = 0 - related to lowest allowed note of that note on the guitar fretboard
                typeof      : 'single',     //  Single note or chord (different chord types here eg. octave chord)
                chance      : 10,            //  Chance of it being this
                playStyle   : 'open'
            },
            {
                scaleNote   : 2,            //  Note Id in the set scale
                octaveStep  : 0,            //  Lowest = 0 - related to lowest allowed note of that note on the guitar fretboard
                typeof      : 'single',     //  Single note or chord (different chord types here eg. octave chord)
                chance      : 10,            //  Chance of it being this
                playStyle   : 'open'
            },
            {
                scaleNote   : 3,            //  Note Id in the set scale
                octaveStep  : 0,            //  Lowest = 0 - related to lowest allowed note of that note on the guitar fretboard
                typeof      : 'single',     //  Single note or chord (different chord types here eg. octave chord)
                chance      : 10,            //  Chance of it being this
                playStyle   : 'open'
            },
            {
                scaleNote   : 3,            //  Note Id in the set scale
                octaveStep  : 0,            //  Lowest = 0 - related to lowest allowed note of that note on the guitar fretboard
                typeof      : 'single',     //  Single note or chord (different chord types here eg. octave chord)
                chance      : 20,            //  Chance of it being this
                playStyle   : 'open'
            },
            {
                scaleNote   : 0,            //  Note Id in the set scale
                octaveStep  : 1,            //  Lowest = 0 - related to lowest allowed note of that note on the guitar fretboard
                typeof      : 'single',     //  Single note or chord (different chord types here eg. octave chord)
                chance      : 20,            //  Chance of it being this
                playStyle   : 'open'
            },
            {
                scaleNote   : 0,            //  Note Id in the set scale
                octaveStep  : 2,            //  Lowest = 0 - related to lowest allowed note of that note on the guitar fretboard
                typeof      : 'single',     //  Single note or chord (different chord types here eg. octave chord)
                chance      : 10,            //  Chance of it being this
                playStyle   : 'open'
            }
        ];


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
            let newStrings = this.getGuitarStrings(tabPoint, guitarMachine.guitar);

            console.log({
                randomChance:randomChance,
                tabPoint:tabPoint,
                tabNote:tabNote,
                newStrings:newStrings
            });

        });

        console.log({
            guitarMachine:guitarMachine,
            chancePoints:chancePoints,
            totalChance:totalChance,
            strings: strings,
            scale: scale,
            scaleNotes: scaleNotes
        });

    },








}

export default RiffGenerator;