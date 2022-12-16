import Icon from '@ant-design/icons';

const MicrophoneSVG = () => (
    <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="1.4em" height="1.4em" viewBox="0 0 512.000000 550.000000"
 >

<g transform="translate(-12.000000,575.000000) scale(0.1,-0.1)"
fill="currentColor" stroke="none">
<path d="M3710 5114 c-207 -27 -393 -95 -566 -210 l-81 -53 447 -447 c246
-245 649 -648 894 -894 l447 -447 53 81 c109 164 173 333 202 526 59 406 -86
821 -386 1103 -169 159 -370 266 -600 318 -83 19 -331 33 -410 23z"/>
<path d="M2796 4556 c-117 -176 -186 -366 -209 -572 l-5 -41 682 -681 681
-680 60 8 c203 26 398 99 560 211 l71 49 -447 446 c-246 245 -648 648 -893
893 l-447 448 -53 -81z"/>
<path d="M1585 2680 c-467 -544 -857 -1004 -867 -1022 -22 -41 -23 -117 -3
-166 21 -50 714 -745 771 -772 50 -25 117 -25 169 -1 22 10 110 79 195 152
140 122 1169 1005 1615 1387 99 85 186 160 192 166 10 9 -129 153 -605 629
l-617 617 -850 -990z m1021 -6 c73 -35 104 -127 66 -200 -11 -21 -80 -98 -154
-171 -143 -140 -166 -153 -242 -139 -89 17 -139 113 -105 203 13 36 253 279
299 303 44 24 92 25 136 4z"/>
<path d="M413 1108 c-67 -68 -138 -149 -157 -182 -69 -115 -83 -282 -35 -411
l21 -57 -105 -107 c-58 -58 -112 -120 -121 -138 -61 -122 75 -258 197 -197 18
9 80 63 138 121 l107 105 57 -21 c129 -49 294 -34 412 35 35 21 111 87 182
158 l121 121 -348 348 -347 347 -122 -122z"/>
</g>
</svg>
);

const MicrophoneIcon = (props) => <Icon component={MicrophoneSVG} {...props} />; 

MicrophoneIcon.displayName = 'MicrophoneIcon';

export default MicrophoneIcon;

