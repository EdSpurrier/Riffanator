import { useDispatch, useSelector } from 'react-redux';
import { selectPanel, deselectPanel } from '../../../State/Interaction/actions';

export const useActivePanel = (panelData) => {

    const dispatch = useDispatch();
    const selectedPanel = useSelector(state => state.interaction)

    const activatePanel = () => {
        //console.log('activating');
        if(selectedPanel.selected.name === panelData.name) return;
        dispatch(selectPanel(panelData));
    }

    const deactivatePanel = () => {
        //console.log('deactivating');
        dispatch(deselectPanel());
    }
    

    const isSelected = () => {
        //console.log((panelData.name===selectedPanel.selected.name), panelData.name, selectedPanel.selected.name);
        return (panelData.name===selectedPanel.selected.name)?'selected':'';
    }


    return {
        state: selectedPanel,
        activatePanel,
        deactivatePanel,
        isSelected
    }
}