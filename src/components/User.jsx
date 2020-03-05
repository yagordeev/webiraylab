import React, { useState, useEffect } from 'react';
import InputMask from 'react-input-mask';
import SelectPure from "select-pure";


function User() {

	const [user, setUser] = useState({ n1: '', n2: '', n3: '', n4: '', n5: '', n6: '', n7: '', n8: '', n9: '', n10: '', n11: '' })
	const [check, setCheck] = useState(false);


	const myOptions = [{
			label: "Иванов Иван Иванович",
			value: "001",
		},
		{
			label: "Иванов Иван Иванович",
			value: "002",
		},
		{
			label: "Иванов Иван Иванович",
			value: "003",
		},
		{
			label: "Иванов Иван Иванович",
			value: "004",
		},
		{
			label: "Иванов Иван Иванович",
			value: "005",
		},
		{
			label: "Иванов Иван Иванович",
			value: "006",
		},
		{
			label: "Иванов Иван Иванович",
			value: "007",
		}
	]

	useEffect(() => {
		new SelectPure("#n3", {
			options: myOptions,
			placeholder: "Иванов Иван Иванович",
			multiple: false,
			onChange: value => { changeN3(value); },
			classNames: {
				select: "select",
				dropdownShown: "select--opened",
				multiselect: "select--multiple",
				label: "select-label",
				placeholder: "select-placeholder",
				dropdown: "select-options",
				option: "select-option",
				autocompleteInput: "select-autocomplete",
				selectedLabel: "select__selected-label",
				selectedOption: "selected",
				placeholderHidden: "hidden",
				optionHidden: "select-option--hidden",
			}
		});
	}, [])

	function changeN3(name) {
		setUser(previous => {
			return {
				...previous,
				n3: name
			};
		})
	}


	function handleChange(event) {
		const { name, value } = event.target;
		setUser(previous => {
			return {
				...previous,
				[name]: value
			};
		})
	}

	function propuskChange(e) {
		e.persist();
		console.log(e.target.value);
		user.n4 !== e.target.value && setUser(f => { return { ...f, n4: e.target.value } })
		e.preventDefault();
	}

	function sendForm(e) {
		e.preventDefault();
		console.log('send');
	}


	// const check = target.type === 'checkbox' ? target.checked : target.value;

	// const check = (e) => {
	// 	const { target } = e;
	// 	const { name } = target;
	//
	// 	const value = target.checked ?
	// 		setUser(previous => ({ ...previous, 'n10': user.n9 })) :
	// 		setUser(previous => ({ ...previous, 'n10': '' }))
	// };

	return (
		<form onSubmit={sendForm} className="box">
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
				/>
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
					readOnly={check}
				/>
				<label className="container">
					<input type="checkbox" hidden={true}/>
					<div onClick={()=>setCheck(f=>!f)}>Совпадает с ФИО владельца</div>
					<span onClick={()=>setCheck(f=>!f)} className="checkmark"></span>
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
	)
}

export default User;