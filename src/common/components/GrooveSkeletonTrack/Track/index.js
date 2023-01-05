import React, { memo, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import clsx from 'clsx';
import Maths from '../../../utils/Maths';
import MidiUtils from '../../../music/MidiUtils';
import util from 'util';
import { WebMidi } from 'webmidi';

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.grooveSkeleton.track.text};
  margin-bottom: ${({ theme }) => theme.sizes.grooveSkeleton.track.marginBottom};
`

const Track = styled.div`
  height: ${({ theme }) => theme.sizes.grooveSkeleton.track.height};
  background: ${({ theme }) => theme.colors.grooveSkeleton.track.background};
  flex-grow: 1;
  display: flex;
  align-items: center;
  position: relative;
  z-index: ${({ theme }) => theme.heirarchy.grooveSkeleton.track};
  cursor: pointer;
  margin: ${({ theme }) => theme.sizes.grooveSkeleton.track.marginVertical} 0;

  .positionMarker {
    opacity: 0;
    transition: opacity ${({ theme }) => theme.animation.med};
  }

  &:hover .positionMarker {
    opacity: 1;
  }
`

const ControlLayer = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: ${({ theme }) => theme.heirarchy.grooveSkeleton.controlLayer};
`;

const PositionMarker = styled.div`
    top: 0;
    bottom: 0;
    background: ${({ theme }) => theme.colors.grooveSkeleton.track.positionMarker};
    width: 2px;
    position: absolute;
    left: -1px;
    user-select: none;
    z-index: ${({ theme }) => theme.heirarchy.grooveSkeleton.positionMarker};
`


const GrooveLaneGuide = styled.div`
    background: ${({ theme }) => theme.colors.grooveSkeleton.track.guideBackground};
    height: ${({ theme }) => theme.sizes.grooveSkeleton.guide.height};
    position: absolute;
    top: 0px;
    bottom: 0;
    left: 0;
    right: 0;
    box-sizing: border-box;
    display: flex;
    z-index: ${({ theme }) => theme.heirarchy.grooveSkeleton.guideLane};
`

const GrooveLaneGuideBar = styled.div`
    position: absolute;
    bottom: 0;
    background: transparent;
    height: 100%;
    z-index: ${({ theme }) => theme.heirarchy.grooveSkeleton.grooveNote};
    box-sizing: border-box;

    border-left: 1px solid ${({ theme }) => theme.colors.grooveSkeleton.track.guideBar};
    border-right: 1px solid ${({ theme }) => theme.colors.grooveSkeleton.track.guideBar};
`

const GrooveLaneGuideBeat = styled.div`
    position: absolute;
    bottom: 0;
    width: 2px;
    height: 100%;
    z-index: ${({ theme }) => theme.heirarchy.grooveSkeleton.grooveNote};
    box-sizing: border-box;
    border-left: 1px solid ${({ theme }) => theme.colors.grooveSkeleton.track.guideBeat};
    border-right: 1px solid ${({ theme }) => theme.colors.grooveSkeleton.track.guideBeat};

`

const GrooveLaneGuideNote = styled.div`
    position: absolute;
    bottom: 0;
    width: 2px;
    height: 100%;
    z-index: ${({ theme }) => theme.heirarchy.grooveSkeleton.grooveNote};
    box-sizing: border-box;
    border-left: 1px solid ${({ theme }) => theme.colors.grooveSkeleton.track.guideNote};
    border-right: 1px solid ${({ theme }) => theme.colors.grooveSkeleton.track.guideNote};
`

const GrooveLaneGuidePlayMarker = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 2px;
    height: ${({ theme }) => theme.sizes.grooveSkeleton.track.height};
    z-index: ${({ theme }) => theme.heirarchy.grooveSkeleton.groovePlayMarker};
    box-sizing: border-box;
    border-left: 1px solid ${({ theme }) => theme.colors.grooveSkeleton.track.guidePlayMarker};
    border-right: 1px solid ${({ theme }) => theme.colors.grooveSkeleton.track.guidePlayMarker};
