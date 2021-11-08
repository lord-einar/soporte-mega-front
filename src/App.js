import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import './App.css';
import Sede from './components/sede';

function App() {

  let sedes = [
    {
      sede: "Prueba",
      ip: "192.168.150.45"
    },
    {
      sede: "La imprenta",
      ip: "192.168.104.10"
    },
    {
      sede: "Caballito",
      ip: "192.168.110.10"
    },
    {
      sede: "Caballito 2",
      ip: "192.168.116.10"
    }
  ]

  const [resp, setResp] = useState({codigo: 0, msg:'Estado del servicio'})
  const [ipSede, setIpSede] = useState('00')
  
  const comandos = async(cmd, sede) => {
    await fetch(`http://localhost:8080/${sede}/${cmd}`)
      .then(data => data.json())
      .then(data => {
        console.log(data)
        setResp(data)
      })

  }

  const capturaSede = (e) => {
    if(e.target.value !==0)
    setIpSede(e.target.value)
  }

  
  useEffect(() => {
    console.log(resp.codigo)
    if(resp.codigo == 2 || resp.codigo == 3) {
      comandos('interrogate', ipSede)
    }

  }, [resp])


  return (
    <div className="App">
        <h1>Soporte Megatlon</h1>
        <hr />
        <select name='sucursal' onChange={capturaSede}>
          <option value='0'>Seleccionar sede</option>
          {
            sedes.map(sede => {
              return (
              <option value={sede.ip}>{sede.sede}</option>
            )})
          }
        </select>
      <button onClick={() => comandos('interrogate', ipSede)}>Estado</button>
      <button onClick={() => comandos('start', ipSede)}>Iniciar</button>
      <button onClick={() => comandos('stop', ipSede)}>Detener</button>

      <h2>{resp.msg}</h2>
      <h4>{resp.codigo}</h4>
      <h4>{ipSede}</h4>

      <Sede></Sede>
    </div>
  );
}

export default App;
