// Your code here

function createEmployeeRecord(empInfo) {
    const emp = {
        firstName: empInfo[0], 
        familyName: empInfo[1], 
        title: empInfo[2], 
        payPerHour: empInfo[3],
        timeInEvents: [], 
        timeOutEvents: [] 
    }
    return emp
}

function createEmployeeRecords(emps) {
    let newEmps = [] 
    for (let i=0; i < emps.length; i++) {
        let newEmp = createEmployeeRecord(emps[i])
        newEmps.push(newEmp)
    }
    return newEmps
}

function createTimeInEvent(employee, dateNTime) {
    let times = employee.timeInEvents 
    let timeSplit = dateNTime.split(" ")
    let timeIn = {
        type: "TimeIn", 
        date: timeSplit[0],
        hour: parseInt(timeSplit[1])
    }
    times.push(timeIn)

    return employee
}

function createTimeOutEvent(employee, dateNTime) {
    let times = employee.timeOutEvents 
    let timeSplit = dateNTime.split(" ") 
    let timeOut = {
        type: "TimeOut", 
        date: timeSplit[0], 
        hour: parseInt(timeSplit[1])
    }
    times.push(timeOut) 

    return employee 
}

function hoursWorkedOnDate(emp, date) {
    let timeIn = emp.timeInEvents.find(function(event) {
        return event.date === date
    })

    let timeOut = emp.timeOutEvents.find(function(event) {
        return event.date === date
    })
    return (timeOut.hour - timeIn.hour)/100
}

function wagesEarnedOnDate(emp, date) {
    let hours = hoursWorkedOnDate(emp, date) 
    return (emp.payPerHour * hours)
}
const reducer = (accum, currVal) => accum + currVal

function allWagesFor(emp) {
    const allDates = emp.timeInEvents.map(el => el.date)
    let total = []
    for (let i=0; i < allDates.length; i++) {
        let amount = wagesEarnedOnDate(emp, allDates[i])
        total.push(amount)
    }
  return total.reduce(reducer, 0)
}

function calculatePayroll(emps) {
    let amount = [] 

    for (let i=0; i < emps.length; i++) {
        let smAmount = allWagesFor(emps[i])
        amount.push(smAmount)
    }
    return amount.reduce(reducer, 0)
}

function findEmployeeByFirstName(emps, empName) {
    return emps.find(rec => rec.firstName === empName)
}