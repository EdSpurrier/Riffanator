import React, { memo } from "react";
import styled from 'styled-components'
import SlidePanel from "../../components/SlidePanel";


const Container = styled.div`

`

const GeneratorSettings = memo(({props}) => {

  return (
    <SlidePanel sidePanelId={'Generator Settings'}>
        <Container>
            Generator Settings!!
        </Container>
    </SlidePanel>
  );
});

GeneratorSettings.displayName = 'GeneratorSettings';

export default GeneratorSettings;