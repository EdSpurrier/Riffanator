import React, { memo } from 'react';

const GuitarTabIcon = memo(({ size = "2em", color = "#000" }) => {

    return (
        <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
            width={size} height={size} viewBox="0 0 512.000000 512.000000"
            preserveAspectRatio="xMidYMid meet">

            <g transform="translate(0.000000,512.000000) scale(0.1,-0.1)"
                fill={color} stroke="none">
                <path d="M115 4182 c-97 -47 -140 -154 -100 -250 33 -78 93 -116 200 -126 111
-11 163 -30 275 -102 186 -119 300 -155 495 -155 192 0 306 35 480 146 123 78
160 94 242 106 128 18 222 -9 374 -107 164 -106 292 -145 479 -145 187 0 315
39 479 145 152 98 240 123 371 107 83 -11 121 -27 245 -106 174 -111 288 -146
480 -146 195 0 309 36 495 155 112 72 164 91 275 102 107 10 167 48 200 126
42 103 -14 223 -122 259 -49 16 -196 6 -291 -21 -88 -24 -142 -51 -276 -135
-126 -79 -190 -99 -305 -93 -98 5 -154 26 -281 107 -183 118 -275 145 -480
146 -193 0 -291 -26 -438 -117 -37 -23 -92 -56 -122 -75 -69 -42 -106 -53
-202 -60 -127 -9 -179 9 -373 130 -51 32 -131 70 -185 88 -91 32 -101 33 -250
33 -216 1 -303 -25 -490 -145 -127 -81 -183 -102 -281 -107 -115 -6 -179 14
-305 93 -191 120 -282 152 -449 161 -85 4 -106 2 -140 -14z"/>
                <path d="M114 2865 c-121 -61 -149 -202 -61 -302 41 -46 76 -60 181 -72 98
-11 148 -31 256 -100 192 -123 291 -154 495 -154 208 1 294 28 500 157 125 79
176 96 284 96 116 0 166 -17 289 -95 134 -85 164 -100 269 -131 78 -24 105
-27 233 -27 128 0 155 3 233 27 105 31 135 46 269 131 123 78 173 95 289 95
108 0 159 -17 284 -96 206 -129 292 -156 500 -157 204 0 303 31 495 154 108
69 158 89 256 100 105 12 140 26 181 72 84 96 62 234 -50 298 -37 21 -53 24
-137 22 -158 -3 -300 -51 -451 -154 -108 -73 -162 -93 -270 -97 -123 -5 -178
10 -294 84 -215 136 -310 167 -515 167 -207 0 -293 -26 -496 -153 -131 -83
-181 -100 -294 -100 -113 0 -163 17 -294 100 -203 127 -289 153 -496 153 -205
0 -300 -31 -515 -167 -116 -74 -171 -89 -294 -84 -108 4 -162 24 -270 97 -143
97 -277 145 -439 156 -81 6 -91 5 -138 -20z"/>
                <path d="M144 1564 c-89 -22 -153 -118 -140 -211 14 -105 85 -161 221 -174
107 -10 144 -24 266 -102 198 -126 281 -151 494 -151 214 0 298 26 504 158 58
36 123 72 145 79 23 6 88 12 146 12 121 -1 147 -10 289 -100 193 -121 286
-149 491 -149 205 0 298 28 491 149 142 90 168 99 289 100 58 0 123 -6 146
-12 22 -7 87 -43 145 -79 206 -132 290 -158 504 -158 213 0 296 25 494 151
122 78 159 92 266 102 136 13 207 69 221 174 13 93 -51 189 -140 211 -60 16
-208 3 -300 -24 -87 -27 -137 -52 -257 -130 -110 -71 -175 -93 -279 -93 -112
-1 -167 17 -282 90 -182 115 -271 149 -424 161 -235 18 -370 -18 -597 -161
-114 -72 -170 -90 -277 -90 -107 0 -163 18 -277 90 -227 143 -362 179 -597
161 -153 -12 -242 -46 -424 -161 -115 -73 -170 -91 -282 -90 -104 0 -169 22
-279 93 -120 78 -170 103 -257 130 -92 27 -240 40 -300 24z"/>
            </g>
        </svg>

    );

});

GuitarTabIcon.displayName = 'GuitarTabIcon';

export default GuitarTabIcon;