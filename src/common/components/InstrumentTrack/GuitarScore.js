import React, { memo, useEffect, useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Score = styled.div`
    background: white;
    width: 100%;
    display: flex;
`

const Slice = styled.div`
    display: flex;
    flex-direction: column;
    background: ${({ theme }) => theme.colors.instrumentTrack.guitar.slice};
    border-left: 1px solid ${({ theme }) => theme.colors.instrumentTrack.guitar.border};
    border-right: 1px solid ${({ theme }) => theme.colors.instrumentTrack.guitar.border};
    flex-grow: 4;
    transition: border ${({ theme }) => theme.animation.fast};

    &:hover {
        border-color: ${({ theme }) => theme.colors.instrumentTrack.guitar.slice.hover};
    }

    &:hover .stringBox {
        background: ${({ theme }) => theme.colors.instrumentTrack.guitar.string.hover};
    }

    &.barEnd {
        border-right: 1px solid black;
    }
`
const String = styled.div`
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ theme }) => theme.colors.instrumentTrack.guitar.slice};
    border-bottom: 1px solid ${({ theme }) => theme.colors.instrumentTrack.guitar.border};
    height: 30px;
    cursor: pointer;
    /* transition: background ${({ theme }) => theme.animation.fast}; */

    &:hover {
        background: ${({ theme }) => theme.colors.instrumentTrack.guitar.string.hover};
    }
`

const PlayStyle = styled.div`
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ theme }) => theme.colors.instrumentTrack.guitar.slice};
    border-bottom: 1px solid ${({ theme }) => theme.colors.instrumentTrack.guitar.border};
    height: 30px;
    cursor: pointer;
    /* transition: background ${({ theme }) => theme.animation.fast}; */

    &:hover {
        background: ${({ theme }) => theme.colors.instrumentTrack.guitar.string.hover};
    }
`
const GuitarScore = memo(({ slices }) => {

    const renderScore = (slices) => {
        return slices.map((slice, key) =>
            <Slice key={key} className={(key+1) % 4 === 0?'barEnd':''}>
                {slice.strings.map((string, stringKey) =>
                   <String className={'stringBox'} key={stringKey}>{(string.type !== 0)?string.fret:''}</String> 
                )}
                <PlayStyle className={'stringBox'}>{slice.style}</PlayStyle> 
            </Slice>
        )

    }


    return (

        <Score className={'score'}>
            {renderScore(slices)}
        </Score>
    );
});

GuitarScore.displayName = 'GuitarScore';

export default GuitarScore;