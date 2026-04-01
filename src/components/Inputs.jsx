import cx from 'classnames';

export const UserInput = ({
	label,
	id,
	type = 'text',
	name,
	placeholder,
	value,
	isRequired = false,
	onChange,
	isDisabled,
	cssClass,
}) => {
	const inputDefault = 'border-primary-300 bg-white';
	const inputFocus = 'focus:border-primary-500 focus:bg-primary-0';
	const inputActive = 'active:border-primary-600 active:bg-primary-200';

	return (
		<>
			<label
				htmlFor={id}
				className="mb-2"
			>
				{label}
			</label>
			<input
				id={id}
				type={type}
				name={name}
				placeholder={placeholder}
				className={cx('p-2 mb-5 border-2 rounded-md', inputDefault, inputFocus, inputActive, cssClass)}
				value={value}
				required={isRequired}
				onChange={onChange}
				disabled={isDisabled}
			/>
		</>
	);
};
