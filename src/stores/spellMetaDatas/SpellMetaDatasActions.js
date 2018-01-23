import * as SpellMetaDatasActionTypes from './SpellMetaDatasActionTypes'
import * as LocalStorageKeys from './../LocalStorageKeys';

export const fetchSpellMetaDatas = () => {
  return (dispatch, getState) => {
    try {
      const spellClass = getState().spells.spellClass;
      const spellMetaDatas = JSON.parse(localStorage.getItem(LocalStorageKeys.SPELL_META_DATAS+spellClass));
      dispatch(setSpellMetaDatas(spellMetaDatas || {}));
    } catch (error) {
      console.log('no spell metadatas saved, using the default');
      dispatch(setSpellMetaDatas({}));
    }
  }
}

export const storeSpellMetaDatas = () => {
  return (dispatch, getState) => {
    const spellClass = getState().spells.spellClass;
    const spellMetaDatas = getState().spellMetaDatas.spellMetaDatas;
    try {
      localStorage.setItem(
        LocalStorageKeys.SPELL_META_DATAS+spellClass, 
        JSON.stringify(spellMetaDatas)
      )
    } catch (error) {
      console.error(`could not save spell metadatas:  ${error}`);
    }
  }
}

export const setSpellMetaDatas = spellMetaDatas => ({
  type: SpellMetaDatasActionTypes.SET_SPELL_META_DATAS,
  spellMetaDatas
});

export const updateSpellMetaData = (id, spellMetaData) => ({
  type: SpellMetaDatasActionTypes.UPDATE_SPELL_META_DATA,
  spellMetaData,
  id
})