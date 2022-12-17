const GuitarTunings = {
    'Drop-B' : ['B1','F#2','B2','E3','G#3','C#4']
}



const GuitarUtils = {
    GetGuitarTuning(tuningName){
        return GuitarTunings[tuningName];
    }
}


export default GuitarUtils;