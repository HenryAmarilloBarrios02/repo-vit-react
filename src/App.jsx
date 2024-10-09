import { useState, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { getData } from './libs/api'

function App() {
  // const [count, setCount] = useState(0)

  const [apiData, setApiData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData('finalData')

        data.scoopPitConnection.forEach(element => {
          //pushear una variable
          element.dateStart = new Date(element.timestampStart * 1000)
          element.dateEnd = new Date(element.timestampEnd * 1000)
        });

        console.log(data)

        setApiData(data)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)  // Finaliza el estado de carga
      }
    }

    fetchData()
  }, []) // [] para que solo se ejecute una vez al montar el componente

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          {/* <img src={viteLogo} className="logo" alt="Vite logo" /> */}
        </a>
        <a href="https://react.dev" target="_blank">
          {/* <img src={reactLogo} className="logo react" alt="React logo" /> */}
        </a>
      </div>
      <h1>TRACKING</h1>
      <div className="card">
        <h2>Lista de vehículos</h2>
        <table border="1">
          <thead>
            <tr>
              <th>MAC</th>
              <th>Timestamp Start</th>
              <th>Timestamp End</th>
              <th>Hora Conexion</th>
              <th>Hora Desconexion</th>
              <th>Diff</th>
            </tr>
          </thead>
          <tbody>
            {apiData?.scoopPitConnection?.map((item, index) => (
              <tr key={index}>
                <td>{item.mac_tajo}</td>
                <td>{item.timestampStart}</td>
                <td>{item.timestampEnd}</td>
                {/* <td>{item.dateStart}</td> */}
                {/* <td>{item.dateEnd}</td> */}
                <td>{item.diff}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default App
