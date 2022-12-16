import React, { memo } from 'react';
import { Layout } from 'antd';
const { Content } = Layout;

const DrumMachine = memo(({ name, show }) => {

    return (
        show ? (
            <Content>
                { name } : DrumMachine
            </Content>
        ) : <></>
    );
    
});

DrumMachine.displayName = 'DrumMachine';

export default DrumMachine;
