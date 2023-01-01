var midi2note = require('midi-note')
var note2midi = require('note-midi')

const MidiUtils = {
    GetNoteName(noteNumber){
        noteNumber -= 21; // see the explanation below.
        let notesNames = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];
        let octave = noteNumber / 12 + 1;
        let noteName = notesNames[noteNumber % 12];
        return noteName + octave;
    },

    GetNoteNumber(noteName){
        return midi2note(noteName) // => 'A4';
    }
}


export default MidiUtils;