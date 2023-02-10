import { useDispatch, useSelector } from 'react-redux';
import useEventListener from '../../../common/hooks/useEventListener';
import { deselectPanel } from '../actions';



const useKeyboardInput = () => {

    const dispatch = useDispatch();
    const interaction = useSelector(state => state.interaction)

    useEventListener('keyup', (evt) => {
/*         console.log('keyup', evt); */

        if (evt.code === "Escape") {
            dispatch(deselectPanel());
        } else {
            
            //console.log('keyboard Actions', interaction.selected);
            if (interaction) {
                interaction.selected.actions.keyboard.forEach(keyboardAction => {
                    //console.log(keyboardAction)
                    if (keyboardAction.key.includes(evt.code)) {
                        //console.log(keyboardAction.key, keyboardAction.action);
                        keyboardAction.action();
                    }
        
                });
            }
        }

    });
}

export default useKeyboardInput;