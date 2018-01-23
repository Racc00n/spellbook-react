import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

// import Layout from './hoc/Layout/Layout';
import SpellClassSelection from './containers/SpellClassSelection/SpellClassSelection';
import SpellsPerDay from './containers/SpellsPerDay/SpellsPerDay';
import SpellsSetup from './containers/SpellsSetup/SpellsSetup';
import SpellsUse from './containers/SpellsUse/SpellsUse';

class App extends Component {
 
  render () {
    return (
      <div>        
          <Switch>
            <Route path="/spell-class-selection" component={SpellClassSelection} />
            <Route path="/spells-per-day" component={SpellsPerDay} />            
            <Route path="/spells-setup" component={SpellsSetup} />
            <Route path="/spells-use" component={SpellsUse} />
            <Route path="/" exact  component={SpellClassSelection} />            
          </Switch>        
      </div>
    );
  }
}
export default App;