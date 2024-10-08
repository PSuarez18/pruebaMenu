import { Link } from "react-router-dom";
import error404img from '../assets/images/error404.png';

const NotFound = () => {
    return (
        <div className="overflow-y-auto  flex items-center flex-col justify-center lg:flex-row py-28 px-6 md:px-24 md:py-20 lg:py-32 gap-16 lg:gap-28">
            <div className="w-full lg:w-1/2">
                <img
                    className="w-full max-w-xs md:max-w-md lg:max-w-lg"
                    src={error404img}
                    alt="No encontrado"
                />
            </div>
            <div className="w-full lg:w-1/2">
                <h1 className="py-4 text-3xl lg:text-4xl font-extrabold text-gray-800">
                    Parece que has encontrado la puerta a la gran nada
                </h1>
                <p className="py-4 text-base text-gray-800">
                    El contenido que estás buscando no existe. O fue eliminado, o escribiste mal el enlace.
                </p>
                <p className="py-2 text-base text-gray-800">
                    ¡Lo sentimos! Por favor, visita nuestra página principal para llegar a donde necesitas ir.
                </p>
                <button className="w-full lg:w-auto bg-black text-white my-4 border rounded-md px-1 sm:px-16 py-5 bg-customBlue text-whitefocus:outline-none focus:ring-2 focus:ring-opacity-50">
                    <Link to='home'>Volver al Home</Link>
                </button>
            </div>
        </div>
    );
};

export default NotFound;
