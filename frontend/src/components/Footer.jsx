import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faGavel,
  faUsers,
  faEnvelope,
  faBriefcase,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-[#183D3D] text-white">
      <div className="container mx-auto px-6 pt-10 pb-6">
        <div className="flex flex-wrap text-left">
          {/* Empresa */}
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 mb-6">
            <h5 className="uppercase mb-6 font-bold">Empresa</h5>
            <ul className="list-none mb-6">
              <li className="mb-2">
                <FontAwesomeIcon icon={faBuilding} className="mr-2" />
                Sobre Nosotros
              </li>
              <li className="mb-2">
                <FontAwesomeIcon icon={faBriefcase} className="mr-2" />
                Carreras
              </li>
              <li className="mb-2">
                <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                Contacto
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 mb-6">
            <h5 className="uppercase mb-6 font-bold">Legal</h5>
            <ul className="list-none mb-6">
              <li className="mb-2">
                <FontAwesomeIcon icon={faGavel} className="mr-2" />
                Política de Privacidad
              </li>
              <li className="mb-2">
                <FontAwesomeIcon icon={faGavel} className="mr-2" />
                Términos y Condiciones
              </li>
              <li className="mb-2">
                <FontAwesomeIcon icon={faGavel} className="mr-2" />
                Política de Cookies
              </li>
            </ul>
          </div>

          {/* Comunidad */}
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 mb-6">
            <h5 className="uppercase mb-6 font-bold">Comunidad</h5>
            <ul className="list-none mb-6">
              <li className="mb-2">
                <FontAwesomeIcon icon={faUsers} className="mr-2" />
                Foros
              </li>
              <li className="mb-2">
                <FontAwesomeIcon icon={faUsers} className="mr-2" />
                Blog
              </li>
              <li className="mb-2">
                <FontAwesomeIcon icon={faUserFriends} className="mr-2" />
                Soporte
              </li>
            </ul>
          </div>

          {/* Redes Sociales */}
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 mb-6">
            <h5 className="uppercase mb-6 font-bold">Redes Sociales</h5>
            <ul className="list-none mb-6">
              <li className="mb-2">
                <FontAwesomeIcon icon={faFacebook} className="mr-2" />
                Facebook
              </li>
              <li className="mb-2">
                <FontAwesomeIcon icon={faTwitter} className="mr-2" />
                Twitter
              </li>
              <li className="mb-2">
                <FontAwesomeIcon icon={faInstagram} className="mr-2" />
                Instagram
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t-2 border-gray-700 pt-6">
          <div className="text-center">
            © {new Date().getFullYear()} F&S. Todos los derechos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
