import React, {Component} from 'react';
import axios from 'axios'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lastName: '',
      week: '',
      action: '',
      reflection: ''
    }
  }

  handleSubmit = (event) => {
    console.log(this.state)
    event.preventDefault()
    var url = 'https://kskulski-reflection-recorder-api.azurewebsites.net/api/HttpTrigger1'

    if (this.state.action === 'Read') {
      url = url + '?name=' + this.state.lastName + '&week=' + this.state.week
      axios.get(url)
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  handleChange = (event) => {
    event.preventDefault()
    if (event.target.className === 'week') {
      const weekNumber = event.target.value.split(' ')
      this.setState({[event.target.className]: weekNumber[1]})
    } else {
      this.setState({[event.target.className]: event.target.value})
    }
  }

  render() {
    const requestType = ['Read', 'Submit']
    const weeks = new Array(16)
    for (var i = 0; i < weeks.length; i++) {
      weeks[i] = 'Week ' + (i + 1).toString();
    }
    return (
      <div className='App'>
        <form onSubmit = {this.handleSubmit}>
          <h2>Submit a Reflection</h2>
          <label>Last Name:</label>
          <input className='lastName' placeholder='Enter your last name...' onChange={this.handleChange}/>
          <label>Week:</label>
          <select className='week' onChange={this.handleChange}>
            <option value=''>Select the Week</option>
            {weeks.map(c => <option key={c}>{c}</option>)}
          </select>
          <label>Action:</label>
          <select className='action' onChange={this.handleChange}>
            <option value=''>Read or Submit</option>
            {requestType.map(c => <option key={c}>{c}</option>)}
          </select>
          <label>Reflection:</label>
          <input className='reflection' placeholder='Enter your reflection here...' onChange={this.handleChange}/>
          <button type='submit'>Submit</button>
        </form>
      </div>
    )
  }
}

export default App