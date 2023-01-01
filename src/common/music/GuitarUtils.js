import MidiUtils from "./MidiUtils";

const GuitarTunings = {
    'Drop-B' : ['B1','F#2','B2','E3','G#3','C#4']
}



const GuitarChords = {
    'Octave Chords' : [
        
    ]
}



const GuitarUtils = {
    GetGuitarTuning(tuningName){
        return GuitarTunings[tuningName];
    },


    GetGuitarChord(chordName){
        return GuitarChords[chordName];
    },

    GetPlayStyle(playStyleName) {
        let styleNoteId = -1;
        if (playStyleName === 'open') {
            styleNoteId = -1;
        } else if (playStyleName === 'chugga') {
            styleNoteId = MidiUtils.GetNoteNumber('G#-1');
        } else if (playStyleName === 'down mute') {
            styleNoteId = MidiUtils.GetNoteNumber('E0');
        } else if (playStyleName === 'up mute') {
            styleNoteId = MidiUtils.GetNoteNumber('F0');
        };

        return styleNoteId;
    },

}




export default GuitarUtils;