import { Button, Modal } from 'antd';

const WarningModal: React.FC = () => {
	const [modal, contextHolder] = Modal.useModal();

	const countdown = () => {
		let seconds = 5;

		const instance = modal.success({
			title: 'Work in progress',
			content:
				'This portfolio is currently under construction. Please check back later for updates. this modal will destroy in ' +
				seconds +
				' secondes',
		});

		const timer = setInterval(() => {
			seconds -= 1;
			instance.update({
				content: 'this modal will destroy in ' + seconds + ' secondes',
			});
		}, 1000);

		setTimeout(() => {
			clearInterval(timer);
			instance.destroy();
		}, seconds * 1000);
	};

	return (
		<>
			<Button onClick={countdown}>Work in progress</Button>
			{contextHolder}
		</>
	);
};

export default WarningModal;
