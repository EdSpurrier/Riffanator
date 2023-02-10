import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components';


const Container = styled.div`

`

const UploadFile = styled.div`

`

const FolderSelector = memo(({}) => {

    const [files, setFiles] = useState([]);


    useEffect(() => {
        if(!files) return
        console.log(files);

        
    }, [files]);


    const selectFiles = (e) => {

        let newFiles = files;
        for(let i = 0; i < e.target.files.length; i++) {
            newFiles.push(e.target.files.item(i));
        }
        
        console.log(newFiles);
        setFiles(newFiles);

        console.log(e);
    }



    return (
        <Container>
            Upload File:<input type="file" name="avatar" id="id_avatar" multiple onChange={selectFiles}/><br />
            <ul id="listing">
                {files.map( (file, index)=> 
                    <li key={index}>{ file.name }</li>
                )}
            </ul>
        </Container>
    );
});

FolderSelector.displayName = 'FolderSelector';

export default FolderSelector;
