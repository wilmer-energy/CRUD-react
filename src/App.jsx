import { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import axios from 'axios'
import UsersList from './components/UsersList'
import UsersForm from './components/UsersForm'



function App() {

  const [users, setUsers] = useState([])
  const [itemSelected,setItemSelected]=useState(null)

  useEffect(() => {
    axios.get("http://localhost:4000/api/v1/users")
      .then((res) => {
        setUsers(res.data.data.users)
        console.log(res.data.data.users);
      })
      .catch(function(error) {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
      });
  }, [])

  const refresh =function(){
    axios.get("http://localhost:4000/api/v1/users")
      .then((res) => {
      setUsers(res.data.data.users)
      })
      .catch(function(error) {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
      });
  }
  const update = function (itemForUpdate) {
    setItemSelected(itemForUpdate)
  }

  return (
    <div className="App">
      <UsersForm itemForUpdate={itemSelected} />
      <div className='list'>
      {users.map(e => {
        return (<UsersList key={e.id} user={e} update={update} refresh={refresh}/>)
      })}
      </div>
      

    </div>
  )
}

export default App
