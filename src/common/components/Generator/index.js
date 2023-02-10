import React, { memo, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { generator_UpdateActions } from '../../../State/Generator/actions';
import { useGenerator } from '../../../State/Generator/Generator';
import { config } from '../../utils/config';
import RiffGenerator from '../../utils/RiffGenerator';
import ValueSlider from '../Forms/ValueSlider';
import GeneratorControlBar from './ControlBar';

const Container = styled.div`
    padding: 0 ${({ theme }) => theme.sizes.grooveSkeleton.paddingHorizontal};
`;

const GrooveSkeleton = styled.div`

`;
const GrooveNoteSlider = styled.div`
    display: flex;

`;




const Generator = memo(({ children }) => {

    const generator = useGenerator();



    const dispatch = useDispatch();
    useEffect(() => {
        generator.updateGeneratorActions({
            grooveSkeleton: {
                generate: () => {generateGrooveSkeleton()},
            }
        })
    }, [dispatch])

    const generateGrooveSkeleton = () => {
        console.log('generating Groove Skeleton');

        RiffGenerator.generateGooveSkeleton(generator);

        RiffGenerator.generateGuitarMachineTab();
    }


    const render_grooveSkeleton_NoteChance = () => {
        const noteChanceSliders = [];

        for (let key in generator.state.settings.grooveSkeleton.note_chance) {
            
            noteChanceSliders.push(
                <GrooveNoteSlider key={key}>
                    {key}: 
                    <ValueSlider 
                        min={0}
                        max={100}
                        onChange={(sliderData) => generator.updateGrooveSkeletonSettings({
                            note_chance: {
                                [key] : sliderData.value
                            }
                        })}
                        presetValue={generator.state.settings.grooveSkeleton.note_chance[key]}
                        valueSide={'right'}
                    />
                </GrooveNoteSlider>
            );

            
        }

        return noteChanceSliders;
    }

    

    return (
        <Container>
            <GeneratorControlBar />
            <GrooveSkeleton>
                Note Length Chance:
                {render_grooveSkeleton_NoteChance()}
            </GrooveSkeleton>
        </Container>
    );


});

Generator.displayName = 'Generator';

export default Generator;