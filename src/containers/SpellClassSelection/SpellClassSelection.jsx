import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Background from './../../assets/book-cover.svg';
import * as SpellsActions from './../../stores/spells/SpellsActions';
import SpellClassEnum from '../../model/SpellClassEnum';

const styles = {
  root: {
    backgroundColor: '#007bff',
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
    flex: '1 1 auto',
    background: `url(${Background}) no-repeat 0 30%`,
    backgroundSize: '100%',
    backgroundColor: '#007bff'
  }
}
let firstLoad = true;

class SpellClassSelection extends Component {

  componentWillMount () {
    if (firstLoad){
      console.log(this.props); 
      this.props.onInit();
      firstLoad = false;
    }    
  }

  render() {
    return (
      <div style={styles.root}>        
        <h1 style={styles.title}>Spell Class <Link to="/spells-per-day"><i className="fas fa-chevron-circle-right fa-inverse" aria-hidden="true"></i></Link></h1>
        <div style={styles.content}>
          <select className="custom-select" value={this.props.spellClass} onChange={this.props.onChange}>
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
    onChange: (event) => dispatch(SpellsActions.setSpellClass(event.target.value))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SpellClassSelection);