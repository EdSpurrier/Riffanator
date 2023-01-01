import GuitarUtils from "./GuitarUtils";

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


const Guitar = (stringCount = 6) => {

    var createSliceString = (fret, type) => {

        if (type === 'on') {
            type = 1;
        } else if (type === 'off') {
            type = -1;
        } else {
            type = 0;
        }

        return {
            fret    : fret || 0,
            type    : type
        }
    }



    var CreateSlice = ( sliceData ) => {
        return {
            strings : [
                sliceData.string[0],
                sliceData.string[1],
                sliceData.string[2],
                sliceData.string[3],
                sliceData.string[4],
                sliceData.string[5],
            ],
            style : GuitarUtils.GetPlayStyle('open')
        };
    }


    var CreateEmptySlice = () => {
        return {
            strings : [
                createSliceString(),
                createSliceString(),
                createSliceString(),
                createSliceString(),
                createSliceString(),
                createSliceString(),
            ],
            style : GuitarUtils.GetPlayStyle('none')
        };
    }



    var meta = {
        instrumentName  : '',
        setup           : false
    };

    var tuning = [];

    var slices = [];




    var UpdateSlideById = (sliceId, sliceData) => {
        slices[sliceId] = CreateSlice(sliceData);
    }



    var GetSliceById = (sliceId) => {
        return slices[sliceId];
    }


    var GenerateNewSliceAtEnd = (sliceId) => {
        return slices[sliceId];
    }


    var Init = () => {
        console.log('Guitar Initiated.');
    }

    var Setup = (setupData) => {
        
        tuning = GuitarUtils.GetGuitarTuning(setupData.guitarTuning);
        
        let totalNotes = (setupData.barCount * 32);
        slices = [];

        slices = Array(totalNotes).fill(CreateEmptySlice());

        meta.instrumentName = setupData.instrumentName;
        meta.setup = true;

        console.log('Guitar Setup.');
    }



    var GetMeta = () => {
        return meta;
    }

    var GetTuning = () => {
        return tuning;
    }

    var GetSlices = () => {
        return slices;
    }



    var GetAllData = () => {
        return {
            meta: GetMeta(),
            tuning: GetTuning(),
            slices: GetSlices()
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

        GetSlices : function () {
            return GetSlices();
        },

        GetTuning   : function () {
            return GetTuning();
        }
    }
};

export default Guitar;