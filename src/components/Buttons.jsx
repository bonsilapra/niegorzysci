import {NavLink} from 'react-router';
import cx from 'classnames';
import {Loader} from './Loader';

const btnClasses = (type) => `self-center flex justify-center items-center md:w-3/4 w-full h-16 focus:bg-${type}-800 rounded-md text-light p-3`;
const animationClass = (type) => `bg-${type} transition delay-50 duration-200 ease-in-out hover:-translate-y-0.5 hover:scale-101 hover:bg-${type}-500`;
const disabledClass = (type) => `bg-${type}Disabled`;

export const NavButton = ({content, path, cssClass, type = 'primary'}) => {

	return (
		<NavLink
			className={cx(btnClasses(type), animationClass(type), cssClass)}
			to={path}
		>
			<p class="mb-0">
				{content}
			</p>
		</NavLink>
	);
};

export const SubmitButton = ({content, isDisabled, cssClass, type = 'primary', isLoading}) => {

	return (
		<button
			className={cx(
				btnClasses(type),
				cssClass,
				{[disabledClass(type)]: isDisabled},
				{[animationClass(type)]: !isDisabled},
			)}
			type="submit"
			disabled={isDisabled}
		>
			{isLoading
				? <Loader />
				: content
			}
		</button>
	);
};
