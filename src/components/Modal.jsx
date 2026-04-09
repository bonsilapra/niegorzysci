import {createPortal} from 'react-dom';

const mountElement = document.getElementById('overlays');

export const Modal = ({isOpen, onClose, children}) => {
	if (!isOpen) {
		return null;
	}

	return (createPortal(
		<div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-primary-800/50">
			<dialog
				open
				aria-modal="true"
				className="relative p-5 rounded-xl flex flex-col min-w-sm"
			>
				<button onClick={onClose} className="self-end mb-5 cursor-pointer">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
						<path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
					</svg>
				</button>
				<div>
					{children}
				</div>
			</dialog>
		</div>,
		mountElement,
	)
	);
};
