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
	cssLayout,
}) => {
	const inputDefault = 'border-primary-300 bg-white';
	const inputFocus = 'focus:border-primary-500 focus:bg-primary-100';
	const inputActive = 'active:border-primary-600 active:bg-primary-200';

	return (
		<div className={cx('flex flex-col', cssLayout)}>
			<label
				htmlFor={id}
				className="mb-2"
			>
				{label}
			</label>
			{type === 'textarea'
				? <textarea
					id={id}
					name={name}
					placeholder={placeholder}
					className={cx('p-2 mb-5 border-2 rounded-md',
						inputDefault,
						inputFocus,
						inputActive,
						{'bg-primary-100! text-primary-400!': isDisabled},
						cssClass,
					)}
					value={value}
					required={isRequired}
					onChange={onChange}
				/>
				: <input
					id={id}
					type={type}
					name={name}
					placeholder={placeholder}
					className={cx('p-2 mb-5 border-2 rounded-md',
						inputDefault,
						inputFocus,
						inputActive,
						{'bg-primary-100! text-primary-400!': isDisabled},
						cssClass,
					)}
					value={value}
					required={isRequired}
					onChange={onChange}
					disabled={isDisabled}
				/>
			}
		</div>
	);
};
