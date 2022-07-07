import React, {Component} from 'react'
import './App.css'
class App extends Component{

  constructor(){
    super()
    this.state = { songs: 0};
  }

  componentDidMount(){
    fetch('./getTracks')
      .then((response) => {
        if(!response.ok) throw Error(response.statusText);
        return response.json()
      })
      .then((data) => {
        this.setState({
          songs: data
        });
      })
  }

  render() {

    const {songs} = this.state

    return (
      <div class="info">
        {/* <i id="spotify" class="fab fa-spotify fa-2x"></i> */}
        <h1>The number of your saved songs!</h1>
        <p>{songs}</p>
      </div>
    )
  }
}

export default App