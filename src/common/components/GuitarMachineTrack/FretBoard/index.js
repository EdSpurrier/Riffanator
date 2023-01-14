import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components';




const Container = styled.div`
    background: ${({ theme }) => theme.colors.machine.fretboard.background};
    color: ${({ theme }) => theme.colors.machine.fretboard.text}; 
    width: 100%;
`;

const String =  styled.div`
    height: 20px;
    width: 100%;
    position: relative;
`;

const StringTuning = styled.div`
    position: absolute;
    top: 0;
    left: -24px;
    width: 20px;
    height: 16px;
    text-align: right;
    font-size: 10px;
    line-height: 20px;
`;


const FretBoard = memo(({ children, guitar }) => {


    const renderStrings = (guitarInstrument) => {
        
        console.log(guitarInstrument.GetStrings());

        guitarInstrument.GetStrings().map((guitarString, key) => {
            console.log(guitarString);
        });

        return guitarInstrument.GetStrings().map((guitarString, key) => 
            <String
                key={key}
                style={{}}
                className={'fret-string'}
            >
                <StringTuning>
                    {guitarString.note}
                </StringTuning>
                
            </String>
)
    }

    return (
        <Container className={'fretboard'}>
            {renderStrings(guitar)}
        </Container>
    );

});

FretBoard.displayName = 'FretBoard';

export default FretBoard;