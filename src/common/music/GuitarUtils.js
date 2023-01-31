import { WebMidi } from "webmidi";

const GuitarTunings = {
    'Drop-B' : ['B1','F#2','B2','E3','G#3','C#4']
}



const GuitarChords = {
    'Octave Chords' : [
        
    ]
}


const GuitarUtils = {

    GuitarTunings : {
        'Drop-B' : ['B1','F#2','B2','E3','G#3','C#4']
    },
    
    
    GuitarChords : {
        'Octave Chords' : [
            
        ]
    },
    
    PlayStyle : {
        'open'      : 'C-2',
        'chugga'    : 'G#-1',
        'down mute' : 'E0',
        'up mute'   : 'F0',
    },


    GetGuitarTuning(tuningName){
        return GuitarTunings[tuningName];
    },


    GetGuitarChord(chordName){
        return GuitarChords[chordName];
    },




    SetPlayStyle (playStyleName, midiOutputId) {
        if (playStyleName != 'open') {
            WebMidi.outputs[midiOutputId].playNote(this.PlayStyle[playStyleName]);
        } else {
            this.UnsetPlayStyle(playStyleName, midiOutputId);
        }
    },

    UnsetPlayStyle (playStyleName, midiOutputId) {
        WebMidi.outputs[midiOutputId].stopNote(this.PlayStyle[playStyleName]);
    },




    PlayGuitarNote (noteName, playStyleName, midiOutputId) {

        this.SetPlayStyle(playStyleName, midiOutputId);
        
        WebMidi.outputs[midiOutputId].playNote(noteName);
    },




    StopGuitarNote (noteName, playStyleName, midiOutputId) {
        WebMidi.outputs[midiOutputId].stopNote(noteName);
        this.UnsetPlayStyle(playStyleName, midiOutputId);
    }

}




export default GuitarUtils;