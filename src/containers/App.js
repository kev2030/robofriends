import React, {Component} from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
//import ErrorBoundary from '../components/ErrorBoundary';
import './App.css';


//Our App component has 2 states: 
//Robots and Searchfield. these states describe the App and can 
//be changed. React uses states to render pass them out the props. 
//we passed down the onSearchChange. 

class App extends Component {

  constructor () {
      super()
      this.state = { 
        robots : [],
        searchfield: ''
    }
  }

  componentDidMount() {
     fetch('https://jsonplaceholder.typicode.com/users')    //here we fetch the users from API.
     .then(response => response.json())                     //Getting the response useing Json
     .then(users => this.setState({ robots : users}));      //getting and updating the users with setState

  }
  onSearchChange= (event) => {
    this.setState({searchfield : event.target.value})
  }

  render () {
      const { robots, searchfield } = this.state;
      const filteredRobots = robots.filter (robots => {
      return robots.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
    })

    return !robots.length ?
    <h1>Loading</h1> :
    (
        <div className ='tc'>
          <h1 className='f1'>RoboFriends</h1>
          <SearchBox searchChange={this.onSearchChange}/>
          <Scroll>
                <CardList robots = {filteredRobots}/>
            </Scroll>
        </div>
        );
    }
  }
  

export default App;

