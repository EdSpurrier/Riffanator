import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components';
import clsx from 'clsx';
import GuitarMachineTrack from '../../components/GuitarMachineTrack';
import { config } from '../../utils/config';
import { useDispatch, useSelector } from 'react-redux';
import { selectPanel } from '../../../State/Interaction/actions';
import { useActivePanel } from '../../../State/Interaction/ActivePanel';
import { useGuitarMachine } from '../../../State/GuitarMachine/Machine';

const Container = styled.div`
    background: ${({ theme }) => theme.colors.machine.background};
    width: 100%;
    padding: ${({ theme }) => theme.sizes.grooveSkeleton.paddingVertical} 0;
    border-width: ${({ theme }) => theme.sizes.grooveSkeleton.border};
    border-style: solid;
    border-color: ${({ theme }) => theme.colors.grooveSkeleton.border};
    
    &.hide {
        display: none;
    }
    
    transition: background ${({ theme }) => theme.animation.med};
    &.selected {
        background: ${({ theme }) => theme.colors.machine.backgroundSelected};
    }
`

/*
    window.guitars = [
        {
            rootOctave    : config.guitarMachine.machines[0].rootOctave,
            groove          : [],
            midi            : {
                output          : {
                    name    : config.guitarMachine.machines[0].midi.output.name,
                    id      : config.guitarMachine.machines[0].midi.output.id
                },
            },
            guitar          : null,
            tablature       : [
            
            ],
        },
        {
            rootOctave    : config.guitarMachine.machines[1].rootOctave,
            groove          : [],
            midi            : {
                output          : {
                    name    : config.guitarMachine.machines[1].midi.output.name,
                    id      : config.guitarMachine.machines[1].midi.output.id
                },
            },
            guitar          : null,
            tablature       : [
            
            ],
        }
    ]
*/


const GuitarMachine = memo(({ name, show, machineId }) => {

    

    const guitarMachine = useGuitarMachine(
        machineId, {
            name : name,
        }
    );


    const activePanel = useActivePanel({
        name: name,
        keyboardActions: [
            {
                key : ['Comma'],
                action: () => {
                    guitarMachine.machine.tablatureTrack.previousNote();
                }
            },
            {
                key : ['Period'],
                action: () => {
                    guitarMachine.machine.tablatureTrack.nextNote();
                }
            },
            {
                key : ['ArrowUp'],
                action: () => {console.log('Move Up!')}
            },
            {
                key : ['ArrowDown'],
                action: () => {console.log('Move Down!')}
            },
            {
                key : ['ArrowLeft'],
                action: () => {console.log('Move Left!')}
            },
            {
                key : ['ArrowRight'],
                action: () => {
                    console.log('Move Right!')
                    guitarMachine.machine.fretboard.updateFretboard();
                }
            }
        ]
    });

    return (
        <Container className={clsx(show?'active':'hide', activePanel.isSelected())} onClick={activePanel.activatePanel}>
            <GuitarMachineTrack 
                machineId={machineId}
            />
        </Container>
    );
    
});

GuitarMachine.displayName = 'GuitarMachine';

export default GuitarMachine;
