import * as SpellLevelActionTypes from './SpellLevelsActionTypes';
import * as LocalStorageKeys from './../LocalStorageKeys';
import { mapToArray } from '../../utils/utils';
import defaultSpellLevels from '../../model/defaultSpellLevels';

export const setSpellLevels = (spellLevels)  => {
  return {
    type: SpellLevelActionTypes.SET_SPELL_LEVELS,
    spellLevels
  };
};

export const updateSpellLevel = (id, spellLevel) => {
  return {
    type: SpellLevelActionTypes.UPDATE_SPELL_LEVEL,
    id,
    spellLevel
  }
}

export const updatedSelectedSpellLevel = (id) => {
  return {
    type: SpellLevelActionTypes.UPDATE_SELECTED_SPELL_LEVEL,
    id 
  }
}

export const fetchSpellLevels = () => {
  return (dispatch, getState) => {
    const spellClass = getState().spells.spellClass;  
    try {
      const result = localStorage.getItem(LocalStorageKeys.SPELL_LEVELS+spellClass);
      dispatch(setSpellLevels(result? JSON.parse(result) : defaultSpellLevels));
    } catch (error) {
      console.log(`No stored spell levels for class ${spellClass}, loading default: ${error}`);
      dispatch(setSpellLevels(defaultSpellLevels));
    }
  }
}

export const storeSpellLevels = (spellClass, spellLevels) => {
  return (dispatch, getState) => {
    try {
      const spellLevelsState = getState().spellLevels;
      const spellLevelsArray = mapToArray(spellLevelsState.ids, spellLevelsState.spellLevels);
      const spellClass = getState().spells.spellClass;
      localStorage.setItem(
        LocalStorageKeys.SPELL_LEVELS + spellClass,
        JSON.stringify(spellLevelsArray)
      );      
    } catch (error) {
      console.error('failed storing spellLevels');      
    }
  }
}
  