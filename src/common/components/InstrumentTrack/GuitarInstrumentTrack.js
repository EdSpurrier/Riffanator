import React, { memo } from 'react';
import styled from 'styled-components';
import Canvas from './InstrumentCanvas';
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

  width: 100%;

  padding-bottom      : ${({ theme }) => theme.sizes.guitarInstrumentTrack.paddingVertical};
`

const GuitarScore = styled.div`
  background: ${({ theme }) => theme.colors.instrumentTrack.guitar.background};
  height: 100px;
  width: 100%;
`

const GuitarCanvas = styled.canvas`
  background: ${({ theme }) => theme.colors.instrumentTrack.guitar.background};
  height: 100px;
  width: 100%;
`


const GuitarInstrumentTrack = memo(({ children, instrumentData }) => {

/*     const renderString = (tuning) => {
        return tuning.map((stringTuning, key) =>
            <div key={key}> -{key}|{stringTuning}- </div>
        )
    }
 */

  return (
    <Container>
        <ControlBar>
          { children }
        </ControlBar>
        
        <GuitarScore>
            <Canvas/>
        </GuitarScore>
    </Container>
  );
});

GuitarInstrumentTrack.displayName = 'GuitarInstrumentTrack';

export default GuitarInstrumentTrack;