import React from 'react';
    const World = (data)=>
	{
		return (	
		
		<div className='container '>
				<br/>
				<h1> Worldwide Statistics </h1>
				<br/>
			
			<table className="table table-bordered">
				<thead >
				<tr>
					  <th className='text-info' scope="col">Total Cases</th>
					  <th className='text-danger'scope="col">Total Deaths</th>
					  <th className='text-success' scope="col">Total Recovered</th>
				</tr>
				</thead>
				<tbody>
				<tr>
					  <td className='text-info' >{data.Confirmed}</td>
					  <td className='text-danger' >{data.Deaths}</td>
					  <td className='text-success' >{data.Recovered}</td>
				</tr>
				</tbody>
				
			</table>
	
		</div>
		)
	}
	
	export default World ; 