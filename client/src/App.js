import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);

  const [employeeeList, setEmployeeList] = useState([]); //for display
  const [newwage, setnewWage] = useState(0);


  const addEmployee = () => {
    Axios.post("http://localhost:3001/create", {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage,
    }).then(() => {
      getEmployee();
      console.log("success");
    })
  };


  const getEmployee = () => {
    Axios.get("http://localhost:3001/employee", {

    }).then((response) => {
      setEmployeeList(response.data);//setting array to list
    })
  };
  // const displayInfo = () => {
  //   console.log(name + age + country + position + wage);
  // };

  const updateWage = (id) => {
    Axios.put("http://localhost:3001/update", {
      
      wage: newwage,id: id,
    }).then((response) => {
      alert("updated")
      console.log("updated");
      getEmployee();
    })
  }

  const deleteEmp = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`, {
      
     
    }).then((response) => {
      alert("deleted")
      console.log("deleted");
      getEmployee();
    })
  }

  return (
    <div className="App">
      <div><hr /></div>
      <div className="information">
        <label>Name</label>
        <input
          type="text"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <label>Age</label>
        <input
          type="text"
          onChange={(e) => {
            setAge(e.target.value);
          }}
        />
        <label htmlFor="country">Country</label>
        <input
          type="text"
          onChange={(e) => {
            setCountry(e.target.value);
          }}
        />
        <label>Position</label>
        <input
          type="text"
          onChange={(e) => {
            setPosition(e.target.value);
          }}
        />
        <label>Wage</label>
        <input
          type="text"
          onChange={(e) => {
            setWage(e.target.value);
          }}
        />
        <button onClick={addEmployee}>Add Employee</button>
      </div>
      <div><hr /></div>
      <div className="employee">
        <button onClick={getEmployee}>Show Employee</button>
        {
          employeeeList.map((val, key) => {
            return (
              <div className="showEmp">
                <div className="individualData">
                  <h3>Name: {val.name}</h3>
                  <h3>Age: {val.age}</h3>
                  <h3>Country: {val.country}</h3>
                  <h3>Position: {val.position}</h3>
                  <h3>Wage: {val.wage}</h3>
                  <div className="update">
                    <input type="text" placeholder="2000..." className="inputWage"  onChange={(e) => {
            setnewWage(e.target.value);
          }}/>
                 

.
                    <button onClick={()=>{updateWage(val.id)}}>Update Wage</button>
                    <button onClick={()=>{deleteEmp(val.id)}}>Delete</button>


                  </div>
                </div>

              </div>
            )
          })
        }

      </div>


    </div>
  );
}

export default App;
