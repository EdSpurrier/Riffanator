import React, { memo } from "react";
import styled from 'styled-components'
import SlidePanel from "../../components/SlidePanel";
import SingleButton from "../../components/Buttons/SingleButton";
import SidePanelHeader from "../../components/SlidePanel/SidePanelHeader";
import SlidePanelLine from "../../components/SlidePanel/SidePanelLine";
import SidePanelControlBar from "../../components/SlidePanel/SidePanelControlBar";
import TextInput from "../../components/Forms/Input";
import FileManagement from "../../utils/FileManagement";
import { config } from "../../utils/config";
import { useFilePicker } from 'use-file-picker';
import Files from 'react-files'

const Container = styled.div`

  .space-left {
    margin-left: 5px;
  }

`

window.fileManager = {
  fileName: ''
}


const FileManager = memo(({ props }) => {

  const [openFileSelector, { filesContent, loading }] = useFilePicker({
    accept: '.*',
  });


  const updateFileName = (value) => {
    window.fileManager.fileName = value;
  }

  const handleChange = (files) => {
    console.log(files, filesContent);
    FileManagement.loadRiffFile(files);
  }

  const handleError = (error, file) => {
    console.log('error code ' + error.code + ': ' + error.message)
  }

  const saveRiff = () => {
    console.log('saveRiff');
    FileManagement.saveRiffToJSON(window.fileManager.fileName + '.json', [{ jsonData: 'hi' }]);
  }



  return (
    <SlidePanel sidePanelId={'File Manager'}>
      <Container>
        <SidePanelHeader>File Manager</SidePanelHeader>
        <SidePanelControlBar>
{/*           <SingleButton
            buttonStyle={'standard'}
            text={'LOAD'}
            onClickAction={loadFile}
          /> */}
          <SingleButton
            classNames={'space-left'}
            buttonStyle={'standard'}
            text={'DOWNLOAD'}
            onClickAction={saveRiff}
          />
        </SidePanelControlBar>
        <SlidePanelLine>
          <Files
            className='files-dropzone'
            onChange={handleChange}
            onError={handleError}
            accepts={['.json']}
            /* multiple */
            maxFileSize={10000000}
            minFileSize={0}
            clickable>
            Drop files here or click to upload
          </Files>
        </SlidePanelLine>
        <SlidePanelLine>
          <TextInput
            name={'saveFileName'}
            inputValue={config.fileManager.fileName}
            onChangeAction={updateFileName}
          />
          <SingleButton
            classNames={'space-left'}
            buttonStyle={'standard'}
            text={'SAVE'}
            onClickAction={saveRiff}
          />
        </SlidePanelLine>

      </Container>
    </SlidePanel>
  );
});

FileManager.displayName = 'FileManager';

export default FileManager;