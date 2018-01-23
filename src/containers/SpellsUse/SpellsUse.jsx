import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as SpellsActions from './../../stores/spells/SpellsActions';
import * as SpellMetaDatasActions from './../../stores/spellMetaDatas/SpellMetaDatasActions';
import { mapToArray } from '../../utils/utils';
import MoreDetail from './../../components/MoreDetail/MoreDetail';

const styles = {
  root: {    
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    textAlign: ' center'
  },
  link: {
    color: 'blue'
  },
  title: {
    flex: '0 0 auto'      
  },
  content: {
    flex: '1 1 auto',
    overflowY: 'auto'
  },
  known: {
    cursor: 'pointer',    
    color: 'blue'
  }
}

class SpellsUse extends Component {   
  componentWillUnmount() {
    this.props.onDestroy();
  } 
 
  renderCells(spellLevel, spells) {
    return spells
    .map(spell => {
      return (
        <tr key={spell.name}>
          <td>
            {spell.metaData.remainingUses}
          </td>
          <td>
            <button className="btn btn-fab btn-primary" onClick={this.props.castSpellClicked.bind(this,spell)}>Cast</button>
          </td>
          <td>{spell.name}</td>
          <td>{spell.shortdescription}<br/>
            <MoreDetail text={spell.description}></MoreDetail>          
          </td>
          <td>{spell.school}</td>
          <td>{spell.components}</td>
          <td>{spell.castingtime}</td>
          <td>{spell.range}</td>
          <td>{spell.target || spell.effect || spell.area}</td>
          <td>{spell.duration}</td>
          <td>{spell.savingthrow}</td>
          <td>{spell.spellresistance}</td>
        </tr>
      );
    });
  }
    
  renderSpellTables() {
    return this.props.spellLevels.map(spellLevel => {
      const filteredSpells = this.props.spells.filter(spell => 
        ( spell.level.includes(this.props.spellClass +' ' + spellLevel.label) &&
                        spell.metaData.known && (spell.metaData.remainingUses > 0)));
      if (filteredSpells.length === 0 ) { 
        return [];
      }
      
      return (
        <table key={spellLevel.label} className="table">
          <thead>
            <tr className="thead-light">
            <th>Remaining Uses</th>
            <th>Cast</th>
            <th>Name</th>
            <th>Description(short)</th>
            <th>School</th>
            <th>Components</th>
            <th>Casting Time</th>
            <th>Range</th>
            <th>Target/Effect/Area</th>
            <th>Duration</th>
            <th>Save</th>
            <th>Spell Resistance</th>
            </tr>
          </thead>
          <tbody>                           
            {this.renderCells(spellLevel, filteredSpells)}              
          </tbody>
        </table>
      );
    }
      
    )
  }
  render() {
    return (
      <div style={styles.root}>        
        <h1 style={styles.title}>
          <Link  to="/spells-setup">
            <i style={styles.link} className="fa fa-chevron-left fa-inverse" aria-hidden="true"></i>
          </Link>
          Spells Use          
        </h1>        
        <div style={styles.content}>
          {this.renderSpellTables()}
        </div>        
      </div>
    )
  } 
}

const mapStateToProps = state => {
  return {
    spellClass: state.spells.spellClass,
    spellLevels: mapToArray(state.spellLevels.ids, state.spellLevels.spellLevels),
    selectedSpellLevel: state.spellLevels.selectedSpellLevel,
    spellLevelsMap: state.spellLevels.spellLevels,
    spells: mapToArray(state.spells.ids, state.spells.spells)
            .filter(spell=> spell.level.includes(state.spells.spellClass)),
    spellMetaDatas: state.spellMetaDatas.spellMetaDatas,
    totalAllowedSpells: state.spellLevels.spellLevels[state.spellLevels.selectedSpellLevel].numOfSpells,
    totalPreparedSpells: state.spellLevels.spellLevels[state.spellLevels.selectedSpellLevel].totalPrepared
  };
}

const mapDispatchToProps = dispatch => {
  return {        
    onDestroy: () => dispatch(SpellsActions.storeAll()),    
    castSpellClicked: (spell) => dispatch(SpellMetaDatasActions.updateSpellMetaData(spell.name, {...spell.metaData, remainingUses: (spell.metaData.remainingUses - 1)}))    
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SpellsUse);