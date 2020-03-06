import React, { useState, useEffect } from 'react';
import SelectPure from 'select-pure';

//переменная для одностраничной работы функции выбора статуса заявки
var selectStatus = null;

//варианты статуса заявки
const status = [{
		label: "Отказано",
		value: "Отказано",
	},
	{
		label: "Одобрено",
		value: "Одобрено",
	},
]

function User(props) {
	//стейт с данными заявки
	const [user, setUser] = useState({});
	//стейт для отслеживания инициализации причины отказа и вызова попап
	const [reason, setReason] = useState('');

	//срабатывает при первом открытии
	useEffect(() => {
		//переносим данные по этой заявке со страницы App.js в стейт
		setUser(props.data);
		//показываем select выбора статуса заявки, если статус уже установлен
		props.status && statusSelect(props.status)
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	//создам select для выбора статуса заявки (при вызове)
	function statusSelect(thisStatus) {
		selectStatus = new SelectPure("#status", {
			options: status,
			placeholder: thisStatus,
			multiple: false,
			onChange: value => { changeStatus(value); },
			classNames: {
				select: "status",
				dropdownShown: "opened",
				multiselect: "multiple",
				label: "label",
				placeholder: "placeholder",
				dropdown: "options",
				option: "option",
				autocompleteInput: "autocomplete",
				selectedLabel: "selected-label",
				selectedOption: "selected",
				placeholderHidden: "hidden",
				optionHidden: "option--hidden",
			}
		});
	}

	//сохраняем изменения статуса заказа в стейт
	function changeStatus(name) {
		// setUser(previous => {
		// 	return {
		// 		...previous,
		// 		// status: name,
		// 		reason: user.status === 'Отказано' ? previous.reason : ''
		// 	};
		// });
		//вызываем попап для ввода причины отказа
		// name === 'Отказано' && setReason(true);
		name === 'Отказано' && block();
		name === 'Одобрено' && pass();
	}

	//сохраняем в стейт значения input/textarea при изменении
	function handleChange(event) {
		const { name, value } = event.target;
		setUser(previous => {
			return {
				...previous,
				[name]: value
			};
		});
	}

	//сохраняем изменения заявки в общей базе - App.js при изменении статуса заявки
	useEffect(() => {
		props.onAdd(user);
	}, [user.status]) // eslint-disable-line react-hooks/exhaustive-deps

	//сохраняем выбранный статус заявки в локальный стейт
	function sendStatus(decision) {
		setUser(previous => {
			return {
				...previous,
				status: decision,
				reason: decision === 'Отказано' ? previous.reason : '',
				security: props.security
			};
		});
		//закрываем попап с вводом причнины отказа
		setTimeout(() => {
			setReason(false);
		}, 100)
	}

	//функция возврата на главную страницу
	function goBack() {
		props.onClose(true);
		selectStatus = null;
	}

	//отказать
	function block() {
		setReason(true); //активируем попап с вводом причнины отказа
		selectStatus === null && statusSelect('Отказано'); //инициализация функции изменения статуса заявки, с предотвращением дублирования
	}
	//разрешить
	function pass() {
		sendStatus('Одобрено'); //сохраняем решение о статусе заявки в локальный стейт
		selectStatus === null && statusSelect('Одобрено'); //инициализация функции изменения статуса заявки, с предотвращением дублирования
	}

	return (
		<div className="popup">
			<div>
				<div className="box">
					<form>
						<div className="groupe">
							<label>Дата подачи заявки</label>
							<input
								type="text"
								name="n1"
								value={user.n1 || ''}
								disabled={true}
							/>
						</div>
						<div className="groupe">
							<label>Номер заявки</label>
							<input
								type="text"
								name="n2"
								value={user.n2 || ''}
								disabled={true}
							/>
						</div>
						<div className="groupe">
							<label>ФИО инициатора заявки</label>
							<input
								type="text"
								name="n3"
								value={user.n3 || ''}
								disabled={true}
							/>
						</div>
						<div className="groupe">
							<label>Тип пропуска</label>
							<input
								type="text"
								name="n4"
								value={user.n4 || ''}
								disabled={true}
							/>
						</div>
						<div className="groupe">
							<label>Период действия пропуска</label>
							<input
								type="text"
								name="n5"
								value={user.n5 || ''}
								disabled={true}
							/>
						</div>
						<div className="groupe">
							<label>Название компании</label>
							<input
								type="text"
								name="n6"
								value={user.n6 || ''}
								disabled={true}
							/>
						</div>
						<div className="groupe">
							<label>Номер автомобиля</label>
							<input
								type="text"
								name="n7"
								value={user.n7 || ''}
								disabled={true}
							/>
						</div>
						<div className="groupe">
							<label>Марка и модель автомобиля</label>
							<input
								type="text"
								name="n8"
								value={user.n8 || ''}
								disabled={true}
							/>
						</div>
						<div className="groupe">
							<label>ФИО владельца автомобиля</label>
							<input
								type="text"
								name="n9"
								value={user.n9 || ''}
								disabled={true}
							/>
						</div>
						<div className="groupe">
							<label>ФИО водителя автомобиля</label>
							<input
								type="text"
								name="n10"
								value={user.n10 || ''}
								disabled={true}
							/>
						</div>
						<div className="groupe">
							<label>Контактный номер телефона</label>
							<input
								type="text"
								name="n11"
								value={user.n11 || ''}
								disabled={true}
							/>
						</div>

						<div className={user.status?"groupe":"hidden"}>
							<label>Статус заявки</label>
							<input
								type="text"
								name="status"
								value={user.status || 'В рассмотрении'}
								onChange={handleChange}
								required="required"
								hidden={true}
							/>
							<span id="status" className={user.status === 'Одобрено' ? 'focus green' : 'focus red' }></span>
						</div>

						<div className={!user.status?"groupe":"hidden"}>
							<label>Статус заявки</label>
							<input
								type="text"
								name="status"
								value='В рассмотрении'
								disabled={true}
							/>
						</div>

						<div className={user.reason?"groupe":"hidden"}>
							<label>Причина отказа</label>
							<input
								type="text"
								name="reason"
								value={user.reason || ''}
								disabled={true}
							/>
						</div>

						<div className={user.security?"groupe":"hidden"}>
							<label>ФИО принявшего решение</label>
							<input
								type="text"
								name="security"
								value={user.security || ''}
								disabled={true}
							/>
						</div>

					</form>
				</div>
				{user.status ?
					<div className="formButton">
						<button onClick={goBack} style={{'width': '100%'}}>Назад</button>
					</div>
				:
				<div className="formButton">
					<button onClick={block}>Отказать</button>
					<button onClick={pass}>Согласовать</button>
				</div>
				}

				{reason &&
					<div className="popupbox">
						<div className="block">
							<label>Причина отказа</label>
							<textarea
								type="text"
								name="reason"
								value={user.reason || ''}
								onChange={handleChange}
							/>
						</div>
						<div className="formButton" style={{'marginTop':'15px'}}>
							<button onClick={()=>sendStatus('Отказано')} style={{'width': '100%'}}>Сохранить</button>
						</div>

					</div>
				}
			</div>
		</div>
	)
}

export default User;