# Available Scripts

In the project directory, you can run:


## `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

Uses concurrently & runs React in Dev Mode and Electron `wait-on` for React Dev server to start


# How the Core Project Was Started

This tutorial was used to setup the initial project [Electron-React App](https://www.section.io/engineering-education/desktop-application-with-react/)

Using Ant Design elements for UI - [Ant Design](https://ant.design/)




# How GrooveRiffGenerator works
POSITION CHANCE: 
    positionInBeat,
    positionInBar,
    positionInRiff,
    currentBeat,
    onBeat,

Position chance is the amount of chance given to any note if position values are matching.
eg.

Current position in writing is half way through that beat then the following setting will mean it has a +50 chance of playing next

positionInBeat = {
    value: 0.5,
    chance: +50
}



RULES:
    wontFollow  //  Means this note IS never allowed to follow any of these notes
    canFollow   //  Means this note CAN follow any of these notes
    mustFollow  //  Means this note must follow a certain note                   

Depending on the previous note played then these rules are applied if the previous note matches the set note variables:
scaleNoteId: 0,        //  Note Id in the set scale eg. in a C major [0=C, 1=D, 2=E, etc]
octave: 1              //  Lowest = 0 - related to lowest allowed note of that note on the guitar fretboard
typeof: 'single'       //  Single note or chord (different chord types here eg. octave chord)
playStyle: 'chugga'
chance: 50              // Chance factor that gets added all together to see how much of a random chance this note is next

