import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components';
import { config } from '../../utils/config';
import GrooveSkeletonTrackControlBar from './ControlBar';
import GrooveSkeletonTrackTrackLane from './Track';


const Container = styled.div`
    background: ${({ theme }) => theme.colors.grooveSkeleton.background};

    padding: 0 ${({ theme }) => theme.sizes.grooveSkeleton.paddingHorizontal};
`;



window.grooveSkeleton = {
    resolution      : config.grooveSkeleton.resolution,
    outputOctave    : config.grooveSkeleton.outputOctave,
    playStyle       : config.grooveSkeleton.playStyle,
    groove          : [],
    midi            : {
        output          : {
            name    : config.grooveSkeleton.midi.output.name,
            id      : config.grooveSkeleton.midi.output.id
        },
    }
};





const GrooveSkeletonTrack = memo(({ children }) => {

    return (
        <Container>
            <GrooveSkeletonTrackControlBar />
            <GrooveSkeletonTrackTrackLane />
        </Container>
    );

});

GrooveSkeletonTrack.displayName = 'GrooveSkeletonTrack';

export default GrooveSkeletonTrack;