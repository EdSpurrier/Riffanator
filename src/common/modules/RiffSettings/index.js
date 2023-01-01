import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components';
import PianoKeyboardController from '../../components/PianoKeyboardController';
import EventBus from '../../systems/EventBus';
import Music from '../../utils/Music';


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


window.riffSettings = {
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
                        
                        <Scale>
                            <div>Scale: {currentScale.rootNote} - </div>
                            <ScaleTypeSelector
                                onChange={(event) => changeScaleType(event.target.value)}
                                value={currentScale.type}
                            >
                                {renderScaleTypeOptions(Music.scales)}

                            </ScaleTypeSelector>
                        </Scale>
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
