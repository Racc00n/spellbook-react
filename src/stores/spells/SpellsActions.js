import * as SpellsActionTypes from './SpellsActionTypes';
import * as SpellLevelsActions from './../spellLevels/SpellLevelsActions';
import * as SpellMetaDatasActions from './../spellMetaDatas/SpellMetaDatasActions';
import * as LocalStorageKeys from './../LocalStorageKeys';
import SpellClassEnum from '../../model/SpellClassEnum';
import spellsData from './../../assets/spells.json';
import { SpellMetaData } from './../../model/SpellMetaData';
export const setSpells = spellsArray => ({
  type: SpellsActionTypes.SET_SPELLS,
  spellsArray
});

export const updateSpellClass = spellClass => ({
  type: SpellsActionTypes.UPDATE_SPELL_CLASS,
  spellClass: spellClass 
});
export const setSpellClass = spellClass => {
  return dispatch => {
    dispatch(updateSpellClass(spellClass));
    dispatch(fetchSpells());
    dispatch(SpellLevelsActions.fetchSpellLevels());
    dispatch(SpellMetaDatasActions.fetchSpellMetaDatas());
  }
}

export const fetchSpellClass = () => {
  return dispatch => {
    try {
      const spellClass = localStorage.getItem(LocalStorageKeys.SPELL_CLASS) || SpellClassEnum.sorcererWizard;
      dispatch(setSpellClass(spellClass));     
    } catch (error) {
      console.log('No spell class saved, using the default');
      dispatch(setSpellClass(SpellClassEnum.sorcererWizard));
    }    
  }
}

export const storeSpellClass = () => {
  return (dispatch, getState) => {
    const spellClass = getState().spells.spellClass;
    try {
      localStorage.setItem(LocalStorageKeys.SPELL_CLASS,spellClass);
    } catch (error) {
      console.error('Could not save spell class');
    }
  }
}

export const fetchSpells = () => {
  return (dispatch, getState) => {        
    try{
      const metaDatas = getState().spellMetaDatas.spellMetaDatas;
      const spells = spellsData.spells.map(spell=> {
          spell.metaData = metaDatas[spell.name] || new SpellMetaData();
          return spell;
        });      
      dispatch(setSpells(spells));
    }catch(error) {
      console.error('can`t load spells', error);
      // dispatch();  
    }      
  }
}

export const storeAll = () => {
  return dispatch => {
    dispatch(storeSpellClass());
    dispatch(SpellLevelsActions.storeSpellLevels());
    dispatch(SpellMetaDatasActions.storeSpellMetaDatas());
  }
}
export const replenishSpells = (spellMetaDatas) => ({
  type: SpellsActionTypes.REPLENISH_SPELLS,
  spellMetaDatas
}) 

export const replenish = () => {
  return (dispatch, getState) => {
    dispatch(SpellMetaDatasActions.replenishSpellMetaDatas());
    dispatch(replenishSpells(getState().spellMetaDatas.spellMetaDatas));    
  }
}