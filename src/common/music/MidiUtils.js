import { WebMidi } from "webmidi";
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
    },


    GetOutputByName(outputName) {
        //console.log(window.midi.outputs.find((output) => output.name === outputName));
        return WebMidi.getOutputByName(outputName);
        
        //return window.midi.outputs.find((output) => output.name === outputName);
        
    },

    GetOutputById(outputId) {
        return window.midi.outputs.find(({ output }) => output.id === outputId);
    },



    SendAllNotesOffByOutput(output) {
        console.log('SendAllNotesOffByOutput', output);

/*         const myOutput = WebMidi.getOutputByName("Riff Generator");
        console.log(myOutput);
        myOutput.sendAllSoundOff();
        return; */
        return;
        output.SendAllNotesOff();
    },


    SendAllNotesOffByOutputGroup(outputs) {
        outputs.forEach(output => {
            output.SendAllNotesOff();
        });
    },

    PlayNote(noteName, output) {
        const note = new WebMidi.Note(noteName);
        output.playNote(note);
    },

    StopNote(noteName, output) {
        const note = new WebMidi.Note(noteName);
        output.stopNote(note);
    },
}


export default MidiUtils;