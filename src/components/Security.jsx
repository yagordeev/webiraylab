import React, { useState, useEffect } from 'react';
import SelectPure from 'select-pure';

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

	const [user, setUser] = useState({})
	const [reason, setReason] = useState('');

	useEffect(() => {
		setUser(props.data);
		setTimeout(() => {
			new SelectPure("#status", {
				options: status,
				placeholder: props.status,
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
		}, 500)
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	function changeStatus(name) {
		setUser(previous => {
			return {
				...previous,
				status: name,
				reason: user.status === 'Отказано' ? previous.reason : ''
			};
		});
		console.log(name);
		if(name === 'Отказано') {
			setReason(true)
		}
	}

	function handleChange(event) {
		const { name, value } = event.target;
		setUser(previous => {
			return {
				...previous,
				[name]: value
			};
		});
	}

	useEffect(() => {
		props.onAdd(user);
	}, [user.status]) // eslint-disable-line react-hooks/exhaustive-deps

	function sendStatus(decision) {
		setUser(previous => {
			return {
				...previous,
				status: decision
			};
		});
		props.onAdd(user);
		setTimeout(() => {
			// closePopup();
			setReason(false);
		}, 100)
	}

	function closePopup() {
		props.onClose(true);
	}

	function block() {
		setReason(true);
		setUser(previous => {
			return {
				...previous,
				security: props.security
			};
		});
	}

	function pass() {
		setUser(previous => {
			return {
				...previous,
				security: props.security
			};
		});
		sendStatus('Одобрено');
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
							<label>Статус заявки1</label>
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
							<label>Статус заявки2</label>
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
						<button onClick={closePopup} style={{'width': '100%'}}>Назад</button>
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