import * as SpellMetaDatasActionTypes from './SpellMetaDatasActionTypes';
import { SpellMetaData } from '../../model/SpellMetaData';

const initialState = {  
  spellMetaDatas: {} 
};

const SpellMetaDatasReducer = (state = initialState, action ) => {
  switch(action.type) {
    case SpellMetaDatasActionTypes.SET_SPELL_META_DATAS:
      return { ...state, spellMetaDatas: action.spellMetaDatas };
    case SpellMetaDatasActionTypes.UPDATE_SPELL_META_DATA:
      return { 
        ...state,
        spellMetaDatas: {
          ...state.spellMetaDatas,
          [action.id]: {...(state.spellMetaDatas[action.id]|| new SpellMetaData()),
                        ...action.spellMetaData}
        }
      };
    default:
      return state;
  }
}

export default SpellMetaDatasReducer;