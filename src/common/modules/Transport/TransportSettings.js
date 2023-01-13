import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components';
import EventBus from '../../systems/EventBus';
import MultiRangeSlider from "../../components/Forms/MultiRangeSlider";
import { config } from '../../utils/config';

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

    const [tempo, setTempo] = useState(window.transport.tempo);



    useEffect(() => {

        EventBus.dispatch("Update System", {
            label: "Update Tempo",
            data: tempo
        });

        window.transport.tempo = tempo;

    }, [tempo]);



    useEffect(() => {

        EventBus.on("External Update Tempo", (newTempo) => {
            updateTempo(newTempo);
        });

        EventBus.on("External Update Loop", (newLoop) => {
            updateLoop(newLoop);
        });

        return () => {
            EventBus.remove("External Update Tempo");
            EventBus.remove("External Update Loop");
        };
    }, []);


    const updateTempo = (value) => {
        setTempo(value);
    }


    const updateLoop = (min, max) => {

        window.transport.loop = {
            from   : min,
            to   : max,
        };
        
        EventBus.dispatch("Update System", {
            label: "Update Loop",
            data: {
                from   : min,
                to   : max,
            }
        });

        /* console.log(window.transport.loop) */
    }


    return (
        <Container>
            <Input type="number" step="0.25" min="50" max="400" value={tempo} onChange={(e) => updateTempo(e.target.value)} />
            <MultiRangeSlider
                min={1}
                max={config.number_of_bars + 1}
                onChange={({ min, max }) => updateLoop(min, max-1)  /* console.log(`min = ${min}, max = ${max}`) */ }
                minimumOne={true}
                presetValues={{
                    from    : config.loop.from,
                    to      : config.loop.to+1,
                }}
            />
        </Container>
    );

});

TransportSettings.displayName = 'TransportSettings';

export default TransportSettings;
