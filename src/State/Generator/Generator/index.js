import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFilesToGenerator, generator_UpdateActions, generator_UpdateGrooveSkeleton } from '../../../State/Generator/actions';

export const useGenerator = () => {

    const dispatch = useDispatch();
    const generator = useSelector(state => state.generator)

    const addFilesToGeneratorDispatch = (files) => {
/*         console.log('addFilesToGenerator', files); */
        dispatch(addFilesToGenerator(files));
    }
    



    //===============================//
    //  GENERATOR ACTIONS
    //===============================//
     
    const updateActions = (actions) => {
        dispatch(generator_UpdateActions(actions));
    }
       
    const [generatorActions, setGeneratorActions] = useState(generator.actions);

    const updateGeneratorActions = (updatedActions) => {
        let currentGeneratorActions = generatorActions;
        for (let key in updatedActions) {
            if(typeof(updatedActions[key]) === 'object') {
                for (let subKey in updatedActions[key]) {
                    currentGeneratorActions[key][subKey] = updatedActions[key][subKey];
                }
              } else {
                currentGeneratorActions[key] = updatedActions[key];
              }
        }
        setGeneratorActions(currentGeneratorActions);
    }

    useEffect(() => {
        updateActions(generatorActions);     
    }, [generatorActions]);

    //===============================//
    //===============================//
    //===============================//




    //===============================//
    //  GROOVE SKELETON
    //===============================//

    const updateGrooveSkeleton = (settings) => {
        dispatch(generator_UpdateGrooveSkeleton(settings));
    }

    const [grooveSkeletonSettings, setGrooveSkeletonSettings] = useState(generator.settings.grooveSkeleton);

    const updateGrooveSkeletonSettings = (updatedSettings) => {
        let currentGrooveSkeletonSettings = grooveSkeletonSettings;
        for (let key in updatedSettings) {
            if(typeof(updatedSettings[key]) === 'object') {
                for (let subKey in updatedSettings[key]) {
                    currentGrooveSkeletonSettings[key][subKey] = updatedSettings[key][subKey];
                }
              } else {
                currentGrooveSkeletonSettings[key] = updatedSettings[key];
              }
        }
        setGrooveSkeletonSettings(currentGrooveSkeletonSettings);
    }

    useEffect(() => {
        updateGrooveSkeleton(grooveSkeletonSettings);     
    }, [grooveSkeletonSettings]);

    //===============================//
    //===============================//
    //===============================//


/*     const getActions = () => {
        return generator.state?.actions;
    }
 */
    return {
        state: generator,
/*         actions: getActions(), */
        addFilesToGenerator : addFilesToGeneratorDispatch,
        updateGrooveSkeletonSettings,
        updateGeneratorActions
    }
}