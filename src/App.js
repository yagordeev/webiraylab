import React, { useState } from 'react';
import AllData from './components/AllData.jsx'
import User from './components/User.jsx'
import Security from './components/Security.jsx'

function App() {
	const [data, setData] = useState([{
		n1: "11.11.1111",
		n2: "№A0000001",
		n3: "Иванов Иван Иванович",
		n4: "разовый",
		n5: "1 час",
		n6: "OOO IP",
		n7: "X000XX 00",
		n8: "Audi A6",
		n9: "Ivan",
		n10: "Navi",
		n11: "+7 (999) 999 99 99",
	}]);
	const [sb, setSb] = useState({
		access: 'admin',
		security: 'Агент 007'
	});
	const [find, setFined] = useState(null);

	function addData(user) {
		setData(prev => {
			return [
				...prev,
				user
			]
		})
	}

	function changeData(thisdata) {
		var array = [];
		data.forEach(found => {
			if(found.n2 === thisdata.n2) {
				array.push(thisdata);
			} else {
				array.push(found);
			}
		});
		setData(array);
	}

	function openData(n2) {
		setFined(() => n2);
	}

	function closePopup(yes) {
		yes && setFined(null)
	}

	return (
		<div className="app">

			<div className='propusk focus absolute'>
				<button type="button" className={sb.access === 'admin' ? 'active' : ''} onClick={()=>setSb(p=>{return{...p, access: 'admin'}})} >СБ</button>
				<button type="button" className={sb.access === 'user' ? 'active' : ''} onClick={()=>setSb(p=>{return{...p, access: 'user'}})} >Пользователь</button>
			</div>

			{sb.access === 'user' &&
				<User onSubmit={addData} onBack={()=>setSb(p=>{return{...p, access: 'admin'}})}/>
			}

			{sb.access === 'admin' && (
				<div className="data">
					{data.map((found, index) => {
						return (
							<AllData
								key={index}
								name={found.n3}
								auto={found.n8}
								number={found.n7}
								order={found.n2}
								status={found.status}
								onClick={openData}
							/>
						)

					})}
				</div>
			)}

			{setFined && (
				data.map((found, index) => {
					return(
						found.n2 === find && <Security key={index} data={found} status={found.status} security={sb.security} onClose={closePopup} onAdd={changeData} />
					)
				})
			)}

		</div>
	);
}

export default App;