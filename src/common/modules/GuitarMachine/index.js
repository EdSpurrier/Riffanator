import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components';
import clsx from 'clsx';
import GuitarMachineTrack from '../../components/GuitarMachineTrack';
import { config } from '../../utils/config';

const Container = styled.div`
    background: ${({ theme }) => theme.colors.grooveSkeleton.background};
    width: 100%;
    padding: ${({ theme }) => theme.sizes.grooveSkeleton.paddingVertical} 0;
    border-width: ${({ theme }) => theme.sizes.grooveSkeleton.border};
    border-style: solid;
    border-color: ${({ theme }) => theme.colors.grooveSkeleton.border};

    &.hide {
        display: none;
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

    return (
        <Container className={clsx(show?'active':'hide')}>
            <GuitarMachineTrack 
                machineId={machineId}
            />
        </Container>
    );
    
});

GuitarMachine.displayName = 'GuitarMachine';

export default GuitarMachine;
