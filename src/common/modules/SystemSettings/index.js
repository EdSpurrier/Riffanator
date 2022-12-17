import React, { memo } from "react";
import styled from 'styled-components'
import SlidePanel from "../../components/SlidePanel";


const Container = styled.div`

`

const SystemSettings = memo(({props}) => {

  return (
    <SlidePanel sidePanelId={'System Settings'}>
        <Container>
          System Settings!!
        </Container>
    </SlidePanel>
  );
});

SystemSettings.displayName = 'SystemSettings';

export default SystemSettings;