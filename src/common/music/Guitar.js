//==============
//  GUITAR
//  strings
//  1 style
//--------------
//
//  tuning: Array of Notes for tuning of guitar
//  string: Score for each string
//  style: Score for the play style
//  
//==============

import Bar from "./Bar";
import GuitarUtils from "./GuitarUtils";
import Score from "./Score";



const Guitar = (numberOfStrings = 6, guitarTuning = 'Drop-B') => {

    var meta = {
        instrumentName  : '',
        setup           : false
    };
    var tuning = new Array();
    var strings = new Array();
    var style = Score;

    var Init = () => {
        
        console.log('Guitar Initiated...');
    }

    var Setup = (setupData) => {
        

        tuning = GuitarUtils.GetGuitarTuning(setupData.guitarTuning);
        
        strings = Array(setupData.numberOfStrings).fill(Score);
 
        strings.forEach(string => {
            string.bars = Array(setupData.barCount).fill(Bar);
        });

        style = Score;
        style.bars = Array(setupData.barCount).fill(Bar);

        meta.instrumentName = setupData.instrumentName;
        meta.setup = true;
    }

    var GetInstrumentSliceByNoteId = (noteId) => {

        let barId = parseInt(Math.floor(noteId/32));
        let barNoteId = noteId-(barId*32);

        

        let instrumentSlice = {
            tuning : tuning,
            strings : strings.forEach(string => {
                return string.bars[barId].notes[barNoteId];
            }),
            style : style.bars[barId].notes[barNoteId]
        };

        console.log({
            barId           : barId,
            barNoteId       : barNoteId,
            instrumentSlice : instrumentSlice
        });

        return instrumentSlice;
    }


    var SetNoteOn = (stringId, fretNumber) => {

    }

    var GetMeta = () => {
        return meta;
    }

    var GetTuning = () => {
        return tuning;
    }

    var GetStrings = () => {
        return strings;
    }


    var GetStyle = () => {
        return style;
    }


    var GetAllData = () => {
        return {
            meta: GetMeta(),
            tuning: GetTuning(),
            strings: GetStrings(),
            style: GetStyle(),
        };
    }


    Init();

    return {


        Setup       : function (setupData) {
            Setup (setupData);
            return this;
        }, 

        GetAllData  : function () {
            return GetAllData();
        },

        GetTuning   : function () {
            return GetTuning();
        },
        
        GetStrings  : GetStrings,

        GetStyle    : GetStyle,

        SetNoteOn : SetNoteOn = (stringId, fretNumber) => {
            return SetNoteOn(stringId, fretNumber);
        },

        GetInstrumentSliceByNoteId : GetInstrumentSliceByNoteId = (noteId) => {
            return GetInstrumentSliceByNoteId(noteId);
        },
    }
};

export default Guitar;