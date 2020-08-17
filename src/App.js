import React , { useState , useEffect  } from 'react';
import {Line ,  Pie , Bar } from "react-chartjs-2";
import './App.css';
import World from './Component/World.js' ;


var request = require('request');


// fetching data from covid API .



const App = ()=> { 
	// state for world data : 
	const [worldState , setworldState]= useState ({ 
		Total: [ 
			{
			 TotalConfirmed : null ,
		     TotalDeaths : null , 
		     TotalRecovered : null 	}
		
		       ]
			
	})
	 const [indiaState , setindiaState ] = useState ({
		 condition : false 
	 }) 
	 
	
	 
	// function to fetch data and set it to new state : 
   
   		const FetchApi = ()=> {
		// console.log('Click ')
		if(worldState.Total[0].TotalRecovered=== null ) 
		{

		request('https://api.covid19api.com/summary', function(err, res, body ){
		  if (!err && res.statusCode === 200 ) 
		  var Data=JSON.parse(body);
		 //console.log(Data.Global.TotalConfirmed )
		  setworldState  ({
				Total : [
							{ 
							TotalConfirmed : Data.Global.TotalConfirmed ,
		     				TotalDeaths : Data.Global.TotalDeaths , 
		     				TotalRecovered : Data.Global.TotalRecovered   
							} 
							
						  ]
						            })
			
		}
			   )}
		else 
			{
				setworldState  ({
				Total : [
							{ 
							TotalConfirmed : null ,
		     				TotalDeaths :  null  , 
		     				TotalRecovered : null  
							} 
							
						  ]
						            })
			}
		
		// for states 
			}
	
		const IndiaFetchApi =() => {
			let stateTotal = []
			let stateActive = []
			let StateConfirmed = [] ;
			let StateDeaths = [] ;
			let StateRecovered = [] ;
			
			request('https://api.covid19india.org/data.json', function(err, res, body ){
		       if (!err && res.statusCode === 200 ) 
				  var Data=JSON.parse(body);
				  for (var i = 1; i < 36; i++)
					  {  
						  stateTotal[i-1]=Data.statewise[i].state
						  stateActive[i-1]=Data.statewise[i].active
						  StateConfirmed[i-1]=Data.statewise[i].confirmed
						  StateDeaths[i-1]=Data.statewise[i].deaths
						  StateRecovered[i-1]=Data.statewise[i].recovered
						  
					  }  
				
					 
				})
			console.log(stateTotal)
			console.log(stateActive)
		 if (indiaState.condition) {
			 setindiaState ({
			 
		 labels: stateTotal,
		  datasets: [
			{
			  label: "Statewise Active Cases ",
			  data: stateActive,
			  fill: true,
	          backgroundColor : "#00BFFF"
		
			} , 
			  {
			  label: "Statewise Confirmed Cases ",
			  data: StateConfirmed,
			  fill: true,
	          backgroundColor : "#DB4437",
			  borderColor: "black "  

				    
			  } ,
			  {
			  label: "Statewise Deaths Cases ",
			  data: StateDeaths,
			  fill: true,
	          backgroundColor : "#FF0000",
			  borderColor: "black " 
			
			  } ,
			  {
			  label: "Statewise Recovered Cases ",
			  data: StateRecovered,
			  fill: true,
	          backgroundColor : "#32CD32"
			  }  
		  ] ,
			condition : false 
						   }) 
		 }
	    else {
			setindiaState ({
				labels : null , 
				datasets : null , 
				 condition : true 
			              })
		}
		 }
		
	 useEffect(()=> {
		  IndiaFetchApi() ;
			} , []) 
			
	 let selectButton = null ;
	 if(worldState.Total[0].TotalConfirmed=== null ){
		 selectButton = (
		 <button className='btn btn-outline-warning btn-sm' onClick = {FetchApi}>See the Data </button>     			 
		 )
		 
	 }
	 else 
		 {
			 selectButton = (
			<button className='btn btn-outline-warning btn-sm ' onClick = {FetchApi}> Close the Data </button> 
		 )}
	 
	 
	 
  return (
    <div className="App">
      	<header className="App-header">
        	<img src='https://www.missionbreakout.london/public/img/big/covidlogo.jpg' className="App-logo" alt="logo" /> 
	  	</header>
		  <br/>
		  <br/>
		<div className='bg-light'>
			<World Confirmed ={worldState.Total[0].TotalConfirmed} Deaths={worldState.Total[0].TotalDeaths } Recovered={worldState.Total[0].TotalRecovered} /> 
			  <br/>
			  {selectButton} 
			  <br/>
			  <br/>
		  </div>
		    <br/>
			  <br/>
		  <div id='chart' className='bg-light'>
			      <br/>
			  <h1> India's statistics </h1> 
			  <br/>
			  <button onClick = {IndiaFetchApi}
				  class="btn btn-outline-info btn-sm"> ON and OFF the data   </button>
			      <br/>
			      <br/>  
			    <div className='container'>
			  		<Bar data={indiaState}/>
			  </div>
			      <br/>
			      <br/>
			  
			 
				  
		  </div>	
		   <footer>
				  Trademark by Dhiraj Thakre 
			  </footer>
		  	  
    </div>	 
  );
}

export default App;


/* */
