import React, { memo } from 'react';
import styled from 'styled-components';
import TrackScore from './TrackScore';

const ControlBar = styled.div`
  height: ${({ theme }) => theme.sizes.instrumentTrack.controlBar.height};
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 ${({ theme }) => theme.sizes.instrumentTrack.controlBar.paddingHorizontal};
`


const Container = styled.div`
  background: ${({ theme }) => theme.colors.instrumentTrack.background};

  height: controlBar
  width: 100%;

  padding-bottom      : ${({ theme }) => theme.sizes.instrumentTrack.paddingVertical};
`


const InstrumentTrack = memo(({ children }) => {



  return (
    <Container>
        <ControlBar>
          { children }
        </ControlBar>
        
        <TrackScore />
    </Container>
  );
});

InstrumentTrack.displayName = 'InstrumentTrack';

export default InstrumentTrack;