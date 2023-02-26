import * as fs from 'fs';
import { config } from '../config';


const FileManagement = {

    saveRiffToJSON(fileName) {
 
        const file = config.fileManager.saveFolder + '/' + fileName;
        const jsonData = [{
            riff_name           : window.riffSettings.riffName,
            grooveSkeleton      : window.grooveSkeleton.groove,
            guitar_1            : window.guitars[0].tablature,
            guitar_2            : window.guitars[1].tablature,

        }]
        
        const fileData = JSON.stringify(jsonData);
        const blob = new Blob([fileData], {type: "text/plain"});
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = fileName;
        link.href = url;
        link.click();
        
    },


/* 
    saveFile(fileName, jsonData) {
        fs.writeFile(fileName, JSON.stringify(jsonData), (err) => {
            if (err) console.log('Error writing file:', err);
        })
    }, */

    loadFile(file) {

        console.log('loadFile()');
        let fileReader = new FileReader();

        
        fileReader.onload = (event) => {
      
            const riffJSON = JSON.parse(event.target.result);

            // or do whatever manipulation you want on JSON.parse(event.target.result) here.
            console.log('loadFile', riffJSON);

            
          
        };
        fileReader.readAsText(file[0]);

    }
    
}

export default FileManagement;