import React, { memo, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import clsx from 'clsx';
import { config } from '../../../utils/config';
import EventBus from '../../../systems/EventBus';
import GuitarUtils from '../../../music/GuitarUtils';
import { WebMidi } from 'webmidi';
import { useGuitarMachine } from '../../../../State/GuitarMachine/Machine';
import { useDispatch, useSelector } from 'react-redux';
import { attachGuitarMachine } from '../../../../State/GuitarMachine/actions';

const Container = styled.div`
`;

const String = styled.div`
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
  height: calc(12px * 7); /* ${({ theme }) => theme.sizes.machine.tablature.height}; */
  background: ${({ theme }) => theme.colors.grooveSkeleton.track.background};
  flex-grow: 1;
  display: flex;
  align-items: center;
  position: relative;
  z-index: ${({ theme }) => theme.heirarchy.grooveSkeleton.track};
  cursor: pointer;
  margin: ${({ theme }) => theme.sizes.grooveSkeleton.track.marginVertical} 0;
`

const GrooveLaneGuidePlayMarker = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 2px;
    z-index: ${({ theme }) => theme.heirarchy.grooveSkeleton.groovePlayMarker};
    box-sizing: border-box;
    border-left: 1px solid ${({ theme }) => theme.colors.grooveSkeleton.track.guidePlayMarker};
    border-right: 1px solid ${({ theme }) => theme.colors.grooveSkeleton.track.guidePlayMarker};
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

    display: flex;
    flex-direction: column-reverse;

    transition: background ${({ theme }) => theme.animation.med};

    &.noteOn {
        background: ${({ theme }) => theme.colors.machine.tablature.noteOn};
    }
    &.noteOff {
        background: ${({ theme }) => theme.colors.machine.tablature.noteOff};
    }

    &.noteOff .noteText {
        display: none;
    }

    &.noteOn:hover {
        background: ${({ theme }) => theme.colors.machine.tablature.hover};
    }

    &.selected, &.selected:hover {
        background: ${({ theme }) => theme.colors.machine.tablature.selected};
        color: black;
    }
`

const GrooveNoteText = styled.div`
    font-size: 10px;
    line-height: 12px;
    height: 180px;
    padding-left: 3px;
    font-weight: 700;
`

const GuitarTablatureTrack = memo(({ guitar, machineId, updateControl = null }) => {


    const guitarMachine = useGuitarMachine(machineId);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(attachGuitarMachine(machineId, {
            tablatureTrack: {
                nextNote: () => {selectNextNote()},
                previousNote: () => {selectPreviousNote()},    
            }
        }));
    }, [dispatch])



    const [globalMousePos, setGlobalMousePos] = useState({});
    const [localMousePos, setLocalMousePos] = useState({});

    const [playMarkerPosition, setPlayMarkerPosition] = useState(0);


    const [tablature, setTablature] = useState([
        {
            start: 0,        //  Percentage Start Point eg. 0.5
            end: 1,        //  Percentage End Point eg. 0.75
            state: true,     //  noteOn or noteOff
            playStyle: 'open',   //  Guitar PlayStyle
            strings: [
                {                   //  Each String
                    fret: 0,
                    state: false,  //  noteOn or noteOff
                },
                {
                    fret: 0,
                    state: false,  //  noteOn or noteOff
                },
                {
                    fret: 0,
                    state: false,  //  noteOn or noteOff
                },
                {
                    fret: 0,
                    state: false,  //  noteOn or noteOff
                },
                {
                    fret: 0,
                    state: false,  //  noteOn or noteOff
                },
                {
                    fret: 0,
                    state: false,  //  noteOn or noteOff
                }
            ]
        }
    ]);



    //=================================
    //  MIDI - [START]
    //=================================


    const initialize = () => {
        console.log(`Guitar #${machineId} Tab Initialize`);

        window.midi.guitars[machineId].startMidiPlay = startMidiPlay;
        window.midi.guitars[machineId].stopMidiPlay = stopMidiPlay;
        window.midi.guitars[machineId].updateMidiFrameAction = updateMidiFrameAction;
        window.midi.guitars[machineId].updateMidiFrameGUI = updateMidiFrameGUI;
        window.midi.guitars[machineId].initialized = true;

        window.guitars[machineId].actions.cloneGrooveSkeleton = cloneGrooveSkeleton;
    }



    const PlayNote = (note) => {

        //console.log(util.inspect(window.midi.midiCore, {showHidden: false, depth: null, colors: true}));

        if (!window.midi.midiCore.midiClock.isPlaying) {
            return;
        }

        //console.log('noteOn', note, guitar.GetStrings());

        let midiOutput = window.guitars[machineId].midi.output.id;

        // Set Play Style
        GuitarUtils.SetPlayStyle(note.playStyle, midiOutput);

        // Play Through each string
        // Get note from fret of each string
        note.strings.forEach((string, index) => {
            //console.log(index, string.state);
            if (string.state) {
                //console.log('Play', guitar.GetStrings()[index].frets[string.fret]);
                GuitarUtils.PlayGuitarNoteOnly(guitar.GetStrings()[index].frets[string.fret], midiOutput);
            }
        });

    }

    const StopNote = (note) => {


        let midiOutput = window.guitars[machineId].midi.output.id;


        // Set Play Style
        GuitarUtils.UnsetPlayStyle(note.playStyle, midiOutput);



        // Play Through each string
        // Get note from fret of each string
        note.strings.forEach((string, index) => {
            //console.log(index, string.state);
            if (string.state) {
                //console.log('Stop', guitar.GetStrings()[index].frets[string.fret]);
                GuitarUtils.StopGuitarNoteOnly(guitar.GetStrings()[index].frets[string.fret], midiOutput);
            }
        });

    }

    const startMidiPlay = () => {
        //  Clear Midi Output for device
        //console.log('grooveSkeleton.startMidiPlay');
        if (WebMidi.outputs.length === 0) return;

    }




    const stopMidiPlay = () => {
        //  Clear Midi Output for device

        if (WebMidi.outputs.length === 0) return;
        //console.log('grooveSkeleton.stopMidiPlay');

        let relativeClockTick = getRelativeClockTick();

        let noteOff = window.guitars[machineId].tablature.find((grooveNote) => (grooveNote.start <= relativeClockTick && grooveNote.end >= relativeClockTick));

        if (!noteOff) return;
        StopNote(noteOff);

    }


    const getTotalActiveBars = () => {
        return window.transport.loop.to - window.transport.loop.from + 1;
    }

    const getRelativeClockTick = () => {

        /*

            calculate from the loop.from

            and finish on the loop.to


            dont show anything before the loop.from
            dont show anything after the loop.to

            recalculate the position based of the 1.0 percentage position within the grooveData 0 => 1.0
            calculate the 1.0 (100%) from the number of bars within loop.from => loop.to

        */
        /* 
                let startBar = window.transport.loop.from - 1;
                let endBar = window.transport.loop.to; */



        let numberOfActiveBars = window.transport.loop.to - window.transport.loop.from + 1;

        let barLength = 1 / config.number_of_bars;

        let totalLength = numberOfActiveBars * barLength;

        let startPoint = (window.transport.loop.from - 1) * barLength;
        let endPoint = (window.transport.loop.to) * barLength;

        let relativeTick = startPoint + (window.midi.midiCore.midiClock.clockTick * totalLength);


        /*         
                console.log(
                    'clockTick', window.midi.midiCore.midiClock.clockTick, ' => ', relativeTick,
                    'startPoint', startPoint,
                    'endPoint', endPoint
                ); */

        return relativeTick;
    }


    const updateMidiFrameAction = () => {

        //console.log( window.midi.midiCore.midiClock.tick, 'clockTick', window.midi.midiCore.midiClock.clockTick);

        let relativeClockTick = getRelativeClockTick();

        let noteOff = window.guitars[machineId].tablature.find((grooveNote) => grooveNote.end === relativeClockTick);

        if (noteOff && noteOff.state) {
            StopNote(noteOff);
        }


        let noteOn = window.guitars[machineId].tablature.find((grooveNote) => grooveNote.start === relativeClockTick);

        if (noteOn && noteOn.state) {
            PlayNote(noteOn);
        }

    }


    const updateMidiFrameGUI = () => {

        setPlayMarkerPosition(
            (window.midi.midiCore.midiClock.tick / window.midi.midiCore.midiClock.activeBars)
            * (controlRef?.current?.offsetWidth / window.midi.midiCore.midiClock.midiResolution)
        );

        //setPlayMarkerPosition(window.midi.midiCore.midiClock.tick * (controlRef?.current?.offsetWidth / window.midi.midiCore.midiClock.midiResolution));
    }



    //=================================
    //  MIDI - [END]
    //=================================






































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
                fret: strings[0].fret,
                state: strings[0].state,  //  noteOn or noteOff
            },
            {
                fret: strings[1].fret,
                state: strings[1].state,  //  noteOn or noteOff
            },
            {
                fret: strings[2].fret,
                state: strings[2].state,  //  noteOn or noteOff
            },
            {
                fret: strings[3].fret,
                state: strings[3].state,  //  noteOn or noteOff
            },
            {
                fret: strings[4].fret,
                state: strings[4].state,  //  noteOn or noteOff
            },
            {
                fret: strings[5].fret,
                state: strings[5].state,  //  noteOn or noteOff
            }
        ];
    }


    const cloneGrooveSkeleton = () => {
        /*         console.log('Cloning Groove Skeleton to Guitar #' + machineId);
                console.log('window.grooveSkeleton', window.grooveSkeleton); */

        const newTablature = [];

        for (let i = 0; i < window.grooveSkeleton.groove.length; i++) {
            let newGuitarTabNote = {
                start: window.grooveSkeleton.groove[i].start,        //  Percentage Start Point eg. 0.5
                end: window.grooveSkeleton.groove[i].end,        //  Percentage End Point eg. 0.75
                state: window.grooveSkeleton.groove[i].state
            }

            newTablature.push(newGuitarTabNote);
        }

        //  If GrooveSkeleton & Tab have same number of notes assign them to their array id number
        if (newTablature.length === window.guitars[machineId].tablature.length) {

            //console.log('cloneGrooveSkeleton() => Matching note assignments as Arrays are same length');

            for (let i = 0; i < window.guitars[machineId].tablature.length; i++) {

                newTablature[i].playStyle = window.guitars[machineId].tablature[i].playStyle;
                newTablature[i].strings = cloneStrings(window.guitars[machineId].tablature[i].strings);

            }


            //  If Less then choose 
            //  Otherwise choose the closest note
        } else {

            //console.log('cloneGrooveSkeleton() => Getting closest starting notes to new groove array');


            let startPointArray = [];


            for (let i = 0; i < window.guitars[machineId].tablature.length; i++) {
                startPointArray.push(window.guitars[machineId].tablature[i].start);
            }

            //console.log(window.guitars[machineId].tablature, startPointArray);

            for (let i = 0; i < newTablature.length; i++) {

                let closestId = getIdOfClosestNumberInArray(startPointArray, newTablature[i].start);

                //console.log(closestId, newTablature[i].start, startPointArray); 

                newTablature[i].playStyle = window.guitars[machineId].tablature[closestId].playStyle;
                newTablature[i].strings = cloneStrings(window.guitars[machineId].tablature[closestId].strings);

            }

        }

        setTablature(newTablature);
        window.guitars[machineId].tablature = newTablature; 

    }


    useEffect(() => {


        EventBus.on("Update GuitarMachine", (event) => {
            if (machineId === event.data) {
                if (event.label === "Clone GrooveSkeleton") {
                    console.log("Clone GrooveSkeleton", tablature);
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



/*     const [selectedNote, setSelectedNote] = useState(-1); */




    const selectNote = (event, noteId) => {

        if (guitarMachine.machine.selectedNote === noteId) {
            guitarMachine.selectNote(-1);
        } else if (tablature[noteId].state) {
            guitarMachine.selectNote(noteId);
        }

    }


    const selectNextNote = () => {
        console.log('nextNote()', guitarMachine.machine.selectedNote);


    }

    const selectPreviousNote = () => {
        console.log('previousNote()', guitarMachine.machine.selectedNote);
    }


/* 
    useEffect(() => {

        console.log(`selectedNote update:`, selectedNote);
        updateControl('selectedNote', selectedNote);

    }, [selectedNote]); */




    const renderTab = (tablatureData) => {


        let numberOfActiveBars = window.transport.loop.to - window.transport.loop.from + 1;

        let barLength = 1 / config.number_of_bars;

        let totalLength = numberOfActiveBars * barLength;

        let startPoint = (window.transport.loop.from - 1) * barLength;
        let endPoint = (window.transport.loop.to) * barLength;

        //console.log(machineId, tablatureData);

        return tablatureData.map((grooveNote, key) => {

            let noteStartPoint = (grooveNote.start - startPoint) / totalLength;

            let noteEndPoint = (grooveNote.end - startPoint) / totalLength;

            //  If note runs past the end of the loop then set it to the end of the loop
            if (grooveNote.end >= endPoint) {
                noteEndPoint = 1;
            };

            const noteTexts = grooveNote.strings.map((string, key) => {
                return (
                    string.state ?
                        <GrooveNoteText className={'noteText'} key={key}>{string.fret}</GrooveNoteText>
                        :
                        <GrooveNoteText className={'noteText'} key={key}></GrooveNoteText>)
            })


            //console.log(noteStartPoint, noteEndPoint);

            return (grooveNote.start >= startPoint && grooveNote.start < endPoint ?
                /* grooveNote.start >= startPoint && grooveNote.end <= endPoint? */
                <GrooveNote className={clsx(grooveNote.state ? 'noteOn' : 'noteOff', guitarMachine.machine.selectedNote === key ? 'selected' : '')}
                    key={key}
                    onClick={(event) => { selectNote(event, key) }}
                    style={{
                        left: (noteStartPoint * controlRef?.current?.offsetWidth) + 'px',
                        right: -1 * ((noteEndPoint * controlRef?.current?.offsetWidth) - controlRef?.current?.offsetWidth) + 'px',
                    }}
                >
                    <GrooveNoteText className={'noteText'} >{grooveNote.playStyle.toUpperCase()}</GrooveNoteText>
                    {noteTexts}

                </GrooveNote>
                : <div key={key}></div>
            )
        })

    }

    return (
        <Container className={'tablature'}>
            GUITAR #{machineId + 1}TALBATURE TRACK
            {/* {renderTab(guitar)} */}
            <Track ref={controlRef}>
                {renderTab(tablature)}
                <GrooveLaneGuidePlayMarker
                    style={{
                        left: (playMarkerPosition - 1) + 'px',
                    }}
                />
            </Track>
        </Container>
    );

});

GuitarTablatureTrack.displayName = 'GuitarTablatureTrack';

export default GuitarTablatureTrack;