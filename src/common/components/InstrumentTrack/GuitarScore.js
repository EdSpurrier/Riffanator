import React, { memo, useEffect, useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Score = styled.div`
    background: white;
    width: 100%;
`
const Note = styled.div`
  background: pink;
`

const Beat = styled.div`
  background: yellow;
  width: 25%;
`

const Bar = styled.div`
  background: blue;
    height: 40px;
    width: 25%;
`

const GuitarScore = memo(({ instrumentData, guitar }) => {

/*     const [slices, setSlices] = useState([]); */


    useEffect(() => {
        if (instrumentData === null) {
            return;
        }
        console.log("instrumentData Updated....", instrumentData);
        
    }, [instrumentData]);



    const renderSlices = (guitarData) => {

        let noteCount = 0;
        let notes = new Array();

        guitarData.strings.forEach(string => {
            string.bars.forEach(bar => {
                noteCount += bar.notes.length;
            });
        });


    }




    const renderScore = (thisData) => {


 
        if (instrumentData === null) {
            return;
        }

        if (instrumentData.style === null) {
            return;
        }



/* 
        for(let i = 0; i < totalCount; i++) {

            let instrumentSlice = {
                tuning : tuning,
                strings : thisData.strings.forEach(string => {
                    return thisData.string.bars[barId].notes[barNoteId];
                }),
                style : style.bars[barId].notes[barNoteId]
            };

            slices.push(instrumentSlice);
        } */

        /* thisData.style.bars.forEach(bar => {
            console.log(bar);
        });
 */
/*         thisData.style.bars.forEach(bar => {
            console.log(bar);
        }); */

        


/* 
        thisData['style'].forEach(style => {
            style['bars'].forEach(bar => {
                console.log(bar);
            });
        }); 
 */
        /* thisData.strings.forEach(string => {
            string.bars.forEach(bar => {
                //console.log(bar);
            });
        });

        let totalCount = thisData.style.bars.length * 32;
        console.log('totalCount', totalCount); */
/*         console.log('totalCount', totalCount); */

/*         let instrumentSlice = {
            tuning : tuning,
            strings : strings.forEach(string => {
                return string.bars[barId].notes[barNoteId];
            }),
            style : style.bars[barId].notes[barNoteId]
        }; */


        return thisData.strings.map((string, key) =>
            <Bar key={key}> -{key}| </Bar>
        )
    }


    return (

        <Score className={'score'}>
            {renderScore(instrumentData)}
            
        </Score>
    );
});

GuitarScore.displayName = 'GuitarScore';

export default GuitarScore;