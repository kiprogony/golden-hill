import React, { useState, useEffect } from 'react';
// import './App.css';
import MaterialTable from '@material-table/core'


function App() {
  const url = "http://localhost:3000/employees"
  const [data, setData] = useState([])
  useEffect(() => {
    getEmployees()
  }, [])

  const getEmployees = () => {
    fetch(url).then(resp => resp.json())
      .then(resp => setData(resp))
  }
  const columns = [
    { title: "Name", field: "name", validate: rowData => rowData.name === undefined || rowData.name === "" ? "Required" : true },
    {
      title: "Email", field: "email",
      validate: rowData => rowData.email === undefined || rowData.email === "" ? "Required" : true
    },
    {
      title: "Mobile-no", field: "mobile-no ",
      validate: rowData => rowData.mobile_no === undefined || rowData.mobile_no === "" ? "Required" : true
    },
    {
      title: "Id_do", field: 'id_no',
      validate: rowData => rowData.id_no === undefined || rowData.id_no === "" ? "Required" : true
    },
    {
      title: "Hired_date", field: 'hired_date',
      validate: rowData => rowData.hired_date === undefined || rowData.hired_date === "" ? "Required" : true
    },
    {
      title: "Department", field: 'department',
      validate: rowData => rowData.department === undefined || rowData.department === "" ? "Required" : true
    },
    {
      title: "Salary", field: 'salary',
      validate: rowData => rowData.salary === undefined || rowData.salary === "" ? "Required" : true
    }
  ]
  return (
    <div className="App">
      <h1 align="center">Golden-Hill-Homestead</h1>
      <h4 align='center'>Our Farm operational system</h4>
      <MaterialTable
        title="Employees Info" 
        columns={columns}
        data={data}
        options={{ actionsColumnIndex: -1, addRowPosition: "first" }}
        editable={{
          onRowAdd: (newData) => new Promise((resolve, reject) => {
            fetch(url, {
              method: "POST",
              headers: {
                'Content-type': "application/json"
              },
              body: JSON.stringify(newData)
            }).then(resp => resp.json())
              .then(resp => {
                getEmployees()
                resolve()
              })
          }),
          onRowUpdate: (newData, oldData) => new Promise((resolve, reject) => {
            fetch(url + "/employees" + oldData.id, {
              method: "PUT",
              headers: {
                'Content-type': "application/json"
              },
              body: JSON.stringify(newData)
            }).then(resp => resp.json())
              .then(resp => {
                getEmployees()
                resolve()
              })
          }),
          onRowDelete: (oldData) => new Promise((resolve, reject) => {
            fetch(url + "/" + oldData.id, {
              method: "DELETE",
              headers: {
                'Content-type': "application/json"
              },

            }).then(resp => resp.json())
              .then(resp => {
                getEmployees()
                resolve()
              })
          })
        }}
      />
    </div>
  );
}

export default App;