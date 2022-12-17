import React, { memo } from 'react';
import { Layout } from 'antd';
const { Content } = Layout;

const GuitarMachine = memo(({ name, show }) => {

    return (
        show ? (
            <Content>
                { name } : GuitarMachine
            </Content>
        ) : <></>
    );
    
});

GuitarMachine.displayName = 'GuitarMachine';

export default GuitarMachine;
