import React, { memo } from 'react';
import styled from 'styled-components';
import { config } from '../../utils/config';
import PlayControls from './PlayControls';
import TransportSettings from './TransportSettings';



const Container = styled.div`
  background    : ${({ theme }) => theme.colors.transport.background};
  height        : ${({ theme }) => theme.sizes.transport.height};
  width         : 100%;
  display       : flex;
  align-items   : center;
  justify-content: center;
  z-index         : ${({ theme }) => theme.heirarchy.transport};
`

/* window.transport = {
  tempo : 120,
  loop  : {
    from    : 1,
    to      : 2,
  }
} */

window.transport = {
  tempo : config.tempo,
  loop  : config.loop
}

const Transport = memo((props) => {

  return (
    <Container>
      <PlayControls />
      <TransportSettings />
    </Container>
  );

});

Transport.displayName = 'Transport';

export default Transport;