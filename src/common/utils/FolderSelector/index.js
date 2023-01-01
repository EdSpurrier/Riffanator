import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components';


const Container = styled.div`

`


const FolderSelector = memo(({}) => {

    const [files, setFiles] = useState([]);


    useEffect(() => {
        //console.log(files);
    }, [files]);

    const selectFolder = (e) => {

        
        setFiles(files => [...files, e.target.files]);


    }


    return (
        <Container>
            <input directory="" webkitdirectory="" type="file" onChange={selectFolder}/>
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