`

const GrooveLane = styled.div`
    position: absolute;
    top: 0px;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: ${({ theme }) => theme.heirarchy.grooveSkeleton.grooveLane};
`

const GrooveNote = styled.div`
    position: absolute;
    top: ${({ theme }) => theme.sizes.grooveSkeleton.guide.height};
    bottom: 0;
    opacity: 0.5;
    z-index: ${({ theme }) => theme.heirarchy.grooveSkeleton.grooveNote};
    box-sizing: border-box;


    border-left: 1px solid ${({ theme }) => theme.colors.grooveSkeleton.track.noteBorder};
    border-right: 1px solid ${({ theme }) => theme.colors.grooveSkeleton.track.noteBorder};

    &.noteOn {
        background: ${({ theme }) => theme.colors.grooveSkeleton.track.noteOn};
    }
    &.noteOff {
        background: ${({ theme }) => theme.colors.grooveSkeleton.track.noteOff};
    }

`

/* window.grooveSkeleton = {
    resolution  : 32,
    groove      : [
        
    ],
    midi        : {
        output      : {
            name : 'Riff Generator',
            id : 0
        },
    }
}; */


const GrooveSkeletonTrackTrackLane = memo(({ children }) => {

    const [globalMousePos, setGlobalMousePos] = useState({});
    const [localMousePos, setLocalMousePos] = useState({});

    const [selectorPosition, setSelectorPosition] = useState(0);
    
    const [positionMarker, setPositionMarker] = useState(0);

    const [playMarkerPosition, setPlayMarkerPosition] = useState(0);


    const [groove, setGroove] = useState([
        {
            start   : 0,    //  Percentage Start Point eg. 0.5
            end     : 1,    //  Percentage End Point eg. 0.75
            state   : true  //  noteOn or noteOff
        }
    ]);

    const controlRef = useRef(null);


    const initialize = () => {
        window.midi.grooveSkeleton.startMidiPlay = startMidiPlay;
        window.midi.grooveSkeleton.stopMidiPlay = stopMidiPlay;
        window.midi.grooveSkeleton.updateMidiFrameAction = updateMidiFrameAction;
        window.midi.grooveSkeleton.updateMidiFrameGUI = updateMidiFrameGUI;
        window.midi.grooveSkeleton.initialized = true;
    }
    

    const PlayNote = () => {

        //console.log(util.inspect(window.midi.midiCore, {showHidden: false, depth: null, colors: true}));

        if(!window.midi.midiCore.midiClock.isPlaying) {
            return;
        }

        //console.log('noteOn', bassRootNote);
        let bassRootNote = window.riffSettings.scale.rootNote + window.riffSettings.rootOctave;
        WebMidi.outputs[window.grooveSkeleton.midi.output.id].playNote(bassRootNote);

    }

    const StopNote = () => {

        //console.log('noteOff', bassRootNote);
        let bassRootNote = window.riffSettings.scale.rootNote + window.riffSettings.rootOctave;
        WebMidi.outputs[window.grooveSkeleton.midi.output.id].stopNote(bassRootNote);

    }

    const startMidiPlay = () => {
        //  Clear Midi Output for device
        console.log('grooveSkeleton.startMidiPlay');
        if(WebMidi.outputs.length === 0) return;

    }
    



    const stopMidiPlay = () => {
        //  Clear Midi Output for device
        
        if(WebMidi.outputs.length === 0) return;
        console.log('grooveSkeleton.stopMidiPlay');
        StopNote();
        
    }

    const updateMidiFrameAction = () => {

        let noteOff = window.grooveSkeleton.groove.find((grooveNote) => grooveNote.end === window.midi.midiCore.midiClock.clockTick);

        if (noteOff) {
            StopNote();
        }


        let noteOn = window.grooveSkeleton.groove.find((grooveNote) => grooveNote.start === window.midi.midiCore.midiClock.clockTick);

        if (noteOn && noteOn.state) {
            PlayNote();
        }

    }


    const updateMidiFrameGUI = () => {
        setPlayMarkerPosition(window.midi.midiCore.midiClock.tick * (controlRef?.current?.offsetWidth / window.midi.midiCore.midiClock.midiResolution));
    }


    const getAbsoluteOffset = (el) => {
        const rect = el.getBoundingClientRect();
        return {
            left: rect.left + window.scrollX,
            top: rect.top + window.scrollY
        }
    }


    const handleMouseMove = (event) => {

        //  Correct for Absolute Positioning
        const offset = getAbsoluteOffset(event.target);

        // 👇 Get mouse position relative to element
        const localX = (event.clientX - offset.left) - event.target.offsetLeft;
        const localY = event.clientY - event.target.offsetTop;

        setSelectorPosition(localX / event.target.offsetWidth);

        setLocalMousePos({ 
            x: localX, 
            y: localY
        });


        setPositionMarker(getResolutionPosition(localX / event.target.offsetWidth) * event.target.offsetWidth);
    };


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


    useEffect(() => {
        console.log('groove update:', groove);

        window.grooveSkeleton.groove = groove;
    }, [groove]);


    const getResolutionPosition = (position) => {
        return Maths.closestNumber(position, (1/window.grooveSkeleton.resolution));
    };



    const OnTrackClick = (event) => {
        let resolutionSelectorPosition = getResolutionPosition(selectorPosition);
        
        if (resolutionSelectorPosition === 0 || resolutionSelectorPosition === 1) {
            console.log("Not Valid Position", resolutionSelectorPosition);
            return;
        }
        
        if (event.type === 'click' && !event.ctrlKey) {

            console.log('Add Split', resolutionSelectorPosition);

            let newGrooveNote = {
                start   : 0,    //  Percentage Start Point eg. 0.5
                end     : 1,    //  Percentage End Point eg. 0.75
                state   : true  //  noteOn or noteOff
            };

            let newGrooveArray =  [...groove];

            let exists = false;

            //  CHECK IF EXISTS
            newGrooveArray.forEach((grooveNote, index) => {

                if (grooveNote.start === resolutionSelectorPosition || grooveNote.end === resolutionSelectorPosition) {
                    exists = true;
                };

            });

            if (exists) {
                console.log("Already Exists!");
                return;
            }

            newGrooveArray.forEach((grooveNote, index) => {

                if (grooveNote.start < resolutionSelectorPosition && grooveNote.end > resolutionSelectorPosition) {
                    
                    newGrooveNote.start = resolutionSelectorPosition;
                    newGrooveNote.end = grooveNote.end;

                    newGrooveArray[index].end = resolutionSelectorPosition;
                    
                };

            });

            newGrooveArray.push(newGrooveNote);
            

            setGroove(newGrooveArray);

        } else if (event.type === 'click' && event.ctrlKey) {

            console.log('Remove Split', resolutionSelectorPosition);

            let newGrooveArray =  [...groove];

            let exists = false;

            //  CHECK IF EXISTS
            newGrooveArray.forEach((grooveNote, index) => {

                if (grooveNote.start === resolutionSelectorPosition || grooveNote.end === resolutionSelectorPosition) {
                    exists = true;
                };

            });

            if (!exists) {
                console.log("Doesnt Exist!");
                return;
            }

            let indexToUpdate = -1;
            let indexToRemove = -1;


            newGrooveArray.forEach((grooveNote, index) => {

                if (grooveNote.end === resolutionSelectorPosition) {
                    indexToUpdate = index;
                } else if (grooveNote.start === resolutionSelectorPosition) {
                    indexToRemove = index;
                };

            });


            console.log('indexToUpdate', indexToUpdate, ' | indexToRemove', indexToRemove);

            //  Update GrooveNote
            newGrooveArray[indexToUpdate].end = newGrooveArray[indexToRemove].end;

            //  Remove GrooveNote
            newGrooveArray.splice(indexToRemove, 1);

            setGroove(newGrooveArray);



        } else if (event.type === 'contextmenu') {
            console.log("Toggle GrooveNote State");

            let newGrooveArray =  [...groove];

            newGrooveArray.forEach((grooveNote, index) => {

                if (grooveNote.start < selectorPosition && grooveNote.end > selectorPosition) {
                    
                    newGrooveArray[index].state = !newGrooveArray[index].state;
                    
                };

            });
           
            setGroove(newGrooveArray);
        };

    }



    const renderGrooveGuide = () => {

        let barCount = 1;
        let beatCount = 4;
        let noteCount = window.grooveSkeleton.resolution;


        let barLength = controlRef?.current?.offsetWidth / barCount;
        let beatLength = barLength / beatCount;
        let noteLength = barLength / noteCount;

        let notesInBeat = noteCount/beatCount;

        const bars = [];
        for (let i = 0; i < barCount; i++) {
            bars.push(
                <GrooveLaneGuideBar 
                    key={`${i}`}
                    style={{
                        width: (barLength) + 'px',
                        left: (barLength * i) + 'px'
                    }}
                />
            );
            for (let ii = 1; ii < beatCount; ii++) {
                bars.push(
                    <GrooveLaneGuideBeat 
                        key={`${i}-${ii}`}
                        style={{
                            left: ((barLength * i) + (beatLength * ii) ) - 1 + 'px'
                        }}
                    />
                );
                for (let iii = 0; iii < (noteCount); iii++) {
                    if (iii % notesInBeat) {
                        bars.push(
                            <GrooveLaneGuideNote 
                                key={`${i}-${ii}-${iii}`}
                                style={{
                                    left: ((barLength * i) + (noteLength * iii)) - 1 + 'px'
                                }}
                            />
                        );
                    }
                }
            }
        }


        return (
            <>{bars}</>
        )
    }




    const renderGroove = (grooveData) => {
        
        return grooveData.map((grooveNote, key) =>
            <GrooveNote className={clsx(grooveNote.state ? 'noteOn' : 'noteOff')}
                key={key}
                style={{
                    left: (grooveNote.start * controlRef?.current?.offsetWidth) + 'px',
                    right: -1 *((grooveNote.end * controlRef?.current?.offsetWidth) - controlRef?.current?.offsetWidth) + 'px',
                }}
            >
            </GrooveNote>
        )

    }




    return (
        <>
            <Container>

                <Track>
                    <GrooveLaneGuide>
                        {renderGrooveGuide()}
                        <GrooveLaneGuidePlayMarker 
                            style={{
                                left: (playMarkerPosition-1) + 'px',
                            }}
                        />
                    </GrooveLaneGuide>

                    <ControlLayer
                        ref={controlRef}
                        onMouseMove={handleMouseMove}
                        onClick={OnTrackClick}
                        onContextMenu={OnTrackClick}
                    />

                    <PositionMarker
                        className={'positionMarker'}
                        style={{
                            left: (positionMarker-1) + 'px',
                        }}
                    />

                    <GrooveLane>
                        {renderGroove(groove)}
                    </GrooveLane>

                </Track>

            </Container>
{/*             {(1 * controlRef?.current?.offsetWidth) - controlRef?.current?.offsetWidth} | 
            {selectorPosition} | 
            Local : ({localMousePos.x}, {localMousePos.y}) | Global : ({globalMousePos.x}, {globalMousePos.y}) */}
        </>
    );
});

GrooveSkeletonTrackTrackLane.displayName = 'GrooveSkeletonTrackTrackLane';

export default GrooveSkeletonTrackTrackLane;