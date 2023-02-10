import React, { memo, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import EventBus from '../../../systems/EventBus';
import { WebMidi } from 'webmidi';
import { config } from '../../../utils/config';
import ToggleButton from '../../Buttons/ToggleButton';
import CleanIcon from '../../Icons/CleanIcon';
import GuitarUtils from '../../../music/GuitarUtils';




const Container = styled.div`
    height: ${({ theme }) => theme.sizes.machine.controlBar.height};
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: ${({ theme }) => theme.sizes.machine.controlBar.marginBottom};
    font-size: ${({ theme }) => theme.fontSizes.machine.controlBar};
    color: ${({ theme }) => theme.colors.machine.controlBar.text};

    select {
        font-size: ${({ theme }) => theme.fontSizes.machine.controlBar};
        color: ${({ theme }) => theme.colors.machine.controlBar.text};
        text-align: left;
        -webkit-appearance: none;
        -moz-appearance: none;
        text-overflow: '';
        cursor: pointer;
        outline: none;
        option {
            background: ${({ theme }) => theme.colors.machine.controlBar.background};
        }
    }

    svg g, svg {
        fill: ${({ theme }) => theme.colors.machine.controlBar.icon};
        margin-right: ${({ theme }) => theme.sizes.machine.controlBar.iconSpacingHorizontal};
    }

`;

const Control = styled.div`
    display: flex;
    align-items: center;
`




const PlayStyleSelector = styled.select`
    text-align: left;

`;




const FretBoardControlBar = memo(({ children, machineId, selectedNote, updateFretBoard, updateControl = null }) => {

    const [playStyle, setPlayStyle] = useState('NONE');
    const playStyleRef = useRef(null);


    useEffect(() => {

        if (selectedNote === -1) {
            setPlayStyle('NONE');
            return;
        };

        setPlayStyle(window.guitars[machineId].tablature[selectedNote].playStyle);


    }, [selectedNote]);


    useEffect(() => {

        if (selectedNote === -1) return;

        window.guitars[machineId].tablature[selectedNote].playStyle = playStyle;

        updateFretBoard();

    }, [playStyle]);



    const changePlayStyle = (newPlayStyle) => {

        setPlayStyle(newPlayStyle);

    }






    const clearTablatureNote = () => {

        window.guitars[machineId].tablature[selectedNote].strings.forEach(string => {
            string.state = false;
        });

        updateFretBoard();
    }



    const renderPlayStyleOptions = (playStyles) => {

        const playStyleOptions = [];

        let i = 0;
        for (let [key, value] of Object.entries(playStyles)) {
            //console.log(key, value);

            playStyleOptions.push(
                <option key={i} value={key}>{key.toUpperCase()}</option>
            );

            i++;
        }

        return playStyleOptions;
    }

    return (
        <Container>{(selectedNote !== -1 ?
            <>
                <Control>
                    <PlayStyleSelector
                        ref={playStyleRef}
                        onChange={(event) => changePlayStyle(event.target.value)}
                        value={playStyle}
                    >
                        {renderPlayStyleOptions(GuitarUtils.PlayStyle || {})}
                    </PlayStyleSelector>
                </Control>


                <Control>
                    <ToggleButton
                        iconActive={<CleanIcon size={'1em'} />}
                        iconInactive={<CleanIcon size={'1em'} />}
                        onClickAction={clearTablatureNote}
                        toggleState={true}
                    />
                </Control>
            </>
            : <></>)}
        </Container>
    );
});

FretBoardControlBar.displayName = 'FretBoardControlBar';

export default FretBoardControlBar;