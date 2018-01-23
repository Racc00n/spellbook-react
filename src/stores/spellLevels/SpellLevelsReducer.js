import * as SpellLevelsActionTypes from './SpellLevelsActionTypes';
import defaultSpellLevels from '../../model/defaultSpellLevels';
import { arrayToMap } from '../../utils/utils';

const initialState = {
  ids: [...defaultSpellLevels.map(level => level.label)],
  spellLevels: arrayToMap(defaultSpellLevels, 'label'),
  selectedSpellLevel: defaultSpellLevels[0].label
}

const SpellLevelsReducer = (state = initialState, action) => {
  switch( action.type ) {
    case SpellLevelsActionTypes.SET_SPELL_LEVELS: 
      return {
        ...state,
        ids: action.spellLevels.map(level => level.label),
        spellLevels: arrayToMap(action.spellLevels, 'label'),
        selectedSpellLevel: action.spellLevels[0].label
      };
    case SpellLevelsActionTypes.UPDATE_SELECTED_SPELL_LEVEL:
      return {
        ...state,
        selectedSpellLevel: action.id
      };
    case SpellLevelsActionTypes.UPDATE_SPELL_LEVEL:
      return {
        ...state,
        spellLevels: {
          ...state.spellLevels,
          [action.id]: {
                        ...state.spellLevels[action.id],
                        ...action.spellLevel
                        }
        }
      }    
    default: 
      return state;
  }
}

export default SpellLevelsReducer;
