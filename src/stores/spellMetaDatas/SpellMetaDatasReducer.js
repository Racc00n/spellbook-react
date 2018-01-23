import * as SpellMetaDatasActionTypes from './SpellMetaDatasActionTypes';
import { SpellMetaData } from '../../model/SpellMetaData';

const initialState = {  
  spellMetaDatas: {} 
};

const replenishSpellsMetaDatas = (state, action) => {
  const result = {};
  for(const key in state.spellMetaDatas) {
    result[key] = {
      ...state.spellMetaDatas[key],
      remainingUses: state.spellMetaDatas[key].preparedUses
    }
  }
  return {...state, spellMetaDatas: result}  
}

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
    case SpellMetaDatasActionTypes.REPLENISH_SPELL_META_DATAS:
      return replenishSpellsMetaDatas(state, action);
    default:
      return state;
  }
}


export default SpellMetaDatasReducer;