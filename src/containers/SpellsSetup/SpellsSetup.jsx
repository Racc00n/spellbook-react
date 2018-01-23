import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as SpellsActions from './../../stores/spells/SpellsActions';
import * as SpellLevelsActions from './../../stores/spellLevels/SpellLevelsActions';
import * as SpellMetaDatasActions from './../../stores/spellMetaDatas/SpellMetaDatasActions';
import { mapToArray } from '../../utils/utils';
import NumberPicker from './../../components/NumberPicker/NumberPicker';
import MoreDetail from './../../components/MoreDetail/MoreDetail';

const styles = {
  root: {    
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    textAlign: ' center'
  },
  link: {
    color: '#007bff'
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
    color: '#007bff'
  },
  alert: {
    position: 'fixed',
    bottom: 0,
    right: 0,
    left: 0,
    margin: 0
  }
}

class SpellsSetup extends Component { 
  state = {
    isReplenishClicked: false
  }
  renderCells() {
    return this.props.spells.map(spell=> {
      return (
        <tr key={spell.name}>
          <td>
            <NumberPicker
              min={0}
              max={this.props.totalAllowedSpells-
                  this.props.totalPreparedSpells +
                  spell.metaData.preparedUses}
              value={spell.metaData.preparedUses}
              change={this.props.onSpellPreparedUsesChange.bind(
                        this,
                        spell,
                        this.props.spellLevelsMap[this.props.selectedSpellLevel])}
              disabled={!spell.metaData.known}
            />  
          </td>
          <td>
            <input style={styles.known} type="checkbox" checked={spell.metaData.known}
              onChange={this.props.onSpellKnownChange.bind(this, spell)} />
            {/* <i className={spell.metaData.known ? 'fas fa-2x fa-check-square' : 'far fa-2x fa-square'}/> */}
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
  
  renderSpellLevels() {
    return this.props.spellLevels.map( spellLevel => {
      return (
        <option key={spellLevel.label}
                value={spellLevel.label}>{spellLevel.label}</option>
      );
    });    
  }
  
  renderReplenishAlert() {
    if (this.state.isReplenishClicked){
      return  <div style={styles.alert} className="alert alert-success" role="alert">All your spells have been replenished</div>    
    } else {
      return [];
    }    
  }

  onReplenishClicked() {
    this.setState({isReplenishClicked: true});      
    setTimeout(()=> {
      this.setState({isReplenishClicked: false});
    }, 1500);
    this.props.onReplenishClicked();    
  }
  
  render() {
    return (
      <div style={styles.root}>        
        <h1 style={styles.title}>
          <Link  to="/spells-per-day">
            <i style={styles.link} className="fa fa-chevron-left fa-inverse" aria-hidden="true"></i>
          </Link>
          Spells Setup
          <Link  to="/spells-use">
            <i style={styles.link} className="fa fa-chevron-right fa-inverse" aria-hidden="true"></i>
          </Link>
        </h1>
        <div className="spell-controls">
          <label>Spell Level ({this.props.totalPreparedSpells}/{this.props.totalAllowedSpells})</label>
          <select className="custom-select" value={this.props.selectedSpellLevel} onChange={this.props.onSpellLevelChange}>              
            {this.renderSpellLevels()}
          </select>
          <button 
            className="btn btn-success"
            onClick={this.onReplenishClicked.bind(this)} 
            disabled={this.state.isReplenishClicked}
            >Replenish</button>
        </div>
        <div style={styles.content}>
          <table className="table">
            <thead>
              <tr className="thead-light">
              <th>Uses</th>
              <th>Known</th>
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
              {this.renderCells()}              
            </tbody>
          </table>
        </div>
        {this.renderReplenishAlert()}
      </div>
    )
  } 
}

const mapStateToProps = state => {
  return {
    spellLevels: mapToArray(state.spellLevels.ids, state.spellLevels.spellLevels),
    selectedSpellLevel: state.spellLevels.selectedSpellLevel,
    spellLevelsMap: state.spellLevels.spellLevels,
    spells: mapToArray(state.spells.ids, state.spells.spells)
            .filter(spell=> spell.level.includes(state.spells.spellClass +' '+ state.spellLevels.selectedSpellLevel)),
    spellMetaDatas: state.spellMetaDatas.spellMetaDatas,
    totalAllowedSpells: state.spellLevels.spellLevels[state.spellLevels.selectedSpellLevel].numOfSpells,
    totalPreparedSpells: state.spellLevels.spellLevels[state.spellLevels.selectedSpellLevel].totalPrepared
  };
}

const mapDispatchToProps = dispatch => {
  return {    
    onSpellLevelChange: (event) => dispatch(SpellLevelsActions.updatedSelectedSpellLevel(event.target.value)),    
    onSpellKnownChange: (spell) => dispatch(SpellMetaDatasActions.updateSpellMetaData(spell.name, {...spell.metaData, known: !spell.metaData.known})),
    onSpellPreparedUsesChange: (spell,spellLevel, value) => {
      dispatch(SpellLevelsActions.updateSpellLevel(spellLevel.label,{ totalPrepared: spellLevel.totalPrepared + (value - spell.metaData.preparedUses) }))
      dispatch(SpellMetaDatasActions.updateSpellMetaData(spell.name, {...spell.metaData, preparedUses: value, remainingUses: value}))
    },
    onReplenishClicked: () => {        
      dispatch(SpellsActions.replenish())
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SpellsSetup);