import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as SpellsActions from './../../stores/spells/SpellsActions';
import SpellClassEnum from '../../model/SpellClassEnum';

const styles = {
  root: {
    backgroundColor: 'blue',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    textAlign: ' center'
  },
  title: {
    flex: '0 0 auto',
    color: 'white'
  },
  content: {
    flex: '1 1 auto'
  }
}

class SpellClassSelection extends Component {

  componentWillMount () {
    console.log(this.props); 
    this.props.onInit();
  }

  componentWillUnmount() {
    this.props.onDestroy();
  }

  render() {
    return (
      <div style={styles.root}>        
        <h1 style={styles.title}>Spell Class<Link to="/spells-per-day"><i className="fa fa-chevron-right fa-inverse" aria-hidden="true"></i></Link></h1>
        <div style={styles.content}>
          <select value={this.props.spellClass} onChange={this.props.onChange}>
            {this.renderSpellClassOptions()}
          </select>
        </div>        
      </div>
    )
  }  
  renderSpellClassOptions() {
    let result = [];
    for (let item in SpellClassEnum) {
      result.push(<option key={item} value={SpellClassEnum[item]}>{item}</option>)
    }
    return result;
  }
}

const mapStateToProps = state => {
  return {
    spellClass: state.spells.spellClass
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onInit: ()=> dispatch(SpellsActions.fetchSpellClass()),
    onChange: (event) => dispatch(SpellsActions.setSpellClass(event.target.value)),
    onDestroy: () => dispatch(SpellsActions.storeAll())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SpellClassSelection);