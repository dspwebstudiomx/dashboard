import { FaHome } from 'react-icons/fa';
import {
	FaEnvelope,
	FaFacebook,
	FaInstagram,
	FaLinkedin,
	FaPhone,
	FaXTwitter,
} from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const SocialStyles = {
	link: 'text-blue-700 hover:text-blue-600 mx-auto',
	iconSize: '32',
};

const ClientSocialLinks = ({ selectedClient }) => (
	<div className="col-span-12 flex flex-col items-center md:items-start justify-start gap-6 md:gap-12 xl:px-0 py-8 2xl:mt-12">
		<h2 className="text-xl md:text-2xl font-semibold">Visita y Contacta</h2>
		<div
			id="tarjeta-redes-sociales"
			className="grid grid-cols-4 md:grid-cols-7 items-center gap-6 md:gap-4 ml-6"
		>
			{[
				{
					href: selectedClient?.website,
					icon: <FaHome size={SocialStyles.iconSize} />,
					title: 'Visitar sitio web',
				},
				{
					href: `mailto:${selectedClient?.email}`,
					icon: <FaEnvelope size={SocialStyles.iconSize} />,
					title: 'Enviar correo electrónico',
				},
				{
					href: `tel:${selectedClient?.phoneNumber}`,
					icon: <FaPhone size={SocialStyles.iconSize} />,
					title: 'Llamar',
				},
				{
					href: selectedClient?.linkedin?.trim(),
					icon: <FaLinkedin size={SocialStyles.iconSize} />,
					title: 'Visitar LinkedIn',
				},
				{
					href: selectedClient?.facebook?.trim(),
					icon: <FaFacebook size={SocialStyles.iconSize} />,
					title: 'Visitar Facebook',
				},
				{
					href: selectedClient?.instagram?.trim(),
					icon: <FaInstagram size={SocialStyles.iconSize} />,
					title: 'Visitar Instagram',
				},
				{
					href: selectedClient?.twitter?.trim(),
					icon: <FaXTwitter size={SocialStyles.iconSize} />,
					title: 'Visitar Twitter',
				},
			]
				.filter((social) => social.href)
				.map((social, index) => (
					<Link
						key={index}
						to={social.href}
						target="_blank"
						rel="noopener noreferrer"
						className={SocialStyles.link}
						aria-label={social.title}
						title={social.title}
					>
						{social.icon}
					</Link>
				))}
		</div>
	</div>
);

export default ClientSocialLinks;
