import {NavLink} from 'react-router';
import cx from 'classnames';
import {Loader} from './Loader';

const btnCommonClass = 'self-center flex justify-center items-center md:w-3/4 w-full h-16 rounded-md ';
const btnPrimaryClass = 'text-secondary-100 p-3 bg-linear-to-t from-primary-500 to-primary-400';
const animationCommonClass = 'bg-linear-to-t transition delay-50 duration-400 ease-in-out hover:shadow-md hover:scale-103 hover:bg-linear-to-t ';
const animationPrimaryClass = 'from-primary-500 to-primary-400 hover:from-primary-600 hover:to-primary-500';
const disabledPrimaryClass = 'bg-primary-100';

export const NavButton = ({content, path, cssClass, type = 'primary'}) => {

	return (
		<NavLink
			className={cx(
				btnCommonClass,
				{[btnPrimaryClass]: type === 'primary'},
				animationCommonClass,
				{[animationPrimaryClass]: type === 'primary'},
				cssClass)}
			to={path}
		>
			<p className="mb-0">
				{content}
			</p>
		</NavLink>
	);
};

export const SubmitButton = ({content, isDisabled, cssClass, type = 'primary', isLoading}) => {

	return (
		<button
			className={cx(
				btnCommonClass,
				{[btnPrimaryClass]: type === 'primary'},
				animationCommonClass,
				{[animationPrimaryClass]: type === 'primary' && !isDisabled},
				cssClass,
				{[disabledPrimaryClass]: isDisabled},
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
