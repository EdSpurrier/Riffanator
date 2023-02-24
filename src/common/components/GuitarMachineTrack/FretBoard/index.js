import clsx from 'clsx';
import React, { memo, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useGuitarMachine } from '../../../../State/GuitarMachine/Machine';
import EventBus from '../../../systems/EventBus';
import { config } from '../../../utils/config';
import Music from '../../../utils/Music';
import FretBoardControlBar from './FretBoardControlBar';

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const FretBoardContainer = styled.div`
    background: ${({ theme }) => theme.colors.machine.fretboard.background};
    color: ${({ theme }) => theme.colors.machine.fretboard.text}; 
    width: 100%;
    display: flex;
    flex-direction: column-reverse;

    &.hide {
        display: none;
    }
`;

const String = styled.div`
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

const Fret = styled.div`
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

    &:hover .fretNote {
        opacity: 0.4;
    }

    &.active .fretNote {
        opacity: 1;
    }


`;

const FretInScale = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;

    background: ${({ theme }) => theme.colors.machine.fretboard.fretNoteInScale.background};
    color: ${({ theme }) => theme.colors.machine.fretboard.fretNoteInScale.text};
    text-align: center;
    font-weight: 700;
    z-index: 10;
    opacity: 0.25;

    &.notInScale {
        background: ${({ theme }) => theme.colors.machine.fretboard.fretNoteNotInScale.background};
        color: ${({ theme }) => theme.colors.machine.fretboard.fretNoteNotInScale.text};
    }
`;


const FretNote = styled.div`
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
    z-index: 20;
`;


