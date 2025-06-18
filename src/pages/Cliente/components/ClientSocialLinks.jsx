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
	<section
		id="cliente-seccion"
		className="col-span-12 flex flex-col items-center md:items-start justify-start gap-6 md:gap-12 xl:px-0 2xl:mt-0"
	>
		{/* Título de la sección */}
		<h2 id="cliente-titulo-contacto" className="text-xl md:text-2xl font-semibold">
			Contacto
		</h2>
		{/* Iconos para contacto a cliente */}
		<article
			id="cliente-iconos-contacto"
			className="grid grid-cols-4 md:grid-cols-7 items-center gap-8"
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
		</article>
	</section>
);

export default ClientSocialLinks;
