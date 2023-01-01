import clsx from 'clsx';
import React, { memo, useState, useEffect } from 'react';
import styled from 'styled-components';
import Music from '../../utils/Music';



const Container = styled.div`
    display: flex;
    font-size: ${({ theme }) => theme.fontSizes.standard.small};
`;

const WhiteKey = styled.div`
    flex-grow: 10;
    background: ${({ theme }) => theme.colors.pianoKeyboard.whiteKey.background};
    color: black;
    height: calc(100% - 10px); 
    

    border-width: ${({ theme }) => theme.sizes.pianoKeyboard.whiteKey.border};
    border-color: ${({ theme }) => theme.colors.pianoKeyboard.key.border};
    border-style: solid;

    &.interactionOn {
        cursor: pointer;
    }
    
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding-bottom: 10px;

    transition: background ${({ theme }) => theme.animation.med};

    &.interactionOn:hover {
        background: ${({ theme }) => theme.colors.pianoKeyboard.key.onHoverBackground};
    }

    &.active, &.active:hover {
        background: ${({ theme }) => theme.colors.pianoKeyboard.key.activeBackground};
    }
`;

const BlackKey = styled.div`
    position: relative;
    &.interactionOn {
        cursor: pointer;
    }
`;

const BlackKeyButton = styled.div`
    position: absolute;
    top: 0;
    height: calc(60% - 10px); 
    background: ${({ theme }) => theme.colors.pianoKeyboard.blackKey.background};
    color: white;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding-bottom: 10px;


    border-width: 0 1px 1px 1px;
    border-color: ${({ theme }) => theme.colors.pianoKeyboard.key.border};
    border-style: solid;

    transition: ${({ theme }) => theme.animation.med};

    &.interactionOn:hover {
        background: ${({ theme }) => theme.colors.pianoKeyboard.key.onHoverBackground};
        color: black;
    }

    &.active, &.active:hover {
        color: black;
        background: ${({ theme }) => theme.colors.pianoKeyboard.key.activeBackground};
    }

`;

const PianoKeyboardController = memo(({ children, allowInteraction = true, onClick, activeNote = '', activeNotes = [], pianoHeight = '100px', pianoWidth = '100%', blackKeyWidth= 100, showNoteName = true }) => {
    


    const keyClick = (event, note) => {
        if(!allowInteraction) {
            return;
        };


        if (!onClick) {
            alert('not connected!');
            return;
        };


        onClick(
            note
        );

    }


    const renderPianoKeys = (notes) => {

        return notes.map((note, key) =>
            !note.includes('#') ?

                <WhiteKey 
                    key={key} 
                    onClick={(event)=>{
                        keyClick(event, note)
                    }} 
                    className={ clsx( activeNotes.includes(note) || activeNote === note ?'active':'', allowInteraction ?'interactionOn':'') }
                >

                    {showNoteName ? note : ''}

                </WhiteKey>
            :   
                <BlackKey key={key}>
                    <BlackKeyButton 
                        key={key} 
                        onClick={(event)=>{
                            keyClick(event, note)
                        }} 
                        className={ clsx( activeNotes.includes(note) || activeNote === note ?'active':'', allowInteraction ?'interactionOn':'') }
                        style={{
                            width: blackKeyWidth + 'px',
                            marginLeft: -(blackKeyWidth/2) + 'px'
                        }}
                    >
                        {showNoteName ? note : ''}
                        <br />
                        {showNoteName ? notes[key+1] ? notes[key+1] + "b" : '' : ''}
                    </BlackKeyButton>
                </BlackKey>
        )
    }


    return (
        <Container
            style={{
                height: pianoHeight,
                width: pianoWidth
            }}
            >
                {renderPianoKeys(Music.notes)}
        </Container>
    );
});

PianoKeyboardController.displayName = 'PianoKeyboardController';

export default PianoKeyboardController;


