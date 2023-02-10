import React, { memo } from 'react';
import styled from 'styled-components';
import clsx from 'clsx';
import { config } from '../../utils/config';
import { useActivePanel } from '../../../State/Interaction/ActivePanel';
import Generator from '../../components/Generator';
import { useGenerator } from '../../../State/Generator/Generator';

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


const GeneratorMachine = memo(({ name, show }) => {

    
    const activePanel = useActivePanel({
        name: name,
        keyboardActions: [
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
                action: () => {console.log('Move Right!')}
            }
        ]
    });

    const generator = useGenerator();



    return (
        <Container className={clsx(show?'active':'hide', activePanel.isSelected())} onClick={activePanel.activatePanel}>
            <Generator />
        </Container>
    );
    
});

GeneratorMachine.displayName = 'GeneratorMachine';

export default GeneratorMachine;
