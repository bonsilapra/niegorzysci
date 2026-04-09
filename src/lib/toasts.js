import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

export const toast = ({content, type = 'success'}) => {
	let toastColor = 'linear-gradient(to bottom, #317798, #4294b5)';

	if (type === 'success') {
		toastColor = 'linear-gradient(to bottom, #308f2a, #40ae39)';
	} else if (type === 'error') {
		toastColor = 'linear-gradient(to bottom, #9b1919, #df2323)';
	}

	return Toastify({
		text: content,
		duration: 5000,
		close: true,
		gravity: 'top',
		position: 'center',
		stopOnFocus: true,
		style: {
			background: toastColor,
			'border-radius': '6px',
		},
	}).showToast();
};
