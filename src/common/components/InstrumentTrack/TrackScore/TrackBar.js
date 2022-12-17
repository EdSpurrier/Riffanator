import React, { memo } from 'react';
import styled from 'styled-components';

const Bar = styled.div`
    width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.trackScore.lines.bar};
  display: flex;
`
const Beat = styled.div`
    width: 25%;
    height: 100%;
    text-align: center;
    border: 1px solid ${({ theme }) => theme.colors.trackScore.lines.beat};
`


const TrackBar = memo(({ children }) => {



  return (
    <Bar>
        <Beat>
            Beat
        </Beat>
        <Beat>
            Beat
        </Beat>
        <Beat>
            Beat
        </Beat>
        <Beat>
            Beat
        </Beat>    
    </Bar>
  );
});

TrackBar.displayName = 'TrackBar';

export default TrackBar;