import React, { useState, useEffect } from 'react';
import InputMask from 'react-input-mask';
import SelectPure from 'select-pure';

//переменная для одностраничной работы функции совпадения ФИО
var check = false;

//База работников
const workers = [{
		label: "Иванов Иван Иванович",
		value: "Иванов Иван Иванович",
	},
	{
		label: "Мерзлов Марк Еремеевич",
		value: "Мерзлов Марк Еремеевич",
	},
	{
		label: "Кирсанов Елизар Остапович ",
		value: "Кирсанов Елизар Остапович ",
	},
	{
		label: "Ясакова Майя Виталиевна",
		value: "Ясакова Майя Виталиевна",
	},
	{
		label: "Мандрыко Юлиан Остапович",
		value: "Мандрыко Юлиан Остапович",
	},
	{
		label: "Викариев Иван Тимурович",
		value: "Викариев Иван Тимурович",
	},
	{
		label: "Самойлов Артем Геннадиевич",
		value: "Самойлов Артем Геннадиевич",
	}
]

//варианты периодов пропуска
const passTime = [{
		label: "1 час",
		value: "1 час",
	},
	{
		label: "3 часа",
		value: "3 часа",
	},
	{
		label: "12 часов",
		value: "12 часов",
	},
	{
		label: "24 часа",
		value: "24 часа",
	},
	{
		label: "72 часа",
		value: "72 часа",
	},
	{
		label: "7 дней",
		value: "7 дней",
	},
	{
		label: "14 дней",
		value: "14 дней",
	},
	{
		label: "1 месяц",
		value: "1 месяц",
	}
]

