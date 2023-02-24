import React, { memo, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import EventBus from '../../../systems/EventBus';
import PlayIcon from '../../Icons/PlayIcon';
import theme from '../../../../theme/theme';
import { WebMidi } from 'webmidi';
import SingleButton from '../../Buttons/SingleButton';
import { useGenerator } from '../../../../State/Generator/Generator';



const Container = styled.div`
    height: ${({ theme }) => theme.sizes.grooveSkeleton.controlBar.height};
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${({ theme }) => theme.sizes.grooveSkeleton.controlBar.marginBottom};

    font-size: ${({ theme }) => theme.fontSizes.grooveSkeleton.controlBar};
    color: ${({ theme }) => theme.colors.grooveSkeleton.controlBar.text};

    select {
        font-size: ${({ theme }) => theme.fontSizes.grooveSkeleton.controlBar};
        color: ${({ theme }) => theme.colors.grooveSkeleton.controlBar.text};
        text-align: center;
        -webkit-appearance: none;
        -moz-appearance: none;
        text-indent: 1px;
        text-overflow: '';
        cursor: pointer;
        outline: none;
        option {
            background: ${({ theme }) => theme.colors.machine.controlBar.background};
        }
    }

    svg g, svg {
        fill: ${({ theme }) => theme.colors.grooveSkeleton.controlBar.icon};
        margin-right: ${({ theme }) => theme.sizes.grooveSkeleton.controlBar.iconSpacingHorizontal};
    }

`;

const Control = styled.div`
    margin-right: ${({ theme }) => theme.sizes.grooveSkeleton.controlBar.controlSpacingHorizontal};
    display: flex;
    align-items: center;
`

const Label = styled.div`
    margin-left: 5px;
`


const GeneratorControlBar = memo(({ children }) => {

    const generator = useGenerator();



    return (
        <Container>

            <Control>
                
                <SingleButton 
                    icon={<PlayIcon size={theme.fontSizes.grooveSkeleton.controlBar} />}
                    onClickAction={()=> {
                        generator.state.actions.grooveSkeleton.generateSimple()
                    }}
                />
                <Label>Simple</Label>
                    
            </Control>

            <Control>
                

                <SingleButton 
                    icon={<PlayIcon size={theme.fontSizes.grooveSkeleton.controlBar} />}
                    onClickAction={()=> {
                        generator.state.actions.grooveSkeleton.generateGrooveRiff()
                    }}
                />

                <Label>Groove</Label>

            </Control>

            <Control>

            </Control>

        </Container>
    );
});

GeneratorControlBar.displayName = 'GeneratorControlBar';

export default GeneratorControlBar;