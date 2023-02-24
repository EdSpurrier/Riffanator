
//==============
//  GUITAR
//  strings
//  1 style
//--------------
//
//  tuning: Array of Notes for tuning of guitar
//  slice: {
//      strings : [
//          {
//              fret : 0,
//              type : 1
//          },
//      ],
//      style   : note => (The Odin II play style)
//  }
//  string: {fret = 0-24, type = (1 = noteon, -1 = noteoff, 0 = nothing)}
//  style: Score for the play style
//  
//==============

import GuitarUtils from "../../../music/GuitarUtils";
import Midi from "../../../utils/Midi";


const Guitar = (stringCount = 7, tuningName = 'Drop-A', fretCount = 23) => {


    const strings = Array(stringCount).fill().map(item => (
        {
            note            : 'A',
            frets           : [],
            noteNumbers     : []
        }
    ));
    
    var Init = () => {
        console.log('Guitar Initiated.');
        SetTuning(tuningName);
    }

    const SetTuning = (tuningName) => {

        let tuning = GuitarUtils.GetGuitarTuning(tuningName);


        for (let i = 0; i < strings.length; i++) {

            strings[i].note = tuning[i];

            strings[i].frets = [];
            strings[i].noteNumbers = [];

            for (let ii = 0; ii < fretCount; ii++) {
                let fretNote = Midi.GetNoteNumber(tuning[i]);
                fretNote += ii;

                strings[i].frets.push(Midi.GetNoteName(fretNote));
                strings[i].noteNumbers.push(fretNote);
            }
            

            


        }

        //console.log('Guitar strings => ', strings);
    }



    Init();


    return {
        GetStrings: function() {
            return strings;
        },
        SetTuning: function(tuningName) {
            SetTuning(tuningName);
        }
/*         Setup       : function (setupData) {
            Setup (setupData);
            return this;
        }, 

        GetAllData  : function () {
            return GetAllData();
        },

        GetSlices : function () {
            return GetSlices();
        },

        GetTuning   : function () {
            return GetTuning();
        } */
    }
};

export default Guitar;