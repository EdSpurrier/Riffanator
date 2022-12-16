import React, { memo, useEffect, useState } from 'react';
import EventBus from '../../systems/EventBus';
import styled from 'styled-components';


const Container = styled.div`
    position: fixed;
    width: 600px;
    right: -650px;
    
    background-color: ${({ theme }) => theme.colors.dark.background};
    color: ${({ theme }) => theme.colors.dark.text};

    top: 0;
    bottom: 0;
    
    border-left: 1px solid ${({ theme }) => theme.colors.dark.border};
    padding: 0 20px;
    transition: right  ${({ theme }) => theme.animation.med_slow};
    &.active {
        right: 50px;
    }
`


const FileSelector = memo(({children}) => {

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
        <Container className={open?'active':''}>
            {children}
        </Container>
    );
});

FileSelector.displayName = 'FileSelector';

export default FileSelector;
