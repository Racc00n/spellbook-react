import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as SpellsActions from './../../stores/spells/SpellsActions';
import * as SpellLevelsActions from './../../stores/spellLevels/SpellLevelsActions';
import { mapToArray } from '../../utils/utils';
import NumberPicker from './../../components/NumberPicker/NumberPicker';

const styles = {
  root: {
    // backgroundColor: 'blue',
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
    // color: 'white'
  },
  content: {
    flex: '1 1 auto',
    alignSelf: 'center'
  }
}

class SpellsPerDay extends Component {

  componentWillUnmount() {
    this.props.onDestroy();
  }
  
  renderHeaders() {
    return this.props.spellLevels.map(spellLevel => <th key={spellLevel.label}>{spellLevel.label}</th>);
  }

  renderCells() {
    return this.props.spellLevels.map(spellLevel => {
      return (
        <td key={spellLevel.label}>
          <NumberPicker
          min={0}
          max={30}
          value={spellLevel.numOfSpells}
          change={this.props.onChange.bind(this, spellLevel)}
          />  
        </td>
      );
    });
  }

  render() {
    return (
      <div style={styles.root}>        
        <h1 style={styles.title}>
          <Link  to="/spell-class-selection">
            <i style={styles.link} className="fa fa-chevron-left fa-inverse" aria-hidden="true"></i>
          </Link>
          Spells Per Day
          <Link  to="/spells-setup">
            <i style={styles.link} className="fa fa-chevron-right fa-inverse" aria-hidden="true"></i>
          </Link>
        </h1>
        <div style={styles.content}>
          <table className="table">
            <thead>
              <tr className="thead-light">
                <th>Level</th>
                {this.renderHeaders()}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Spells</td>
                {this.renderCells()}
              </tr>
            </tbody>
          </table>
        </div>        
      </div>
    )
  } 
}

const mapStateToProps = state => {
  return {
    spellLevels: mapToArray(state.spellLevels.ids, state.spellLevels.spellLevels)    
  };
}

const mapDispatchToProps = dispatch => {
  return {
    // onInit: ()=> dispatch(SpellsActions.fetchSpellClass()),
    onChange: (spellLevel, value) => dispatch(SpellLevelsActions.updateSpellLevel(spellLevel.label, {numOfSpells: value})),
    onDestroy: () => dispatch(SpellsActions.storeAll())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SpellsPerDay);