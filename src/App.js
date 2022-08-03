import React, { useState, useEffect } from 'react';
import './App.css';
import MaterialTable from '@material-table/core'


function App() {
  const url = "https://michegwwe.herokuapp.com/students"
  const [data, setData] = useState([])
  useEffect(() => {
    getStudents()
  }, [])

  const getStudents = () => {
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
      title: "mobile-no", field: "hired-date",
      validate: rowData => rowData.year === undefined || rowData.year === "" ? "Required" : true
    },
    {
      title: "Salary", field: 'fee',
      validate: rowData => rowData.fee === undefined || rowData.fee === "" ? "Required" : true
    },
    {
      title: "Department", field: 'fee',
      validate: rowData => rowData.fee === undefined || rowData.fee === "" ? "Required" : true
    },
    {
      title: "image-url", field: 'fee',
      validate: rowData => rowData.fee === undefined || rowData.fee === "" ? "Required" : true
    },
    {
      title: "Hired-date", field: 'fee',
      validate: rowData => rowData.fee === undefined || rowData.fee === "" ? "Required" : true
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
                getStudents()
                resolve()
              })
          }),
          onRowUpdate: (newData, oldData) => new Promise((resolve, reject) => {
            fetch(url + "/" + oldData.id, {
              method: "PUT",
              headers: {
                'Content-type': "application/json"
              },
              body: JSON.stringify(newData)
            }).then(resp => resp.json())
              .then(resp => {
                getStudents()
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
                getStudents()
                resolve()
              })
          })
        }}
      />
    </div>
  );
}

export default App;