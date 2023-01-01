import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components';
import EventBus from '../../systems/EventBus';
import Metronome from './Metronome';

import useSound from 'use-sound';


import barClick from "./sounds/click2.wav";
import beatClick from "./sounds/click1.wav";
import { useTimer } from './Timer/useTimer';


const Container = styled.div`
    background: ${({ theme }) => theme.colors.riffSettings.background};
    width: calc(100% - ${({ theme }) => theme.colors.riffSettings.border} - ${({ theme }) => theme.colors.riffSettings.border});
    padding: ${({ theme }) => theme.sizes.riffSettings.paddingVertical} ${({ theme }) => theme.sizes.riffSettings.paddingHorizontal};
`


const MidiCore = memo(({ }) => {

    const midiResolution = 32;

    const [playBarClick, { stop: stopBarClick }] = useSound(barClick);
    const [playBeatClick, { stop: stopBeatClick }] = useSound(beatClick);

    const { pause, reset, running, timerTick, start, stop, setInterval } = useTimer();

    const [midiClock, setMidiClock] = useState({
        isPlaying: false,
        count: 0,
        tempo: 100,
        beatsPerMeasure: 4,
    })



    

    useEffect(() => {

        updateCount();
    
    }, [timerTick]);


    const updateCount = () => {

        let newCount = Math.floor((timerTick/32) % midiClock.beatsPerMeasure);

        if (midiClock.isPlaying && newCount !== midiClock.count) {
            if (newCount === 0) {
                playBarClick();
                reset();
            } else {
                playBeatClick();
            }
        }


        setMidiClock(prevState => ({...prevState,  
            count: newCount,
        }))

    }
    
    useEffect(() => {
        EventBus.on("Update Transport", (event) => {
            if (event.data.action.includes('Play')) {
                playMidiClock();
            } else {
                stopMidiClock();
            }
        });


        EventBus.on("Update System", (event) => {
            if (event.label === "Update Tempo") {

                setMidiClock(prevState => ({...prevState,  
                    tempo: parseFloat(event.data),
                }));


                EventBus.dispatch("Update System", {
                    label: "Update MidiClock",
                    data: {
                        action: "Stop"
                    }
                });


            }
        });


        return () => {
            EventBus.remove("Update Transport");
            EventBus.remove("Update System");
        };
    }, []);





    useEffect(() => {

        setInterval( ((60 / midiClock.tempo) * 1000)/midiResolution);

    }, [midiClock]);




    const playMidiClock = () => {
        

        if (midiClock.isPlaying) {
            //console.log("Already Playing...");
            return;
        }


        setMidiClock(prevState => ({...prevState,  
            isPlaying: true,
            count: -1,
        }))

        start();
    }

    const stopMidiClock = () => {

        //console.log('STOP!');

        setMidiClock(prevState => ({...prevState,  isPlaying: false}))

        stop();

    }

    return (
        <Container>
            MidiCore Clock (bpm:{midiClock.tempo})(count:{midiClock.count})= {timerTick}/ {Math.floor(timerTick/midiResolution)}<br />
            <Metronome />
            
        </Container>
    );

});

MidiCore.displayName = 'MidiCore';

export default MidiCore;
