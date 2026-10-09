import { Citation, H3, SubTitle } from './TextStyle';
import {
	ButtonStyle,
	CardWindow,
	FieldBox,
	InputField,
	Pin,
	TextField,
} from './CardWindow';
import { FileTextOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { message } from 'antd';

export default function ContactMe() {
	const [status, setStatus] = useState<
		'idle' | 'sending' | 'success' | 'error'
	>('idle');

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const form = event.currentTarget;

		const data = new FormData(form);
		// console.log(Object.fromEntries(data));
		try {
			setStatus('sending');
			const response = await fetch(
				import.meta.env.VITE_FORMSPREE_ENDPOINT,
				{
					method: 'POST',
					body: data,
					headers: { Accept: 'application/json' },
				},
			);
			if (response.ok) {
				setStatus('success');
				message.success('Message envoyé avec succès!');
				form.reset();
			} else {
				setStatus('error');
				message.error("Erreur lors de l'envoi du message.");
			}
		} catch (error) {
			setStatus('error');
			message.error("Erreur lors de l'envoi du message.");
			console.error('Error:', error);
		}
	}

	return (
		<>
			<H3>Travaillons ensemble</H3>
			<Citation>Une alternance, une idée, un projet ?</Citation>
			<div className="mt-6">
				<CardWindow
					title={
						<>
							<svg
								className="size-4 fill-none text-lime-accent shrink-0"
								viewBox="0 0 16 16"
							>
								<circle
									className="stroke-current stroke-[1.5]"
									cx="8"
									cy="8"
									r="6.5"
								/>
								<circle
									className="fill-current"
									cx="8"
									cy="8"
									r="2"
								/>
							</svg>
							<span className="text-sm text-white/75">
								Nouvelle issue
							</span>
							<Pin className="text-lime-accent bg-lime-accent/15 text-[11px] uppercase ml-auto">
								Ouvert
							</Pin>
						</>
					}
				>
					<form onSubmit={handleSubmit}>
						<SubTitle>Email</SubTitle>
						<InputField
							name="email"
							id="email"
							type="email"
							placeholder="votre@email.com"
							required
						></InputField>

						<SubTitle>Titre</SubTitle>
						<InputField
							name="title"
							id="title"
							type="text"
							placeholder="Discutons de votre prochain projet"
							required
						></InputField>

						<SubTitle>Description</SubTitle>
						<TextField
							name="description"
							id="description"
							placeholder="Decrivez votre projet, vos besoins ou une demande d'information?"
							required
							rows={4}
						></TextField>

						<SubTitle>Pièce jointe</SubTitle>
						<FieldBox className="flex items-center justify-between gap-3">
							<div className="flex items-center gap-2.5 min-w-0">
								{/* !important: car AntDesign écrase la couleur tailwind */}
								<FileTextOutlined className="text-lime-accent! text-lg" />
								<div className="min-w-0">
									<p className="truncate text-xs sm:text-[13px] text-white/85">
										CVKevinBYTEBIER.pdf
									</p>
									<p className="text-[11px] text-white/35 mt-0.5">
										246 Ko
									</p>
								</div>
							</div>
							<a href="/CVKevinBYTEBIER.pdf" download>
								<Pin>Télécharger</Pin>
							</a>
						</FieldBox>

						<SubTitle>Labels</SubTitle>
						<div className="flex gap-2">
							<Pin className="inline-flex items-center gap-1.5">
								<span className="size-1.5 rounded-full bg-lime-accent" />
								alternance
							</Pin>
							<Pin className="inline-flex items-center gap-1.5">
								<span className="size-1.5 rounded-full bg-lime-accent" />
								collaboration
							</Pin>
						</div>
						<ButtonStyle
							className="flex items-center gap-2 mt-4"
							type="submit"
							disabled={status === 'sending'}
						>
							{status === 'sending'
								? 'Envoi en cours...'
								: 'Envoyer'}
						</ButtonStyle>
					</form>
				</CardWindow>
			</div>
		</>
	);
}
