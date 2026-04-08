import {NavLink} from 'react-router';
import cx from 'classnames';
import {Loader} from './Loader';

const buttonBaseClass =
	'self-center flex justify-center items-center md:w-3/4 w-full rounded-md';

const simpleClass = 'h-8 text-primary-600 mt-5 hover:underline hover:decoration-primary-400';

const smallClass = 'p-2! h-10! text-base';

const buttonVariantClass = {
	primary: {
		base: 'text-primary-0 bg-linear-to-t from-primary-700 to-primary-400',
		hover: 'hover:from-primary-600 hover:to-primary-400',
		disabled: 'bg-primary-200 text-primary-400',
	},
	secondary: {
		base: 'text-primary-0 bg-linear-to-t from-secondary-600 to-secondary-400',
		hover: 'hover:from-secondary-500 hover:to-secondary-400',
		disabled: 'bg-secondary-200 text-secondary-400',
	},
	danger: {
		base: 'text-primary-0 bg-linear-to-t from-red-700 to-red-400',
		hover: 'hover:from-red-600 hover:to-red-400',
		disabled: 'bg-red-100 text-red-400',
	},
};

const animatedClass =
	'transition delay-50 duration-400 ease-in-out hover:shadow-md hover:scale-103';

const getButtonClassName = ({
	type = 'primary',
	size,
	isDisabled = false,
	simple = false,
	cssClass,
}) => {
	if (simple) {
		return cx(
			buttonBaseClass,
			simpleClass,
			cssClass,
		);
	}

	const variant = buttonVariantClass[type] ?? buttonVariantClass.primary;

	return cx(
		buttonBaseClass,
		'h-16 p-3',
		isDisabled ? variant.disabled : variant.base,
		!isDisabled && animatedClass,
		!isDisabled && variant.hover,
		{[smallClass]: size === 'small'},
		cssClass,
	);
};

export const Button = ({
	content = 'Wstecz',
	path,
	onClick,
	type = 'primary',
	size,
	isDisabled = false,
	isLoading = false,
	simple = false,
	cssClass,
}) => {
	const classes = getButtonClassName({
		type,
		size,
		isDisabled,
		simple,
		cssClass,
	});

	if (path) {
		return (
			<NavLink className={classes} to={path}>
				<p className="mb-0">{content}</p>
			</NavLink>
		);
	}

	return (
		<button
			className={classes}
			type={onClick ? 'button' : 'submit'}
			disabled={isDisabled}
			onClick={onClick}
		>
			{isLoading ? <Loader /> : content}
		</button>
	);
};
