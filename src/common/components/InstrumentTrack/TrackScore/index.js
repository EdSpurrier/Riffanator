import React, { memo } from 'react';
import styled from 'styled-components';
import TrackBar from './TrackBar';

const Score = styled.div`
    background          : ${({ theme }) => theme.colors.trackScore.background};
    color               : ${({ theme }) => theme.colors.trackScore.text};

    display: flex;

    width               : 100%;
    height              : ${({ theme }) => theme.sizes.trackScore.height};

    padding-bottom      : ${({ theme }) => theme.sizes.trackScore.paddingVertical};
    padding-top         : ${({ theme }) => theme.sizes.trackScore.paddingVertical};
    
    border-top          : 1px solid ${({ theme }) => theme.colors.trackScore.border};
    border-bottom       : 1px solid ${({ theme }) => theme.colors.trackScore.border};


`;

const TrackScore = memo(({ children }) => {



    const totalBars = 4;

    const renderBars = (barCount) => {
        let bars = [];
        for (let i = 0; i < barCount; i++) {
            bars.push(<TrackBar key={i} />);
        }
        return bars;
    }


    return (
        <Score>
            {renderBars(totalBars)}  
        </Score>
    );
});

TrackScore.displayName = 'TrackScore';

export default TrackScore;