import React, { memo } from 'react';
import { Layout } from 'antd';
const { Content } = Layout;

const VocalMachine = memo(({ name, show }) => {

    return (
        show ? (
            <Content>
                { name } : VocalMachine
            </Content>
        ) : <></>
    );
    
});

VocalMachine.displayName = 'VocalMachine';

export default VocalMachine;
