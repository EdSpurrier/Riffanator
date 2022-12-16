import React, { memo, useEffect, useState } from 'react';
import { Drawer } from 'antd';
import EventBus from '../../systems/EventBus';
import styled from 'styled-components';

const FileSelectorDrawer = styled(Drawer)`

        background: red !important;

`;


const FileSelector = memo((props) => {

    const [open, setOpen] = useState(false);

    useEffect(() => {
        EventBus.on("FileSelector", (data) => {
            console.log("FileSelector", data);
            if(data.message === 'open') {
                showFileSelector();
            } else if(data.message === 'close') {
                hideFileSelector();
            }
        });

        // componentWillUnmount
        return () => {
            EventBus.remove("FileSelector");
        }
    }, []);

    const showFileSelector = () => {
        setOpen(true);
    };

    const hideFileSelector = () => {
        setOpen(false);
    };


    return (
        <>
            <FileSelectorDrawer
                title="File Selector"
                placement={"right"}
                closable={true}
                onClose={hideFileSelector}
                open={open}
                size={'large'}
                key={"right"}
                zIndex={1}
                className={'my-drawer'}
/*                 style={{ background: 'red'}} */
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </FileSelectorDrawer>
        </>
    );
});

FileSelector.displayName = 'FileSelector';

export default FileSelector;
