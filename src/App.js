import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

// import Layout from './hoc/Layout/Layout';
import SpellClassSelection from './containers/SpellClassSelection/SpellClassSelection';
import SpellsPerDay from './containers/SpellsPerDay/SpellsPerDay';
import SpellsSetup from './containers/SpellsSetup/SpellsSetup';
import SpellsUse from './containers/SpellsUse/SpellsUse';

class App extends Component {
  _firstLoad = true;
  firstLoad() {
    if (this._firstLoad){
      this._firstLoad = false;  
      return true;
    }
    return false;    
  }

  render () {    
    return (
      <div>
        <Route path="/*" render={() => (
          this.firstLoad() ? (                
            <Redirect to="/"/>
          ) : (
            <Switch>
              <Route path="/spell-class-selection" component={SpellClassSelection} />
              <Route path="/spells-per-day" component={SpellsPerDay} />            
              <Route path="/spells-setup" component={SpellsSetup} />
              <Route path="/spells-use" component={SpellsUse} />   
              <Redirect from="/" exact to="/spell-class-selection"/>
            </Switch>          
          )
        )}/>                                            
      </div>
    );
  }
}
export default App;