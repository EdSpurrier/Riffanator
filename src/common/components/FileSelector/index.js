import React, { memo, useEffect, useState } from 'react';
import EventBus from '../../systems/EventBus';
import SlideDrawer from '../SlideDrawer';

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
                Hello Stuff Here
            </SlideDrawer>
        </>
    );
});

FileSelector.displayName = 'FileSelector';

export default FileSelector;
