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

    const midiResolution = 64;

    const [playBarClick, { stop: stopBarClick }] = useSound(barClick);
    const [playBeatClick, { stop: stopBeatClick }] = useSound(beatClick);

    const { pause, reset, running, timerTick, start, stop, setInterval } = useTimer();

    const [midiClock, setMidiClock] = useState({
        isPlaying: false,
        count: 0,
        tempo: 100,
        beatsPerMeasure: 4,
        midiResolution: midiResolution,
        metronome: false
    })


    const initialize = () => {
        window.midi.midiCore.midiClock = {
            ...midiClock,
            tick : timerTick,
            clockTick : timerTick * (1/midiResolution),
        };
        window.midi.midiCore.initialized = true;
    }


    const startMidiPlay = () => {
        if(!window.midi.midiCore.midiClock) return;


        //  Perform Midi Actions First
        if(window.midi.grooveSkeleton.initialized) {
            window.midi.grooveSkeleton.startMidiPlay();
        };

        //  Update GUI Last (Midi Actions Takes Precendence)
        if(window.midi.grooveSkeleton.initialized) {
            // window.midi.grooveSkeleton.updateMidiFrame();
        };
    }


    const stopMidiPlay = () => {
        if(!window.midi.midiCore.midiClock) return;


        //  Perform Midi Actions First
        if(window.midi.grooveSkeleton.initialized) {
            window.midi.grooveSkeleton.stopMidiPlay();
        };

        //  Update GUI Last (Midi Actions Takes Precendence)
        if(window.midi.grooveSkeleton.initialized) {
            // window.midi.grooveSkeleton.updateMidiFrame();
        };
    }


    

    const updateMidiFrame = () => {
        if(!window.midi.midiCore.midiClock) return;
        
        window.midi.midiCore.midiClock.tick = timerTick;
        window.midi.midiCore.midiClock.clockTick = timerTick * (1/midiResolution);

        //  Perform Midi Actions First
        if(window.midi.grooveSkeleton.initialized) {
            window.midi.grooveSkeleton.updateMidiFrameAction();
        };

        //  Update GUI Last (Midi Actions Takes Precendence)
        if(window.midi.grooveSkeleton.initialized) {
            window.midi.grooveSkeleton.updateMidiFrameGUI();
        };
    }


    useEffect(() => {

        updateCount();
    
        updateMidiFrame();

    }, [timerTick]);


    const updateCount = () => {

        let newCount = Math.floor((timerTick/(midiResolution/midiClock.beatsPerMeasure)) % midiClock.beatsPerMeasure);

        if (midiClock.isPlaying && newCount !== midiClock.count) {
            if (newCount === 0) {
                if(midiClock.metronome) {
                    playBarClick();
                }

                reset();
            } else {
                if(midiClock.metronome) {
                    playBeatClick();
                }
            }
        }


        setMidiClock(prevState => ({...prevState,  
            count: newCount,
        }))

    }
    
    useEffect(() => {
        
        initialize();


        EventBus.on("Update Transport", (event) => {


            if (event.label === "Stop") {
                stopMidiClock();
            } else if (event.label === "Play") {
                playMidiClock();
            } else if (event.label === "Metronome On") {
                setMidiClock(prevState => ({...prevState,  
                    metronome: true,
                }))
            } else if (event.label === "Metronome Off") {
                setMidiClock(prevState => ({...prevState,  
                    metronome: false,
                }))
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

        window.midi.midiCore.midiClock = midiClock;

        if (midiClock.isPlaying && midiClock.count === -1) {
            startMidiPlay();
        } else if (!midiClock.isPlaying && midiClock.count === -1) {
            stopMidiPlay();
        }

        setInterval( ((60 / midiClock.tempo) * 1000)/(midiResolution/midiClock.beatsPerMeasure));

        //console.log('midiClock Updated:', midiClock.count, timerTick);

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

        setMidiClock(prevState => ({...prevState,  
            isPlaying: false,
            count: -1,
        }))

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
