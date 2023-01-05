import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components';
import GrooveSkeletonTrackControlBar from './ControlBar';
import GrooveSkeletonTrackTrackLane from './Track';


const Container = styled.div`
    background: ${({ theme }) => theme.colors.grooveSkeleton.background};

    padding: 0 ${({ theme }) => theme.sizes.grooveSkeleton.paddingHorizontal};
`;



window.grooveSkeleton = {
    resolution      : 32,
    outputOctave    : 1,
    groove          : [
        
    ],
    midi            : {
        output          : {
            name    : 'Riff Generator',
            id      : 0
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