function User(props) {

	//стейт для вводимых данных
	const [user, setUser] = useState({ n1: '', n2: '', n3: '', n4: 'разовый', n5: '', n6: '', n7: '', n8: '', n9: '', n10: '', n11: '' })

	//срабатывает при первом открытии
	useEffect(() => {
		//создам select для выбора "ФИО инициатора заявки"
		new SelectPure("#n3", {
			options: workers,
			placeholder: "Иванов Иван Иванович",
			multiple: false,
			onChange: value => { changeN3(value); },
			classNames: {
				select: "select",
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
		//создам select для выбора "Периода действия пропуска"
		new SelectPure("#n5", {
			options: passTime,
			placeholder: "24 часа",
			multiple: false,
			onChange: value => { changeN5(value); },
			classNames: {
				select: "select",
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
	}, [])

	//сохраняем изменения "ФИО инициатора заявки" в стейт
	function changeN3(name) {
		setUser(previous => {
			return {
				...previous,
				n3: name
			};
		})
	}
	//сохраняем изменения "Период действия пропуска" в стейт
	function changeN5(name) {
		setUser(previous => {
			return {
				...previous,
				n5: name
			};
		})
	}
	//сохраняем в стейт значения каждого input при изменении
	function handleChange(event) {
		const { name, value } = event.target;
		setUser(previous => {
			return {
				...previous,
				[name]: value
			};
		})
	}
	//выбираем тип пропуска
	function propuskChange(e) {
		e.persist(); // удаляем синтетическое событие из пула
		// user.n4 !== e.target.value && setUser(f => { return { ...f, n4: e.target.value } })
		setUser(f => { return { ...f, n4: e.target.value } })
		// e.preventDefault();
	}
	//отправляем форму
	function sendForm(e) {
		e.preventDefault(); //предотвращаем перезагрузку страницы
		props.onSubmit(user); //сохраняем заявку в общую базу - App.js
		check = false; //удаляем переменную для одностраничной работы функции совпадения ФИО
		goBack(); //возвращаемся на главную
	}
	//вкл/выкл функцию совпадения ФИО
	function checkFio() {
		check = check ? false : true;
		changeCheck();
	}
	//сохраняем в стейт ФИО владельца и/или владельца
	function changeCheck() {
		setUser(previous => {
			return {
				...previous,
				n10: check ? user.n9 : ''
			}
		});
	}
	//отслеживаем изменения ФИО владельца и динамически меняем ФИО водителя, если включена функция совпадения ФИО
	useEffect(() => {
		setUser(previous => {
			return {
				...previous,
				n10: check ? user.n9 : ''
			}
		});
	}, [user.n9])

	//функция возврата на главную страницу
	function goBack() {
		props.onBack()
	}

	return (
		<div className="popup">
			<div>
				<div className="box">
					<form id="userForm" onSubmit={sendForm}>
						<div className="groupe">
							<label>Дата подачи заявки</label>
							<InputMask
								type="text"
								name="n1"
								mask="99.99.9999"
								value={user.n1 || ''}
								onChange={handleChange}
								className={user.n1 ? 'focus' : '' }
								placeholder="00.00.0000"
								autoComplete="off"
								required="required"
							/>
						</div>
						<div className="groupe">
							<label>Номер заявки</label>
							<InputMask
								type="text"
								name="n2"
								value={user.n2 || '№A0000002'}
								onChange={handleChange}
								className={user.n2 ? 'focus' : '' }
								autoComplete="off"
								required="required"
							/>
						</div>
						<div className="groupe">
							<label>ФИО инициатора заявки</label>
							<input
								type="text"
								name="n3"
								value={user.n3 || ''}
								onChange={handleChange}
								autoComplete="off"
								required="required"
								hidden={true}
							/>
							<span id="n3" className={user.n3 ? 'focus' : '' }></span>
						</div>
						<div className="groupe">
							<label>Тип пропуска</label>
							<input
								type="text"
								name="n4"
								value={user.n4 || ''}
								onChange={handleChange}
								autoComplete="off"
								required="required"
								hidden={true}
							/>
							<div className={user.n4 ? 'propusk focus' : 'propusk' }>
								<button type="button" className={user.n4 !== 'постоянный' ? 'active' : ''} onClick={propuskChange} value="разовый">разовый</button>
								<button type="button" className={user.n4 === 'постоянный' ? 'active' : ''} onClick={propuskChange} value="постоянный">постоянный</button>
							</div>
						</div>
						<div className="groupe">
							<label>Период действия пропуска</label>
							<input
								type="text"
								name="n5"
								value={user.n5 || ''}
								onChange={handleChange}
								className={user.n5 ? 'focus' : '' }
								autoComplete="off"
								required="required"
								hidden={true}
							/>
							<span id="n5" className={user.n5 ? 'focus' : '' }></span>
						</div>
						<div className="groupe">
							<label>Название компании</label>
							<input
								type="text"
								name="n6"
								value={user.n6 || ''}
								onChange={handleChange}
								className={user.n6 ? 'focus' : '' }
								placeholder="ООО “Бизнес Вектор”"
								autoComplete="off"
								required="required"
							/>
						</div>
						<div className="groupe">
							<label>Номер автомобиля</label>
							<InputMask
								type="text"
								name="n7"
								mask="a999aa 999"
								maskChar=""
								value={user.n7 || ''}
								onChange={handleChange}
								className={user.n7 ? 'focus' : '' }
								style={{"textTransform": "uppercase"}}
								placeholder="Х047РТ 197"
								autoComplete="off"
								required="required"
							/>
						</div>
						<div className="groupe">
							<label>Марка и модель автомобиля</label>
							<input
								type="text"
								name="n8"
								value={user.n8 || 'Audi A6'}
								onChange={handleChange}
								className={user.n8 ? 'focus' : '' }
								autoComplete="off"
								required="required"
							/>
						</div>
						<div className="groupe">
							<label>ФИО владельца автомобиля</label>
							<input
								type="text"
								name="n9"
								value={user.n9 || ''}
								onChange={handleChange}
								className={user.n9 ? 'focus' : '' }
								placeholder="Сидоров Сидор Сидорович"
								autoComplete="off"
								required="required"
							/>
						</div>
						<div className="groupe">
							<label>ФИО водителя автомобиля</label>
							<input
								type="text"
								name="n10"
								value={check ? user.n9 : user.n10 || ''}
								onChange={handleChange}
								className={user.n10 ? 'focus' : '' }
								required="required"
								placeholder="Сидоров Сидор Сидорович"
								autoComplete="off"
								readOnly={check ? true : false}
							/>
							<label className="container">
								<input type="checkbox" onChange={checkFio} hidden={true}/>
								<div>Совпадает с ФИО владельца</div>
								<span className="checkmark"></span>
							</label>
						</div>
						<div className="groupe">
							<label>Контактный номер телефона</label>
							<InputMask
								type="text"
								name="n11"
								mask="+7 (999) 999 99 99"
								maskChar=""
								placeholder="+7 (900) 900 90 90"
								value={user.n11 || ''}
								onChange={handleChange}
								className={user.n11 ? 'focus' : '' }
								autoComplete="off"
								required="required"
							/>
						</div>
					</form>
				</div>
				<div className="formButton">
					<button type="button" onClick={goBack}>Назад</button>
					<button type="submit" form="userForm">Подать заявку</button>
					</div>
				</div>

		</div>
	)
}

export default User;