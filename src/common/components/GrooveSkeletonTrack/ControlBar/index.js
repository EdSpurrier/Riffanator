import React, { memo, useState, useEffect } from 'react';
import styled from 'styled-components';
import EventBus from '../../../systems/EventBus';
import ResolutionIcon from '../../Icons/ResolutionIcon';
import theme from '../../../../theme/theme';


const Container = styled.div`
    height: ${({ theme }) => theme.sizes.grooveSkeleton.controlBar.height};
    background: ${({ theme }) => theme.colors.grooveSkeleton.controlBar.background};
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 ${({ theme }) => theme.sizes.grooveSkeleton.controlBar.paddingHorizontal};

    font-size: ${({ theme }) => theme.fontSizes.grooveSkeleton.controlBar};
    color: ${({ theme }) => theme.colors.grooveSkeleton.controlBar.text};

    select {
        font-size: ${({ theme }) => theme.fontSizes.grooveSkeleton.controlBar};
        color: ${({ theme }) => theme.colors.grooveSkeleton.controlBar.text};
        background: ${({ theme }) => theme.colors.grooveSkeleton.controlBar.background}; 
        text-align: center;
        -webkit-appearance: none;
        -moz-appearance: none;
        text-indent: 1px;
        text-overflow: '';
        cursor: pointer;
        outline: none;
    }

    svg g, svg {
        fill: ${({ theme }) => theme.colors.grooveSkeleton.controlBar.icon};
    }

`;

const ResolutionSelector = styled.select`
    color: ${({ theme }) => theme.sizes.grooveSkeleton.controlBar.paddingHorizontal};
`;

window.grooveSkeleton = {
    resolution  : 32,
    groove      : [
        
    ]
};


const GrooveSkeletonTrackControlBar = memo(({ children }) => {
    const [currentResolution, setCurrentResolution] = useState(window.grooveSkeleton.resolution)

    const changeResolution = (newResolution) => {
        setCurrentResolution(newResolution);
        window.grooveSkeleton.resolution = newResolution;
    }

    useEffect(() => {

        EventBus.dispatch("Update GrooveSkeleton", {
            label: "Update Resolution",
            data: currentResolution
        });
        


    }, [currentResolution]);


    return (
        <Container>
            <ResolutionIcon size={theme.fontSizes.grooveSkeleton.controlBar} />
            <ResolutionSelector
                onChange={(event) => changeResolution(event.target.value)}
                value={currentResolution}
            >
                <option value="8">8</option>
                <option value="16">16</option>
                <option value="32">32</option>
                <option value="64">64</option>
            </ResolutionSelector>
        </Container>
    );
});

GrooveSkeletonTrackControlBar.displayName = 'GrooveSkeletonTrackControlBar';

export default GrooveSkeletonTrackControlBar;