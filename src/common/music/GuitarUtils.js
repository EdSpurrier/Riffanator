import { WebMidi } from "webmidi";

/* const GuitarTunings = {
    'Drop-B' : ['B1','F#2','B2','E3','G#3','C#4']
}



const GuitarChords = {
    'Octave Chords' : [
        
    ]
} */


const GuitarUtils = {

    GuitarTunings : {
        'Drop-B' : ['B2','F#3','B3','E4','G#4','C#5', 'D#6'],
        'Drop-A' : ['A2','E3','A3','D4','F#4','B5', 'E6'],
    },
    
    
    GuitarChords : {
        'Octave Chords' : [
            
        ]
    },
    
    PlayStyle : {
        'OPEN'      : 'C2',
        'CHUGGA'    : 'G#-1',
        'DOWN MUTE' : 'E0',
        'UP MUTE'   : 'F0',
    },


    GetGuitarTuning(tuningName){
        return this.GuitarTunings[tuningName];
    },


    GetGuitarChord(chordName){
        return this.GuitarChords[chordName];
    },




    SetPlayStyle (playStyleName, midiOutputId) {
        if (playStyleName != 'open') {
            console.log(playStyleName, this.PlayStyle);
            WebMidi.outputs[midiOutputId].playNote(this.PlayStyle[playStyleName.toUpperCase()]);
        }/*  else {
            this.UnsetPlayStyle(playStyleName, midiOutputId);
        } */
    },

    UnsetPlayStyle (playStyleName, midiOutputId) {
        if (playStyleName != 'open') {

            WebMidi.outputs[midiOutputId].stopNote(this.PlayStyle[playStyleName.toUpperCase()]);
        }
    },


    PlayGuitarNoteOnly (noteName, midiOutputId) {        
        WebMidi.outputs[midiOutputId].playNote(noteName);
    },

    PlayGuitarNote (noteName, playStyleName, midiOutputId) {

        this.SetPlayStyle(playStyleName, midiOutputId);
        
        WebMidi.outputs[midiOutputId].playNote(noteName);
    },

    StopGuitarNoteOnly (noteName, midiOutputId) {        
        WebMidi.outputs[midiOutputId].stopNote(noteName);
    },


    StopGuitarNote (noteName, playStyleName, midiOutputId) {
        WebMidi.outputs[midiOutputId].stopNote(noteName);
        this.UnsetPlayStyle(playStyleName, midiOutputId);
    }

}




export default GuitarUtils;