var midi2note = require('midi-note')
var note2midi = require('note-midi')

const Midi = {

    GetNoteName(noteNumber){
        return midi2note(noteNumber) // => 'A4';
    },

    GetNoteNumber(noteName){
        return note2midi(noteName) // => '20';
    }

};


export default Midi;