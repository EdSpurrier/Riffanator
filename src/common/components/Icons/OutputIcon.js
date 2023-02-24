import React, { memo } from 'react';

const OutputIcon = memo(({ size = "2em", color = "#000" }) => {

    return (
        <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
            width={size} height={size} viewBox="0 0 512.000000 512.000000"
            preserveAspectRatio="xMidYMid meet">

            <g transform="translate(0.000000,512.000000) scale(0.1,-0.1)"
                fill={color} stroke="none">
                <path d="M2506 4415 c-31 -11 -139 -113 -483 -457 -244 -244 -450 -457 -458
-475 -44 -92 5 -196 104 -223 83 -22 89 -17 423 317 l308 308 2 -1117 c3
-1115 3 -1117 24 -1145 73 -98 195 -98 268 0 21 28 21 30 24 1145 l2 1117 308
-308 c334 -334 340 -339 423 -317 99 27 148 131 104 224 -8 17 -216 232 -463
478 -380 379 -453 448 -487 457 -49 13 -51 13 -99 -4z"/>
                <path d="M804 2499 c-47 -13 -101 -79 -109 -131 -3 -24 -5 -302 -3 -618 4
-560 4 -577 26 -640 63 -187 211 -334 397 -393 l70 -22 1375 0 1375 0 70 22
c185 59 334 206 397 393 22 63 22 79 26 652 2 395 0 600 -8 626 -14 53 -74
108 -129 117 -50 8 -123 -24 -155 -68 -20 -28 -21 -43 -26 -625 l-5 -597 -23
-47 c-26 -53 -87 -112 -141 -136 -33 -16 -152 -17 -1381 -17 l-1345 0 -47 23
c-26 13 -63 41 -83 64 -73 80 -69 47 -75 710 -5 582 -5 597 -26 625 -23 31
-98 73 -129 72 -11 0 -34 -5 -51 -10z"/>
            </g>
        </svg>

    );

});

OutputIcon.displayName = 'OutputIcon';

export default OutputIcon;