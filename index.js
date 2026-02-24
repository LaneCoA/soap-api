// creates server
const express = require('express')
//use a library call node-soap
const soap = require('soap')
const fs = require('fs')

const app = express()

const service = {
  EmployeeService: {
    EmployeePort: {
      getEmployee: function(args) {
        if (args.id === "1"){
          return {
          id: args.id,
          name: "Cecilia Cortez",
          role: "QA Engineer"
          }
        }
        throw {
          Fault: {
          faultcode: "Client",
          faultstring: "Employee not found"
          }
        }
      }
    }
  }
}
//read the file employee.wsdl
const xml = fs.readFileSync('employee.wsdl', 'utf8')
// start the SOAP service at:
app.listen(8000, function() {
  soap.listen(app, '/employee', service, xml)
  console.log('SOAP API running on http://localhost:8000/employee?wsdl')
})