const FretBoard = memo(({ children, guitar, machineId, showFretBoard, updateControl=null }) => {

    
    const [scaleNotes, setScaleNotes] = useState([]);
    
    useEffect(() => {

        EventBus.on("Update RiffSettings", (event) => {
            if(event.label === 'Update Scale') {
                let {rootNote, scaleType} = Music.getCurrentScale();
                let scaleNotes = Music.getAllScaleNotes(rootNote, scaleType);

                setScaleNotes(scaleNotes);
            }
        });



        return () => {
            EventBus.remove("Update RiffSettings");
        };
    }, []);



    const guitarMachine = useGuitarMachine(machineId, {
        fretboard: {
            updateFretboard: () => {updateFretBoard()}
        }
    });

    const [selectedNote, setSelectedNote] = useState(-1);

    const singleDotFrets = [
        3, 5, 7, 9,
        15, 17, 19, 21
    ];

    const doubleDotFrets = [
        12
    ];

    const stringElements = useRef(new Array())



    const selectFret = (event, fret) => {

/*         let fretElement = event.target;
        if () {

        } */
        if (guitarMachine.machine.selectedNote === -1) return;

        let stringElement = event.target.parentElement;

        if(!stringElement.className.includes('fret-string')) {
            stringElement = stringElement.parentElement;
        };

        const string = stringElement.getAttribute("data");

        //console.log('String Id:', string, 'Fret:', fret);
        
        if (guitarMachine.machine.selectedNote !== -1) {
            if (window.guitars[machineId].tablature[guitarMachine.machine.selectedNote].strings[string].fret !== fret) {
                window.guitars[machineId].tablature[guitarMachine.machine.selectedNote].strings[string].fret = fret;
                window.guitars[machineId].tablature[guitarMachine.machine.selectedNote].strings[string].state = true;
            } else {
                window.guitars[machineId].tablature[guitarMachine.machine.selectedNote].strings[string].state = !window.guitars[machineId].tablature[guitarMachine.machine.selectedNote].strings[string].state;
            }

            if(window.guitars[machineId].tablature[guitarMachine.machine.selectedNote].strings[string].state) {
                stringElement.classList.add('active');
            } else {
                stringElement.classList.remove('active');
            }

            updateFretBoard();
        }
    }


    const updateFretBoard = () => {

        console.log('updateFretBoard()');

        setSelectedNote(guitarMachine.machine.selectedNote);

        stringElements.current.forEach(stringElement => {
            const frets = stringElement.querySelectorAll('.fret');
            frets.forEach(fret => {
                fret.classList.remove('active');
            });
        });

        if (guitarMachine.machine.selectedNote === -1) return;
            
        let stringId = 0;
        window.guitars[machineId].tablature[guitarMachine.machine.selectedNote].strings.forEach(string => {
            
            if(string.state) {
                let fret = stringElements.current[stringId].querySelector(`.fretboard-location-${stringId}-${string.fret}`);
                fret.classList.add('active');
            }
            stringId++;
        });
        /* stringElement.querySelector('.fretboard-location-') */

        //console.log(window.guitars[machineId].tablature[guitarMachine.machine.selectedNote]);
    }


    const renderFrets = (stringId) => {
        let frets = [];
        let fretWidth = (150 / config.guitarMachine.machines[machineId].fretCount + 1);
        let openFret = (50 / config.guitarMachine.machines[machineId].fretCount + 1);


        for (let i = 0; i < config.guitarMachine.machines[machineId].fretCount + 1; i++) {
            //console.log((singleDotFrets.includes(i)?'single':doubleDotFrets.includes(i)?'double':''));

            let inScale = scaleNotes.filter((note)=> note.name === guitar.GetStrings()[stringId].frets[i]).length > 0;

            frets.push(
                <Fret
                    className={clsx('fret', `fretboard-location-${stringId}-${i}`, (singleDotFrets.includes(i) ? 'single' : doubleDotFrets.includes(i) ? 'double' : ''))}
                    key={i}
                    data={i}
                    style={{ width: ((i === 0) ? openFret : fretWidth) + '%' }}
                    onClick={(event)=>{selectFret(event, i)}}
                >
                    <FretNote className={clsx('fretNote')}>{i}</FretNote>
                    <FretInScale  className={clsx(inScale?'':'notInScale')}/>
                </Fret>
            );
            fretWidth -= (config.guitarMachine.machines[machineId].fretCount / 150);
        };
        return frets;
    }

    const renderStrings = (guitarInstrument) => {

        //console.log(guitarInstrument.GetStrings());

        /*         guitarInstrument.GetStrings().map((guitarString, key) => {
                    console.log(guitarString);
                }); */

/*         if (guitarMachine.machine.selectedNote !== -1) {
            console.log(window.guitars[machineId].tablature[guitarMachine.machine.selectedNote]);
        } */


/*         let frets = [];
        let fretWidth = (150 / config.guitarMachine.machines[machineId].fretCount + 1);
        let openFret = (50 / config.guitarMachine.machines[machineId].fretCount + 1);
        for (let i = 0; i < config.guitarMachine.machines[machineId].fretCount + 1; i++) {
            //console.log((singleDotFrets.includes(i)?'single':doubleDotFrets.includes(i)?'double':''));
            frets.push(
                <Fret
                    className={clsx('fret', (singleDotFrets.includes(i) ? 'single' : doubleDotFrets.includes(i) ? 'double' : ''))}
                    key={i}
                    data={i}
                    style={{ width: ((i === 0) ? openFret : fretWidth) + '%' }}
                    onClick={(event)=>{selectFret(event, i)}}
                >
                    <FretNote className={'fretNote'}>{i}</FretNote>
                </Fret>
            );
            fretWidth -= (config.guitarMachine.machines[machineId].fretCount / 150);
        }; */



        return guitarInstrument.GetStrings().map((guitarString, key) =>
            <String
                key={key}
                data={key}
                style={{}}
                className={clsx('fret-string')}
                ref={(element) => stringElements.current[key] = element}
            >
                <StringTuning>
                    {guitarString.note}
                </StringTuning>
                {renderFrets(key)}
            </String>
        )
    }

    return (

        <Container>
            <FretBoardContainer className={clsx(showFretBoard ? 'show' : 'hide', 'fretboard')}>
                {renderStrings(guitar, scaleNotes)}
            </FretBoardContainer>
            <FretBoardControlBar 
                machineId={machineId}
                updateControl={updateControl}
                selectedNote={selectedNote}
                updateFretBoard={updateFretBoard}
            />
        </Container>
    );

});

FretBoard.displayName = 'FretBoard';

export default FretBoard;