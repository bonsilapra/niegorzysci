import {NavLink} from 'react-router';
import cx from 'classnames';
import {Loader} from './Loader';

const btnCommonClass = 'self-center flex justify-center items-center md:w-3/4 w-full h-16 rounded-md ';
const btnPrimaryClass = 'text-primary-0 p-3 bg-linear-to-t from-primary-700 to-primary-400';
const btnSecondaryClass = 'text-primary-0 p-3 bg-linear-to-t from-secondary-600 to-secondary-400';

const animationCommonClass = 'bg-linear-to-t transition delay-50 duration-400 ease-in-out hover:shadow-md hover:scale-103 hover:bg-linear-to-t ';
const animationPrimaryClass = 'hover:from-primary-600 hover:to-primary-400';
const animationSecondaryClass = 'hover:from-secondary-500 hover:to-secondary-400';

const disabledPrimaryClass = 'bg-primary-200 text-primary-400';

const simpleClass = 'self-center flex justify-center items-center md:w-3/4 w-full h-8 text-primary-600 mt-5 hover:underline hover:decoration-primary-400';

export const NavButton = ({content, path, cssClass, type = 'primary'}) => {

	return (
		<NavLink
			className={cx(
				btnCommonClass,
				{[btnPrimaryClass]: type === 'primary'},
				{[btnSecondaryClass]: type === 'secondary'},
				animationCommonClass,
				{[animationPrimaryClass]: type === 'primary'},
				{[animationSecondaryClass]: type === 'secondary'},
				cssClass,
			)}
			to={path}
		>
			<p className="mb-0">
				{content}
			</p>
		</NavLink>
	);
};

export const NavButtonSimple = ({content = 'Wstecz', path, cssClass}) => {

	return (
		<NavLink
			className={cx(
				simpleClass,
				cssClass,
			)}
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
				{[btnPrimaryClass]: type === 'primary' && !isDisabled},
				{[btnSecondaryClass]: type === 'secondary' && !isDisabled},
				{[animationCommonClass]: !isDisabled},
				{[animationPrimaryClass]: type === 'primary' && !isDisabled},
				{[animationSecondaryClass]: type === 'secondary' && !isDisabled},
				{[disabledPrimaryClass]: isDisabled},
				cssClass,
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
