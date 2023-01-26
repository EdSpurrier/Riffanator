import clsx from 'clsx';
import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components';
import { config } from '../../../utils/config';



const Container = styled.div`
    background: ${({ theme }) => theme.colors.machine.fretboard.background};
    color: ${({ theme }) => theme.colors.machine.fretboard.text}; 
    width: 100%;
    display: flex;
    flex-direction: column-reverse;
`;

const String =  styled.div`
    height: 24px;
    width: 100%;
    position: relative;
    border-top: 1px solid ${({ theme }) => theme.colors.machine.fretboard.horizontalBorder};
    border-bottom: 1px solid ${({ theme }) => theme.colors.machine.fretboard.horizontalBorder};
    box-sizing: border-box;
    display: flex;
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
    color: ${({ theme }) => theme.colors.machine.fretboard.tuningText}; 
`;

const Fret =  styled.div`
    border-left: 1px solid ${({ theme }) => theme.colors.machine.fretboard.verticalBorder};
    border-right: 1px solid ${({ theme }) => theme.colors.machine.fretboard.verticalBorder};
    cursor: pointer;
    position: relative;

    transition: background ${({ theme }) => theme.animation.med};

    &.single {
        background: ${({ theme }) => theme.colors.machine.fretboard.singleDotFret};
    }
    &.double {
        background: ${({ theme }) => theme.colors.machine.fretboard.doubleDotFret};
    }

    &:hover {
        background: ${({ theme }) => theme.colors.machine.fretboard.fretHover};

    }



    .fretNote {

        opacity: 0;
    }

    &:hover .fretNote, &.active .fretNote {
        opacity: 1;
    }
`;


const FretNote =  styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    height: 18px;
    width: 18px;
    margin-top: -9px;
    margin-left: -9px;
    font-size: 11px;
    line-height: 18px;
    background: ${({ theme }) => theme.colors.machine.fretboard.fretNote.background};
    color: ${({ theme }) => theme.colors.machine.fretboard.fretNote.text};
    border-radius: 18px;
    text-align: center;
    font-weight: 700;
    transition: ${({ theme }) => theme.animation.med};
`;


const FretBoard = memo(({ children, guitar, machineId }) => {

    const singleDotFrets = [
        3,5,7,9,
        15,17,19,21
    ];

    const doubleDotFrets = [
        12
    ];

    const renderStrings = (guitarInstrument) => {
        
        console.log(guitarInstrument.GetStrings());

        guitarInstrument.GetStrings().map((guitarString, key) => {
            console.log(guitarString);
        });


        let frets = [];
        let fretWidth = (150/config.guitarMachine.machines[machineId].fretCount + 1);
        let openFret = (50/config.guitarMachine.machines[machineId].fretCount + 1);
        for (let i = 0; i < config.guitarMachine.machines[machineId].fretCount + 1; i++) {
            //console.log((singleDotFrets.includes(i)?'single':doubleDotFrets.includes(i)?'double':''));
            frets.push(
                <Fret
                    className={clsx((singleDotFrets.includes(i)?'single':doubleDotFrets.includes(i)?'double':''))}
                    key={i} 
                    data={i} 
                    style={{width:((i===0)?openFret:fretWidth)+'%'}}
                >
                    <FretNote className={'fretNote'}>{i}</FretNote>
                </Fret>
            );
            fretWidth -= (config.guitarMachine.machines[machineId].fretCount/150);
        };



        return guitarInstrument.GetStrings().map((guitarString, key) => 
            <String
                key={key}
                style={{}}
                className={'fret-string'}
            >
                <StringTuning>
                    {guitarString.note}
                </StringTuning>
                {frets}
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