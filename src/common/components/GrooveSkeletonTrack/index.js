import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components';
import GrooveSkeletonTrackControlBar from './ControlBar';
import GrooveSkeletonTrackTrackLane from './Track';


const Container = styled.div`
    width: 100%;
`;



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