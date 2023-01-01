import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components';
import EventBus from '../../systems/EventBus';

const Container = styled.div`
    display             : flex;
    align-items         : center;
    justify-content     : center;
    flex-direction      : row;
    text-align          : center;
`
const Input = styled.input`
    padding: ${({ theme }) => theme.sizes.transport.input.padding};
    width: 50px;
    color: ${({ theme }) => theme.colors.transport.text};
    background: ${({ theme }) => theme.colors.transport.input.background};
    border: none;
    border-radius: 3px;
    text-align: center;
`

const TransportSettings = memo(({ props }) => {

    const [tempo, setTempo] = useState(120);

    useEffect(() => {

        EventBus.dispatch("Update System", {
            label: "Update Tempo",
            data: tempo
        });

        //console.log(tempo);

    }, [tempo]);

    useEffect(() => {
        EventBus.on("External Update Tempo", (newTempo) => {
            updateTempo(newTempo);
        });
    
        return () => {
          EventBus.remove("External Update Tempo");
        };
    }, []);


    const updateTempo = (value) => {
        setTempo(value);
    }


    return (
        <Container>
            <Input type="number" step="0.25" min="50" max="400" value={tempo} onChange={(e)=>updateTempo(e.target.value)} />
        </Container>
    );
    
});

TransportSettings.displayName = 'TransportSettings';

export default TransportSettings;
