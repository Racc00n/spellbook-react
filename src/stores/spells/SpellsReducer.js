import * as SpellsActionTypes from './SpellsActionTypes';
import * as SpellMetaDatasActionTypes from './../spellMetaDatas/SpellMetaDatasActionTypes';
import SpellClassEnum from './../../model/SpellClassEnum';
import { arrayToMap } from '../../utils/utils';

const initialState = {
  ids: [],
  spells: {},
  spellClass: SpellClassEnum.sorcererWizard
}


const SpellsReducer = ( state=initialState, action )=> {
  switch(action.type) {
    case SpellsActionTypes.SET_SPELLS:{
      const filteredSpells = 
        action.spellsArray
        .filter(spell=> spell.level.includes(state.spellClass))        
      return {
        ...state,
        ids: filteredSpells.map(spell => spell.name),
        spells: arrayToMap(filteredSpells, 'name')
      }
    }
    case SpellsActionTypes.UPDATE_SPELL_CLASS:
      return {
        ...state,
        spellClass: action.spellClass
      }
    case SpellMetaDatasActionTypes.UPDATE_SPELL_META_DATA:
      return {
        ...state,
        spells: { 
                  ...state.spells,
                  [action.id]:{...state.spells[action.id],
                              metaData:{...state.spells[action.id].metaData,
                                        ...action.spellMetaData
                                        }
                              }
                }
      }
    case SpellMetaDatasActionTypes.SET_SPELL_META_DATAS: {
      const changedSpells = {}
      for (const spellId in action.spellMetaDatas){
        changedSpells[spellId] = {
                                  ...state.spells[spellId],
                                  metaData: action.spellMetaDatas[spellId]
                                };
      }
      return {
        ...state,
        spells: {
          ...state.spells,
          ...changedSpells
        }
      }
    }    

    default:
      return state;
  }
}

export default SpellsReducer;