import React, { useState } from 'react';
import AllData from './components/AllData.jsx'
import User from './components/User.jsx'
import Security from './components/Security.jsx'

function App() {
	//общая база всех заявок (одна заявка добавлена для удобства тестирования)
	const [data, setData] = useState([{
		n1: "11.11.1111",
		n2: "№A0000001",
		n3: "Иванов Иван Иванович",
		n4: "разовый",
		n5: "1 час",
		n6: "OOO Рога и Копыта",
		n7: "X000XX 00",
		n8: "Audi A6",
		n9: "Михаил Б.",
		n10: "Сергей А.",
		n11: "+7 (999) 999 99 99",
	}]);
	//общие настройки приложения для наглядности и удобства
	const [lk, setLk] = useState({
		access: 'admin',
		security: 'Агент 007' //логин из ЛК
	});
	//временное хранилище номера заявки для ее открытия и редактирования
	const [find, setFined] = useState(null);

	//функция добавления новой заявки из User.jsx
	function addData(user) {
		setData(prev => {
			return [...prev, user]
		})
	}

	//функция изменения вносимых данных из Security.jsx
	function changeData(thisdata) {
		var array = []; //временный массив
		//проходим по всем данным базе заявок
		data.forEach(found => {
			//находим нашу заявку и заменяем ее новой
			if(found.n2 === thisdata.n2) {
				array.push(thisdata);
			} else {
				array.push(found); //добавляем в массив остальные заявки
			}
		});
		//перезаписываем стейт с общей базой заявок
		setData(array);
	}

	//открываем заявку с полученным номером из AllData.js
	function openData(n2) {
		setFined(() => n2);
	}

	//закрываем все попапы (при вызове)
	function closePopup(yes) {
		yes && setFined(null)
	}

	return (
		<div className="app">

			<div className='propusk focus absolute'>
				<button type="button" className={lk.access === 'admin' ? 'active' : ''} onClick={()=>setLk(p=>{return{...p, access: 'admin'}})} >СБ</button>
				<button type="button" className={lk.access === 'user' ? 'active' : ''} onClick={()=>setLk(p=>{return{...p, access: 'user'}})} >Пользователь</button>
			</div>

			{lk.access === 'user' &&
				<User onSubmit={addData} onBack={()=>setLk(p=>{return{...p, access: 'admin'}})}/>
			}

			{lk.access === 'admin' && (
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
						found.n2 === find && <Security key={index} data={found} status={found.status} security={lk.security} onClose={closePopup} onAdd={changeData} />
					)
				})
			)}

		</div>
	);
}

export default App;