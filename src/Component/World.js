import React from 'react';

    const World = (data)=>
	{
		return (	
		
		<div className='container '>
				<br/>
		        <br/>
				<h1> Worldwide Statistics </h1>
				<br/>
			
			<table className="table table-bordered">
				<thead className="thead-dark">
				<tr>
					  <th scope="col">Total Cases</th>
					  <th scope="col">Total Deaths</th>
					  <th scope="col">Total Recovered</th>
				</tr>
				</thead>
				<tbody>
				<tr>
					  <td>{data.Confirmed}</td>
					  <td>{data.Deaths}</td>
					  <td>{data.Recovered}</td>
				</tr>
				</tbody>
				
			</table>
	
		</div>
		)
	}
	
	export default World ; 