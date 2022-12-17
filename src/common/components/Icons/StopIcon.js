import React, { memo } from 'react';

const StopIcon = memo(({ size = "2em", color = "#000" }) => {

    return (
        <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
            width={size} height={size} viewBox="0 0 512.000000 512.000000"
            preserveAspectRatio="xMidYMid meet">



            <g transform="translate(0.000000,512.000000) scale(0.1,-0.1)"
                fill={color} stroke="none">
                <path d="M774 5104 c-16 -8 -39 -29 -50 -47 -19 -31 -19 -71 -19 -2497 0
-2429 0 -2465 20 -2497 38 -64 23 -63 660 -63 631 0 622 -1 662 58 17 26 18
131 18 2502 0 2371 -1 2476 -18 2502 -40 59 -31 58 -664 58 -494 0 -582 -3
-609 -16z"/>
                <path d="M3123 5104 c-18 -9 -40 -28 -50 -43 -17 -25 -18 -135 -18 -2501 0
-2371 1 -2476 18 -2502 40 -59 31 -58 662 -58 637 0 622 -1 660 63 20 32 20
68 20 2497 0 2429 0 2465 -20 2497 -38 64 -23 63 -662 63 -506 0 -582 -2 -610
-16z"/>
            </g>
        </svg>


    );

});

StopIcon.displayName = 'StopIcon';

export default StopIcon;