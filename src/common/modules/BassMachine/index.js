import React, { memo } from 'react';
import { Layout } from 'antd';
const { Content } = Layout;

const BassMachine = memo(({ name, show }) => {

    return (
        show ? (
            <Content>
                { name } : BassMachine
            </Content>
        ) : <></>
    );
    
});

BassMachine.displayName = 'BassMachine';

export default BassMachine;
