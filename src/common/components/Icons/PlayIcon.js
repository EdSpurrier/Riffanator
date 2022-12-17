import React, { memo } from 'react';

const PlayIcon = memo(({ size = "2em", color = "#000" }) => {

    return (
        <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
            width={size} height={size} viewBox="0 0 512.000000 512.000000"
            preserveAspectRatio="xMidYMid meet">



            <g transform="translate(0.000000,512.000000) scale(0.1,-0.1)"
                fill={color} stroke="none">
                <path d="M490 5111 c-69 -21 -121 -65 -156 -131 -18 -34 -19 -112 -19 -2420
l0 -2385 22 -40 c56 -105 184 -160 288 -123 61 22 4065 2336 4103 2372 54 50
76 101 76 176 0 75 -22 126 -76 176 -35 34 -4039 2349 -4098 2370 -39 14 -101
16 -140 5z"/>
            </g>
        </svg>

    );

});

PlayIcon.displayName = 'PlayIcon';

export default PlayIcon;