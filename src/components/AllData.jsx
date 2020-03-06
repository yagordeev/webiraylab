import React from 'react';


function AllData(props) {

	function sendN2() {
		props.onClick(props.order)
	}

	return (
		<div className="databox" onClick={sendN2}>
			<div className="groupe">{props.name}</div>
			<div className="groupe">{props.auto}</div>
			<div className="groupe">{props.number}</div>
			{props.status
				?
					<div className="groupe" style={{'color': props.status === 'Одобрено' && props.status !== null ? 'green' : 'red'}}>{props.status}</div>
				:
				<div className="groupe" style={{'color': 'blue'}}>В рассмотрении</div>
			}

		</div>
	)
}

export default AllData;