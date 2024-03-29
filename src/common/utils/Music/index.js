import Midi from "../Midi";

const Music = {
    scales: [
        {
            type: "Major",
            intervals: [
                2, 2, 1, 2, 2, 2, 1
            ],
        },
        {
            type: "Minor",
            intervals: [
                2, 1, 2, 2, 1, 2, 2
            ]
        }, {
            type: "Melodic  Minor",
            intervals: [
                2, 1, 2, 2, 2, 2, 1
            ]
        }, {
            type: "Harmonic Minor",
            intervals: [
                2, 1, 2, 2, 1, 3, 1
            ]
        }, {
            type: "Pentatonic Major",
            intervals: [
                2, 2, 3, 2, 3
            ]
        }, {
            type: "Pentatonic Minor",
            intervals: [
                3, 2, 2, 3, 2
            ]
        }, {
            type: "Ionian",
            intervals: [
                2, 2, 1, 2, 2, 2, 1
            ]
        }, {
            type: "Dorian",
            intervals: [
                2, 1, 2, 2, 2, 1, 2
            ]
        }, {
            type: "Phrygian",
            intervals: [
                1, 2, 2, 2, 1, 2, 2
            ]
        }
    ],


    getScaleByName(scaleName) {
        return this.scales.filter((scale) => scale.type === scaleName)[0];
    },


    notes: [
        'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'
    ],

    getscaleNotes(rootNote, scaleType) {
        let scaleNotes = [];

        let rootNoteIndex = this.notes.indexOf(rootNote);
        let intervals = this.scales.find(scale => scale.type === scaleType).intervals;

        scaleNotes.push(this.notes[rootNoteIndex]);

        let currentIntervalNoteNumber = rootNoteIndex;

        intervals.forEach((interval, index) => {

            currentIntervalNoteNumber += interval;

            if (currentIntervalNoteNumber >= this.notes.length) {
                currentIntervalNoteNumber -= this.notes.length;
            };

            if (!scaleNotes.includes(this.notes[currentIntervalNoteNumber])) {
                scaleNotes.push(this.notes[currentIntervalNoteNumber]);
            }
        });

        return scaleNotes;
    },


    getAllScaleNotes(rootNote, scaleType) {
        let scaleNotes = this.getscaleNotes(rootNote, scaleType);
        let minOctave = -2;
        let maxOctave = 7;

        let allScaleNotes = [];

        for(let octave = minOctave; octave <= maxOctave; octave++) {
            let scaleNoteId = 0;
            scaleNotes.forEach(scaleNote => {
                allScaleNotes.push({
                    name: scaleNote+octave,
                    number: Midi.GetNoteNumber(scaleNote+octave),
                    scaleNoteId: scaleNoteId//  Note Id where it sits in the chosen scale
                });

                scaleNoteId++;
            });
            
        }

       
        return  allScaleNotes.sort(function(a, b){return b.number-a.number}).reverse();

    },

    getCurrentScale() {
        return {
            rootNote: window.riffSettings.scale.rootNote, 
            scaleType: window.riffSettings.scale.type
        };
    },

    isNoteInScale() {
        
        return false;
    }
};

export default Music;