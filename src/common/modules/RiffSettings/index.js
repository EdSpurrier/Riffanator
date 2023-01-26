import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components';
import PianoKeyboardController from '../../components/PianoKeyboardController';
import EventBus from '../../systems/EventBus';
import Music from '../../utils/Music';
import clsx from 'clsx';

const Container = styled.div`
    background: ${({ theme }) => theme.colors.riffSettings.background};
    width: calc(100% - ${({ theme }) => theme.colors.riffSettings.border} - ${({ theme }) => theme.colors.riffSettings.border});
    padding: ${({ theme }) => theme.sizes.riffSettings.paddingVertical} ${({ theme }) => theme.sizes.riffSettings.paddingHorizontal};
    border-width: ${({ theme }) => theme.sizes.riffSettings.border};
    border-style: solid;
    border-color: ${({ theme }) => theme.colors.riffSettings.border};
    font-size: ${({ theme }) => theme.fontSizes.riffSettings.controlBar};

    select {
        font-size: ${({ theme }) => theme.fontSizes.riffSettings.controlBar};
        color: ${({ theme }) => theme.colors.riffSettings.text};
        background: ${({ theme }) => theme.colors.riffSettings.background}; 
        text-align: left;
        -webkit-appearance: none;
        -moz-appearance: none;
        text-overflow: '';
        cursor: pointer;
        outline: none;
        margin-bottom: -2px;
        padding: 5px 3px;
    }
`

const ControlBar = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
`

const Control = styled.div`
    margin-right: ${({ theme }) => theme.sizes.riffSettings.controlBar.controlSpacingHorizontal};
    display: flex;
    align-items: center;
`

const Scale = styled.div`
    display: flex;
    align-items: center;
`


const ScaleTypeSelector = styled.select`

`;


const RootOctave = styled.div`
    display: flex;
    align-items: center;
`

const ControlColumn = styled.div`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    gap: 5px;
    justify-content: space-between;
`


const Input = styled.input`
    padding: ${({ theme }) => theme.sizes.transport.input.padding};
    width: 50px;
    color: ${({ theme }) => theme.colors.transport.text};
    background: ${({ theme }) => theme.colors.transport.input.background};
    border: none;
    border-radius: 3px;
    text-align: center;
    font-size: ${({ theme }) => theme.fontSizes.riffSettings.controlBar};
    user-select: none;

    &.rootOctave {
        width: 30px;
        text-align: left;
        background: transparent;
        padding: 0;
        margin-bottom: -2px;
    }
`

window.riffSettings = {
    rootOctave  : 1,
    bars        : 4,
    scale  : {
        rootNote    : 'B',
        type        : Music.scales[0].type,
    },
};



const RiffSettings = memo(({ name, show }) => {

    const [currentScale, setCurrentScale] = useState(window.riffSettings.scale)

    const changeScaleRootNote = (rootNote) => {
        
        setCurrentScale({
            rootNote    : rootNote,
            type        : window.riffSettings.scale.type
        });

    }

    const changeScaleType = (scaleType) => {

        setCurrentScale({
            rootNote    : window.riffSettings.scale.rootNote,
            type        : scaleType
        });
       
    }


    useEffect(() => {

        window.riffSettings.scale = currentScale;

        EventBus.dispatch("Update RiffSettings", {
            label: "Update Scale",
            data: currentScale
        });
        

    }, [currentScale]);


    const SelectRootNote = (note) => {
        changeScaleRootNote(note);
    }




    const renderScaleNotes = (notes) => {

        return notes.map((note, key) =>
            <div key={key}>| {note} |</div>
        )
    }


    const renderScaleTypeOptions = (scales) => {

        return scales.map((scale, key) =>
            <option key={key} value={scale.type}>{scale.type}</option>
        )
    }



    const [rootOctave, setRootOctave] = useState(window.riffSettings.rootOctave);

    useEffect(() => {

        window.riffSettings.rootOctave = rootOctave;

    }, [rootOctave]);



    const updateRootOctave = (value) => {
        setRootOctave(value);
    }


/* 
    useEffect(() => {
        EventBus.on("Update System", (event) => {
          if (event.label === "Midi Initialized") {
            setRootOctave(window.riffSettings.rootOctave)
            console.log(window.riffSettings.rootOctave);
          }
        });
  
    
        return () => {
          EventBus.remove("Update System");
        };
      }, []);
 */

    return (
        show ? (
            <Container>
                <ControlBar>
                    <Control>
                        <PianoKeyboardController
                            allowInteraction={true}
                            showNoteName={false} 
                            activeNote={currentScale.rootNote} 
                            pianoHeight={'50px'} 
                            pianoWidth={'135px'} 
                            blackKeyWidth={10} 
                            onClick={SelectRootNote}
                        />
                    </Control>

                    <Control>
                        <ControlColumn>
                            <Scale>
                                <div>Scale: {currentScale.rootNote} - </div>
                                <ScaleTypeSelector
                                    onChange={(event) => changeScaleType(event.target.value)}
                                    value={currentScale.type}
                                >
                                    {renderScaleTypeOptions(Music.scales)}

                                </ScaleTypeSelector>
                            </Scale>

                            <RootOctave>
                                Root Octave: {currentScale.rootNote}
                                <Input className={clsx('rootOctave')} type="number" step="1" min="-2" max="8" value={rootOctave} onChange={(e)=>updateRootOctave(e.target.value)} />
                            </RootOctave>
                        </ControlColumn>
                    </Control>
                    <Control>       

                    </Control>
                    
                    <Control>
                        <PianoKeyboardController
                            allowInteraction={false}
                            showNoteName={false} 
                            activeNotes={Music.getscaleNotes(currentScale.rootNote, currentScale.type)} 
                            pianoHeight={'50px'} 
                            pianoWidth={'135px'} 
                            blackKeyWidth={10}
                        />
                    </Control>
                </ControlBar>
                

            </Container>
        ) : <></>
    );

});

RiffSettings.displayName = 'RiffSettings';

export default RiffSettings;
