import React, { memo, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import clsx from 'clsx';
import { config } from '../../../utils/config';
import EventBus from '../../../systems/EventBus';
import Maths from '../../../utils/Maths';

const Container = styled.div`
`;

const String =  styled.div`
    height: 10px;
    width: 100%;
    position: relative;
    border-top: 1px solid ${({ theme }) => theme.colors.machine.fretboard.horizontalBorder};
    border-bottom: 1px solid ${({ theme }) => theme.colors.machine.fretboard.horizontalBorder};
    box-sizing: border-box;
    display: flex;
    background: red;
`;


const Track = styled.div`
  height: ${({ theme }) => theme.sizes.machine.tablature.height};
  background: ${({ theme }) => theme.colors.grooveSkeleton.track.background};
  flex-grow: 1;
  display: flex;
  align-items: center;
  position: relative;
  z-index: ${({ theme }) => theme.heirarchy.grooveSkeleton.track};
  cursor: pointer;
  margin: ${({ theme }) => theme.sizes.grooveSkeleton.track.marginVertical} 0;
`



const GrooveNote = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    opacity: 1;
    z-index: ${({ theme }) => theme.heirarchy.grooveSkeleton.grooveNote};
    box-sizing: border-box;

    border-left: 1px solid ${({ theme }) => theme.colors.grooveSkeleton.track.noteBorder};
    border-right: 1px solid ${({ theme }) => theme.colors.grooveSkeleton.track.noteBorder};

    transition: background ${({ theme }) => theme.animation.med};

    &.noteOn {
        background: ${({ theme }) => theme.colors.machine.tablature.noteOn};
    }
    &.noteOff {
        background: ${({ theme }) => theme.colors.machine.tablature.noteOff};
    }

    &.noteOn:hover {
        background: ${({ theme }) => theme.colors.machine.tablature.hover};
    }

    &.selected, &.selected:hover {
        background: ${({ theme }) => theme.colors.machine.tablature.selected};
    }
`



const GuitarTablatureTrack = memo(({ guitar, machineId, updateControl=null }) => {

    const [globalMousePos, setGlobalMousePos] = useState({});
    const [localMousePos, setLocalMousePos] = useState({});

    const [tablature, setTablature] = useState([
        {
            start       : 0,        //  Percentage Start Point eg. 0.5
            end         : 1,        //  Percentage End Point eg. 0.75
            state       : true,     //  noteOn or noteOff
            playStyle   : 'open',   //  Guitar PlayStyle
            strings     : [
                {                   //  Each String
                    fret    : 0,
                    state   : false,  //  noteOn or noteOff
                },
                {
                    fret    : 0,
                    state   : false,  //  noteOn or noteOff
                },
                {
                    fret    : 0,
                    state   : false,  //  noteOn or noteOff
                },
                {
                    fret    : 0,
                    state   : false,  //  noteOn or noteOff
                },
                {
                    fret    : 0,
                    state   : false,  //  noteOn or noteOff
                },
                {
                    fret    : 0,
                    state   : false,  //  noteOn or noteOff
                }
            ]
        }
    ]);

    const getIdOfClosestNumberInArray = (array, target) => {

        let closestId = 0;
        let closestDiff = Infinity;

        array.forEach((item, index) => {

            const diff = Math.abs(item - target);

            if (diff < closestDiff) {
                closestDiff = diff;
                closestId = index;
            }
        });


        return closestId;
    }


    const cloneStrings = (strings) => {
        return [
            {                   //  Each String
                fret    : strings[0].fret,
                state   : strings[0].state,  //  noteOn or noteOff
            },
            {
                fret    : strings[1].fret,
                state   : strings[1].state,  //  noteOn or noteOff
            },
            {
                fret    : strings[2].fret,
                state   : strings[2].state,  //  noteOn or noteOff
            },
            {
                fret    : strings[3].fret,
                state   : strings[3].state,  //  noteOn or noteOff
            },
            {
                fret    : strings[4].fret,
                state   : strings[4].state,  //  noteOn or noteOff
            },
            {
                fret    : strings[5].fret,
                state   : strings[5].state,  //  noteOn or noteOff
            }
        ];
    }


    const cloneGrooveSkeleton = () => {
/*         console.log('Cloning Groove Skeleton to Guitar #' + machineId);
        console.log('window.grooveSkeleton', window.grooveSkeleton); */

        const newTablature = [];

        for (let i=0; i < window.grooveSkeleton.groove.length; i++) {
            let newGuitarTabNote = {
                start       : window.grooveSkeleton.groove[i].start,        //  Percentage Start Point eg. 0.5
                end         : window.grooveSkeleton.groove[i].end,        //  Percentage End Point eg. 0.75
                state       : window.grooveSkeleton.groove[i].state
            }

            newTablature.push(newGuitarTabNote);
        }

        //  If GrooveSkeleton & Tab have same number of notes assign them to their array id number
        if(newTablature.length === window.guitars[machineId].tablature.length) {

            console.log('cloneGrooveSkeleton() => Matching note assignments as Arrays are same length');

            for (let i=0; i < window.guitars[machineId].tablature.length; i++) {
                
                newTablature[i].playStyle = window.guitars[machineId].tablature[i].playStyle;
                newTablature[i].strings = cloneStrings(window.guitars[machineId].tablature[i].strings);

            }

        
        //  If Less then choose 
            //  Otherwise choose the closest note
        } else {
            
            //console.log('cloneGrooveSkeleton() => Getting closest starting notes to new groove array');


            let startPointArray = [];


            for (let i=0; i < window.guitars[machineId].tablature.length; i++) {
                startPointArray.push(window.guitars[machineId].tablature[i].start);
            }

            //console.log(window.guitars[machineId].tablature, startPointArray);

            for (let i=0; i < newTablature.length; i++) {

                let closestId = getIdOfClosestNumberInArray(startPointArray, newTablature[i].start);

                //console.log(closestId, newTablature[i].start, startPointArray); 

                newTablature[i].playStyle = window.guitars[machineId].tablature[closestId].playStyle;
                newTablature[i].strings = cloneStrings(window.guitars[machineId].tablature[closestId].strings);

            }

        }
        
        setTablature(newTablature);

    }


    useEffect(() => {
        EventBus.on("Update GuitarMachine", (event) => {
            if (machineId === event.data) {
                if (event.label === "Clone GrooveSkeleton") {
                    console.log( "Clone GrooveSkeleton", tablature);
                    cloneGrooveSkeleton();
                }
            };
        });
  
    
        return () => {
          EventBus.remove("Update GuitarMachine");
        };
      }, []);



    const renderTabOld = (guitarInstrument) => {
        return guitarInstrument.GetStrings().map((guitarString, key) => 
            <String
                key={key}
                style={{}}
                className={'fret-string'}
            >
            </String>
        )
    }




    useEffect(() => {
        //console.log(`tablature update:`, tablature);

        window.guitars[machineId].tablature = tablature;
    }, [tablature]);

    const controlRef = useRef(null); 


    const initialize = () => {
        console.log('Tab Initialize');
    }
    


    useEffect(() => {

        initialize();

        const handleMouseMove = (event) => {
            setGlobalMousePos({
                x: event.clientX,
                y: event.clientY,
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener(
                'mousemove',
                handleMouseMove
            );
        };
    }, []);



    const [selectedNote, setSelectedNote] = useState(-1);

    const selectNote = (event, noteId) => {
        if (selectedNote === noteId) {
            setSelectedNote(-1);    
        } else if (tablature[noteId].state) {
            setSelectedNote(noteId);
        }
        
    }

    useEffect(() => {

        console.log(`selectedNote update:`, selectedNote);
        updateControl('selectedNote', selectedNote);

    }, [selectedNote]);




    const renderTab = (tablatureData) => {
        

        let numberOfActiveBars = window.transport.loop.to - window.transport.loop.from + 1;

        let barLength = 1 / config.number_of_bars;
        
        let totalLength = numberOfActiveBars * barLength;

        let startPoint = (window.transport.loop.from - 1) * barLength;
        let endPoint = (window.transport.loop.to) * barLength;

        //console.log(machineId, tablatureData);

        return tablatureData.map((grooveNote, key) => {

            let noteStartPoint = (grooveNote.start-startPoint) / totalLength;

            let noteEndPoint = (grooveNote.end-startPoint) / totalLength;

            //  If note runs past the end of the loop then set it to the end of the loop
            if (grooveNote.end >= endPoint) {
                noteEndPoint = 1;
            };

            //console.log(noteStartPoint, noteEndPoint);

            return (grooveNote.start >= startPoint && grooveNote.start < endPoint?
                /* grooveNote.start >= startPoint && grooveNote.end <= endPoint? */
            <GrooveNote className={clsx(grooveNote.state ? 'noteOn' : 'noteOff', selectedNote === key ? 'selected' : '')}
                key={key}
                onClick={(event)=> {selectNote(event, key)}}
                style={{
                    left: (noteStartPoint * controlRef?.current?.offsetWidth) + 'px',
                    right: -1 *((noteEndPoint * controlRef?.current?.offsetWidth) - controlRef?.current?.offsetWidth) + 'px',
                }}
            >
            </GrooveNote>
            : <></>
            )
        })

    }

    return (
        <Container className={'tablature'}>
            GUITAR #{machineId+1}TALBATURE TRACK
            {/* {renderTab(guitar)} */}
            <Track ref={controlRef}>
                {renderTab(tablature)}
            </Track>
        </Container>
    );

});

GuitarTablatureTrack.displayName = 'GuitarTablatureTrack';

export default GuitarTablatureTrack;