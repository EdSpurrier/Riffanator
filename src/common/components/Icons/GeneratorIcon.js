import React, { memo } from 'react';

const GeneratorIcon = memo(({ size = "2em", color = "#000" }) => {

    return (
        <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
            width={size} height={size} viewBox="0 0 512.000000 512.000000"
            preserveAspectRatio="xMidYMid meet">

            <g transform="translate(0.000000,512.000000) scale(0.1,-0.1)"
                fill={color} stroke="none">
                <path d="M2099 5091 l-29 -29 0 -186 0 -186 -83 0 c-119 0 -120 -1 -158 -226
-24 -147 -33 -182 -50 -196 -12 -10 -29 -18 -39 -18 -10 0 -89 27 -176 60 -88
33 -172 60 -187 60 -36 0 -62 -28 -112 -117 l-40 -73 -260 3 -260 2 -3 132 -3
132 39 20 c122 62 171 222 105 343 -51 94 -146 146 -249 135 -92 -9 -175 -71
-212 -156 -19 -45 -20 -134 -3 -185 16 -47 80 -119 121 -136 l29 -12 3 -200 3
-200 28 -24 28 -24 270 0 269 0 0 -24 c0 -34 24 -60 169 -176 71 -58 130 -111
130 -117 1 -10 -46 -13 -202 -13 -112 0 -298 -3 -414 -7 l-211 -6 -7 23 c-4
12 -23 40 -43 62 -157 174 -442 67 -442 -166 0 -211 229 -329 402 -207 31 22
53 49 87 107 4 8 110 14 341 19 l335 7 -40 -33 c-83 -69 -105 -96 -105 -128 0
-22 28 -80 85 -179 l85 -148 0 -186 0 -187 -220 -3 -220 -3 -11 27 c-16 40
-99 113 -145 129 -189 64 -378 -103 -335 -296 25 -111 127 -196 238 -198 32 0
76 5 97 12 46 16 129 89 145 129 l11 27 281 0 281 0 24 28 c24 28 24 29 24
260 l0 232 129 48 c70 26 135 47 143 47 9 0 25 -8 37 -17 17 -15 26 -50 50
-197 34 -204 45 -226 113 -226 l38 0 0 -215 0 -215 -139 0 c-133 0 -141 -1
-168 -24 l-28 -24 -3 -644 -2 -643 -380 -380 c-365 -366 -380 -382 -380 -418
0 -27 7 -45 25 -62 l24 -25 1395 0 1395 0 27 24 c21 18 28 32 28 60 0 35 -15
52 -297 334 l-297 297 0 229 0 228 95 158 95 158 128 -74 c70 -41 192 -108
271 -147 l143 -72 288 0 288 0 26 24 26 24 0 255 0 255 87 89 88 89 3 145 4
144 81 0 c67 0 87 4 123 25 55 32 89 98 82 158 -3 23 -66 177 -141 346 l-135
305 28 40 c104 153 138 300 120 516 -23 262 -103 487 -251 711 -81 121 -272
313 -391 393 -115 76 -430 236 -464 236 -20 0 -40 -13 -70 -45 l-42 -45 -283
2 -284 3 -5 108 c-7 161 42 147 -507 147 l-455 0 -29 -29z m821 -231 c0 -49 5
-101 12 -115 23 -52 44 -55 338 -55 148 0 270 -3 270 -6 0 -3 -61 -90 -135
-194 -74 -104 -135 -196 -135 -204 0 -14 -22 -16 -164 -16 -154 0 -165 1 -171
19 -11 36 -61 81 -90 81 -15 0 -99 -27 -187 -60 -89 -33 -169 -60 -178 -60
-45 0 -57 28 -89 214 -35 205 -46 226 -113 226 l-38 0 0 130 0 130 340 0 340
0 0 -90z m-2237 -111 c9 -12 17 -38 17 -59 0 -91 -128 -109 -161 -24 -12 33
12 91 43 104 33 14 80 4 101 -21z m3265 -68 c162 -82 256 -146 364 -249 231
-221 372 -517 396 -834 16 -198 -13 -311 -110 -432 -46 -57 -52 -71 -48 -109
1 -9 66 -162 145 -340 l143 -322 -122 -5 c-66 -3 -127 -9 -135 -14 -30 -19
-41 -74 -41 -201 l0 -125 -38 0 c-92 0 -208 47 -297 121 -26 22 -57 42 -69 45
-54 13 -114 -47 -100 -101 16 -65 191 -180 324 -214 64 -16 69 -19 54 -32 -38
-31 -44 -71 -44 -287 l0 -209 -202 -6 -203 -6 -143 70 c-126 63 -452 252 -532
309 l-30 22 2 285 3 285 194 78 c122 48 201 86 213 100 16 20 18 44 18 221 l0
198 -125 167 -125 168 0 491 0 490 180 253 c100 138 183 252 186 252 2 0 66
-31 142 -69z m-1733 -193 c3 -18 16 -96 29 -173 20 -119 27 -142 47 -158 36
-28 139 -87 163 -93 13 -3 87 20 180 55 88 33 163 58 167 56 3 -3 27 -41 52
-85 l45 -80 -129 -106 c-72 -59 -134 -115 -140 -125 -15 -29 -11 -201 6 -225
8 -12 70 -67 139 -124 l125 -102 -26 -47 c-42 -72 -73 -121 -77 -121 -2 0 -62
22 -132 49 -221 83 -190 80 -295 20 -51 -29 -94 -62 -99 -73 -4 -12 -17 -79
-29 -151 -12 -71 -24 -142 -27 -157 l-6 -28 -98 0 -98 0 -11 63 c-6 34 -18
109 -28 167 -19 119 -28 133 -124 185 -92 51 -83 52 -259 -14 -90 -33 -166
-58 -170 -56 -4 3 -28 40 -53 84 l-44 79 96 79 c52 43 115 95 138 117 l43 39
0 99 c0 55 -5 108 -10 118 -6 11 -68 67 -139 125 l-129 106 45 77 c25 42 48
80 52 84 4 4 72 -17 151 -48 80 -30 161 -56 180 -56 34 -1 117 41 179 89 24
20 30 42 71 291 l12 72 98 0 99 0 6 -32z m1045 -563 l0 -175 -202 0 -203 1 31
27 c17 15 70 60 117 100 81 67 87 75 87 110 0 20 -9 51 -20 67 -11 17 -20 33
-20 38 0 4 47 7 105 7 l105 0 0 -175z m-2861 -270 c73 -37 43 -155 -39 -155
-84 0 -110 115 -35 158 27 15 41 15 74 -3z m2861 -245 l0 -170 -105 0 c-58 0
-105 2 -105 5 0 2 9 19 20 37 21 35 26 79 11 107 -6 10 -55 55 -110 101 -56
45 -101 84 -101 86 0 2 88 4 195 4 l195 0 0 -170z m-606 -380 c87 -33 171 -60
186 -60 34 0 74 30 90 70 l12 30 217 0 216 -1 73 -98 72 -98 0 -72 0 -71 -170
0 -170 0 0 -85 0 -84 93 -3 92 -3 -75 -29 c-145 -56 -177 -74 -189 -108 -6
-17 -11 -69 -11 -114 l0 -84 -465 0 -465 0 0 215 0 215 76 0 c121 0 119 -4
160 245 22 133 30 163 47 177 12 10 29 18 37 18 8 0 86 -27 174 -60z m-1977
-412 c51 -48 15 -138 -54 -138 -46 0 -69 14 -82 50 -12 35 0 77 26 98 27 20
84 15 110 -10z m1651 -1193 l2 -620 -82 -95 -83 -94 -3 202 -2 202 -90 0 -90
0 0 -307 0 -308 -102 -118 -102 -117 -305 0 -306 0 323 323 322 323 0 610 c0
336 3 614 7 618 4 3 119 5 257 4 l251 -3 3 -620z m342 348 l0 -277 170 -171
c117 -118 170 -178 170 -193 l0 -22 -255 0 -255 0 0 470 0 470 85 0 85 0 0
-277z m420 108 c0 -97 5 -181 11 -200 8 -22 29 -43 65 -66 30 -19 54 -37 54
-39 0 -9 -122 -210 -137 -226 -11 -13 -29 1 -128 100 l-115 115 0 242 0 243
125 0 125 0 0 -169z m-420 -1326 l0 -385 -331 0 c-182 0 -329 4 -327 8 2 4
107 126 233 271 127 144 235 272 242 284 7 13 12 61 13 115 l0 92 85 0 85 0 0
-385z m340 238 l0 -147 237 -238 237 -238 -322 0 -322 0 0 385 0 385 85 0 85
0 0 -147z"/>
                <path d="M3610 4100 l0 -170 85 0 85 0 -2 168 -3 167 -82 3 -83 3 0 -171z" />
                <path d="M3610 3665 l0 -86 83 3 82 3 3 83 3 82 -86 0 -85 0 0 -85z" />
                <path d="M3610 3325 l0 -86 83 3 82 3 3 83 3 82 -86 0 -85 0 0 -85z" />
                <path d="M4315 3385 c-23 -22 -25 -31 -25 -125 l0 -100 -92 0 c-104 0 -136
-11 -156 -54 -17 -33 -9 -69 20 -96 20 -18 35 -20 179 -20 87 0 165 3 174 6
35 14 45 58 45 204 0 181 -12 210 -91 210 -18 0 -39 -10 -54 -25z"/>
                <path d="M2015 3997 c-98 -33 -172 -97 -213 -185 -37 -77 -38 -202 -4 -276 34
-75 84 -129 154 -167 59 -32 69 -34 158 -34 84 0 101 3 147 28 75 39 115 78
154 149 32 58 34 70 34 153 0 76 -4 99 -26 146 -55 117 -164 189 -293 196 -41
1 -88 -3 -111 -10z m175 -180 c116 -61 118 -230 5 -294 -82 -46 -188 -16 -232
67 -37 69 -28 137 25 194 56 59 130 71 202 33z"/>
                <path d="M2500 2645 l0 -85 85 0 85 0 0 85 0 85 -85 0 -85 0 0 -85z" />
                <path d="M2840 2645 l0 -85 85 0 85 0 0 85 0 85 -85 0 -85 0 0 -85z" />
                <path d="M1987 1704 c-4 -4 -7 -43 -7 -86 l0 -78 90 0 91 0 -3 83 -3 82 -80 3
c-45 1 -84 0 -88 -4z"/>
                <path d="M1984 1357 c-3 -8 -4 -47 -2 -88 l3 -74 85 0 85 0 0 85 0 85 -83 3
c-63 2 -84 0 -88 -11z"/>
            </g>
        </svg>


    );

});

GeneratorIcon.displayName = 'GeneratorIcon';

export default GeneratorIcon;