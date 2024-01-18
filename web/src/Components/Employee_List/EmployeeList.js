import React, { useState, useEffect } from 'react'
import Button from '../UI/Button/Button'

function EmployeeList() {
	const [employeeList, setEmployeeList] = useState([])
	useEffect(() => {
		fetch('/admin/get-employee-list')
			.then((_promise) => {
				return _promise.json()
			})
			.then(({data: _empList}) => {
				console.log(_empList)
				setEmployeeList(_empList)
			})
			.catch((_err) => {
				console.log(_err.message, 'err')
			})
	}, [])

	function deleteEmployeeHandler(empId){
		fetch('/admin/delete-employee',{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({empId})
		})
			.then(_promise=>{
				return _promise.json()
			}).then(_deleteEmployeeResult=>{
				console.log(_deleteEmployeeResult)
			}).catch(_err=>{
				console.log(_err.message, 'err')
			})
	}

	return (
		<>
			<table>
				<thead>
					<tr>
						<th>Emp Id</th>
						<th>Emp Name</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>
					{employeeList?.map((_employee) => {
						return (
							<tr key={_employee.empId}>
								<td>{_employee.empId}</td>
								<td>{_employee.empName}</td>
								<td>
									<Button onClick={deleteEmployeeHandler.bind(null, _employee.empId)}>X</Button>
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</>
	)
}

export default EmployeeList
