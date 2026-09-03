import { Modal } from 'antd';
import { useEffect } from 'react';

const WarningModal: React.FC = () => {
	const [modal, contextHolder] = Modal.useModal();
	useEffect(() => {
		const alReadyShown = sessionStorage.getItem('warningShown');
		if (!alReadyShown) {
			let seconds = 7;
			const getMessage = (s: number) =>
				`This portfolio is currently under construction. Please check back later for updates. This modal will close in ${s} seconds`;
			const instance = modal.success({
				title: 'Work in progress',
				content: getMessage(seconds),
			});

			const timer = setInterval(() => {
				seconds -= 1;
				instance.update({
					content: getMessage(seconds),
				});
			}, 1000);

			setTimeout(() => {
				clearInterval(timer);
				instance.destroy();
			}, seconds * 1000);
			sessionStorage.setItem('warningShown', 'true');
		}
	}, [modal]);
	return contextHolder;
};

export default WarningModal;
