import React, { memo } from 'react';

const InputIcon = memo(({ size = "2em", color = "#000" }) => {

    return (
        <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
            width={size} height={size} viewBox="0 0 512.000000 512.000000"
            preserveAspectRatio="xMidYMid meet">

            <g transform="translate(0.000000,512.000000) scale(0.1,-0.1)"
                fill={color} stroke="none">
                <path d="M2495 4306 c-37 -17 -70 -52 -84 -89 -8 -19 -11 -327 -11 -970 l0
-942 -282 282 c-305 304 -307 305 -395 288 -49 -9 -109 -69 -118 -118 -17 -91
-29 -77 433 -540 235 -236 439 -435 454 -443 35 -18 101 -18 136 0 15 8 219
207 454 443 462 463 450 449 433 540 -9 49 -69 109 -118 118 -88 17 -90 16
-394 -288 l-283 -281 -2 956 c-3 948 -3 957 -24 984 -11 15 -32 37 -46 47 -34
25 -113 32 -153 13z"/>
                <path d="M895 2386 c-37 -17 -70 -52 -84 -89 -18 -47 -14 -905 4 -992 45 -216
223 -409 440 -478 l70 -22 1235 0 1235 0 70 22 c199 63 365 229 428 428 21 68
22 82 22 557 0 476 0 487 -21 514 -39 53 -71 69 -134 69 -63 0 -95 -16 -134
-69 -20 -27 -21 -42 -26 -499 l-5 -472 -27 -51 c-40 -76 -70 -107 -140 -145
l-63 -34 -1205 0 -1205 0 -51 27 c-76 40 -107 70 -145 140 l-34 63 -5 472 c-5
457 -6 472 -26 499 -11 15 -32 37 -46 47 -34 25 -113 32 -153 13z"/>
            </g>
        </svg>

    );

});

InputIcon.displayName = 'InputIcon';

export default InputIcon;