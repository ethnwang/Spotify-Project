import React, {useState, useEffect, Component} from 'react'
import './App.css'

function SavedSongs() {
  const [songs, setSongs] = useState(null)
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/getTracks");
      const newData = await response.json();
      setSongs(newData);
    };

    fetchData();
  }, []);
  return songs
}
class App extends Component{
  render() {
    return (
      <body>
      <div class="info">
        {/* <i id="spotify" class="fab fa-spotify fa-2x"></i> */}
        <h1>The number of your saved songs!</h1>
        {(typeof songs === 'undefined') ? (
          <p>Loading...</p>
        ) : (
          <p>{SavedSongs()}</p>
        )}
      </div>

      </body>
    )
  }
}

export default App