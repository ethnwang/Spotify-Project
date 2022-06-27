import React, {useState, useEffect} from 'react'

function App() {
  const [songs, setSongs] = useState(null)
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/getTracks");
      const newData = await response.json();
      setSongs(newData);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>The number of your saved songs!</h1>

      {(typeof songs === 'undefined') ? (
        <p>Loading...</p>
      ) : (
        <p>{songs}</p>
      )}


    </div>
  )
}

export default App