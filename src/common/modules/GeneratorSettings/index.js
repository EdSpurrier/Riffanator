import React, { memo } from "react";
import styled from 'styled-components'
import SlidePanel from "../../components/SlidePanel";
import FileLoader from "../../utils/FileLoader";
import { useGenerator } from "../../../State/Generator/Generator";

const Container = styled.div`

`

const GeneratorSettings = memo(({props}) => {

  const generator = useGenerator();

  const selectFiles = (e) => {

    let newFiles = [];
    
    for(let i = 0; i < e.target.files.length; i++) {
      console.log(e.target.files.item(i));
        newFiles.push(e.target.files.item(i));
    }
    
    generator.addFilesToGenerator(newFiles);

}





  return (
    <SlidePanel sidePanelId={'Generator Settings'}>
        <Container>
            Generator Settings!!
            Upload Files:<input type="file" name="avatar" id="id_avatar" multiple onChange={selectFiles}/><br />
          <FileLoader />
      
        </Container>
    </SlidePanel>
  );
});

GeneratorSettings.displayName = 'GeneratorSettings';

export default GeneratorSettings;

