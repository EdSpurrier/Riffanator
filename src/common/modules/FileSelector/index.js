import React, { memo, useEffect, useState } from 'react';
import SlideDrawer from '../../components/SlideDrawer';
import EventBus from '../../systems/EventBus';
import FolderSelector from '../../utils/FolderSelector';


const FileSelector = memo(() => {

    const [open, setOpen] = useState(false);

    useEffect(() => {
        EventBus.on("FileSelector", (data) => {
            console.log("FileSelector", data);
            if (data.message === 'open') {
                showFileSelector();
            } else if (data.message === 'close') {
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
            <SlideDrawer
                openState={open}
            >
                <FolderSelector />

                Hello Stuff Here
            </SlideDrawer>
        </>
    );
});

FileSelector.displayName = 'FileSelector';

export default FileSelector;
