import React, { Component } from 'react'
import { addRecipe } from '../actions'  // action creator function


// NOTE:  This is demo only code!  This demo's how redux works, but we don't use these low level redux apis
// instead, we use react-redux, which will setup these bindings for us.
class App extends Component {
  state = { calendar: null }

  componentDidMount () {  // in cDM we subscribe to the store with a cb that sets comp'state from app state (via store.getState())
    const { store } = this.props

    store.subscribe(() => {
      this.setState(() => ({
        calendar: store.getState()
      }))
    })
  }

  submitFood = () => {
    this.props.store.dispatch(addRecipe({  // giving addRecipe action creator an object
      day: 'monday',  // hardcoded
      meal: 'breakfast',  // hardcoded
      recipe: {
        label: this.input.value  // recipe.label = this.input.value  (using ref callback setup)
      }  // this action object is used by the addRecipe reducer to create the next state of the app store.
    }))

    this.input.value = ''
  }

  render() {
    return (
      <div>
        {/* ref is a reference to the dom el; cb will be called with reference, and here we set the el as a 
        property of the class, ie this.input;  see in submitFood we now have this.input.value available */}
        <input type='text'
          ref={(input) => this.input = input}  
          placeholder="Monday's Breakfast"
        />
        <button onClick={this.submitFood}>Submit</button>

        <pre>
          Monday's Breakfast: {this.state.calendar && this.state.calendar.monday.breakfast}
        </pre>
      </div>
    );
  }
}

export default App
