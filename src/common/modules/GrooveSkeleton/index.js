import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components';
import GrooveSkeletonTrack from '../../components/GrooveSkeletonTrack';
import clsx from 'clsx';
import { useActivePanel } from '../../../State/Interaction/ActivePanel';
import { useGenerator } from '../../../State/Generator/Generator';

const Container = styled.div`
    background: ${({ theme }) => theme.colors.grooveSkeleton.background};
    width: 100%;
    padding: ${({ theme }) => theme.sizes.grooveSkeleton.paddingVertical} 0;
    border-width: ${({ theme }) => theme.sizes.grooveSkeleton.border};
    border-style: solid;
    border-color: ${({ theme }) => theme.colors.grooveSkeleton.border};
    transition: background ${({ theme }) => theme.animation.med};

    &.hide {
        display: none;
    }

    
    &.selected {
        background: ${({ theme }) => theme.colors.machine.backgroundSelected};
    }
`


const GrooveSkeleton = memo(({ name, show }) => {

    const generator = useGenerator();


    const activePanel = useActivePanel({
        name: name,
        keyboardActions: [
            {
                key : ['Enter'],
                action: () => {
                    generator.state.actions.grooveSkeleton.noteTriggerRecord()
                }
            },
            {
                key : ['Delete'],
                action: () => {
                    generator.state.actions.grooveSkeleton.clearGrooveSkeleton()
                }
            }
        ]
    });

    return (
        <Container className={clsx(show?'active':'hide', activePanel.isSelected())} onClick={activePanel.activatePanel}>
            <GrooveSkeletonTrack />
        </Container>
    );

});

GrooveSkeleton.displayName = 'GrooveSkeleton';

export default GrooveSkeleton;
