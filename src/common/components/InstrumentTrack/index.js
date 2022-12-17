import React, { memo } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background: ${({ theme }) => theme.colors.dashboard.background};
  width: 100%;
`

const InstrumentTrack = memo(({ children }) => {



  return (
    <Container>
        Instrument Track: { children }
    </Container>
  );
});

InstrumentTrack.displayName = 'InstrumentTrack';

export default InstrumentTrack;