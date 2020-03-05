import React, { useState } from 'react';

function User() {

	const [user, setUser] = useState({})


	function handleChange(event) {
		const { name, value } = event.target;
		setUser(previous => {
			return {
				...previous,
				[name]: value
			};
		})
	}

	return (
		<form className="box">
			<div className="groupe">
				<label>Дата подачи заявки</label>
				<input
					type="text"
					name="n1"
					value={user.n1 || ''}
					onChange={handleChange}
					required="required"
				/>
			</div>
			<div className="groupe">
				<label>Номер заявки</label>
				<input
					type="text"
					name="n2"
					value={user.n2 || ''}
					onChange={handleChange}
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
					required="required"
				/>
			</div>
			<div className="groupe">
				<label>Тип пропуска</label>
				<input
					type="text"
					name="n4"
					value={user.n4 || ''}
					onChange={handleChange}
					required="required"
				/>
			</div>
			<div className="groupe">
				<label>Период действия пропуска</label>
				<input
					type="text"
					name="n5"
					value={user.n5 || ''}
					onChange={handleChange}
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
					required="required"
				/>
			</div>
			<div className="groupe">
				<label>Номер автомобиля</label>
				<input
					type="text"
					name="n7"
					value={user.n7 || ''}
					onChange={handleChange}
					required="required"
				/>
			</div>
			<div className="groupe">
				<label>Марка и модель автомобиля</label>
				<input
					type="text"
					name="n8"
					value={user.n8 || ''}
					onChange={handleChange}
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
					required="required"
				/>
			</div>
			<div className="groupe">
				<label>ФИО водителя автомобиля</label>
				<input
					type="text"
					name="n10"
					value={user.n10 || ''}
					onChange={handleChange}
					required="required"
				/>
			</div>
			<div className="groupe">
				<label>Контактный номер телефона</label>
				<input
					type="text"
					name="n11"
					value={user.n11 || ''}
					onChange={handleChange}
					required="required"
				/>
			</div>
			<div className="groupe">
				<label>Статус заявки</label>
				<input
					type="text"
					name="n12"
					value={user.n12 || ''}
					onChange={handleChange}
					required="required"
				/>
			</div>
		</form>
	)
}

export default User;