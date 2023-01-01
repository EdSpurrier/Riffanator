import React, { memo } from 'react';
import styled from 'styled-components';
import GuitarScore from './GuitarScore';


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



const GuitarInstrumentTrack = memo(({ children, slices }) => {


  return (
    <Container>
        <ControlBar>
          { children }
        </ControlBar>
        <GuitarScore slices={slices} />
    </Container>
  );
});

GuitarInstrumentTrack.displayName = 'GuitarInstrumentTrack';

export default GuitarInstrumentTrack;