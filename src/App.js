import React , { Component } from 'react';
import './App.css';
import World from './Component/World.js'
import Button from 'react-bootstrap/Button';
var request = require('request');


// fetching data from covid API .



class  App extends Component {  
	state= {
		Total: [ 
			{TotalConfirmed : null ,
		     TotalDeaths : null , 
		     TotalRecovered : null 	}
		
		] 
	}

    FetchApi = ()=> {
		if(this.state.Total[0].TotalRecovered=== null ) 
		{

		request('https://api.covid19api.com/summary', function(err, res, body ){
		  if (!err && res.statusCode === 200 ) 
		  var Data=JSON.parse(body);
		  console.log(Data.Global.TotalConfirmed);
		  console.log(Data.Global.TotalDeaths);
		  console.log(Data.Global.TotalRecovered); 
		  this.setState      ({
				Total : [
							{ 
							TotalConfirmed : Data.Global.TotalConfirmed ,
		     				TotalDeaths : Data.Global.TotalDeaths , 
		     				TotalRecovered : Data.Global.TotalRecovered   
							} 
							
						  ]
						            })
			
		}.bind(this)
			   )}
		else 
			{
				this.setState      ({
				Total : [
							{ 
							TotalConfirmed : null ,
		     				TotalDeaths :  null  , 
		     				TotalRecovered : null  
							} 
							
						  ]
						            })
			}
	}
	
 render() {
	 let selectButton = null ;
	 if(this.state.Total[0].TotalConfirmed=== null ){
		 selectButton = (
		 <Button className='btn btn-warning' onClick = {this.FetchApi}>See the Data </Button>     			 
		 )
		 
	 }
	 else 
		 {
			 selectButton = (
			<Button className='btn btn-warning ' onClick = {this.FetchApi}> Close the Data </Button> 
		 )}
	 
	 
	 
  return (
    <div className="App">
      	<header className="App-header">
        	<img src='https://www.missionbreakout.london/public/img/big/covidlogo.jpg' className="App-logo" alt="logo" /> 
	  	</header>
		<World Confirmed ={this.state.Total[0].TotalConfirmed} Deaths={this.state.Total[0].TotalDeaths } Recovered={this.state.Total[0].TotalRecovered} /> 
		  <br/>
		  {selectButton} 
		  
		  
		  <div className='footer'>
			    <br/>
			    <br/>
				<p>  Trademark by Dhiraj Thakre </p>
			    <br/>
			    <br/>
		  </div>
    </div>
	  
	  
	  
	 
  );
} 
}

export default App;
