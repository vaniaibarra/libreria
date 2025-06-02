import { Link } from "react-router-dom";
function Options () {
    return (
        <>
            <div 
            className="
            bg-[#cdb7ad]
            pt-15
            pb-10
            pl-6
            pr-6
            w-full
            h-96
            rounded-2xl
            border-[#816659]
            border-5
            ">
                <h3 className="font-mono text-center pb-3">Súmate a la experiencia!</h3>
                <div className="flex flex-col gap-20">
                    <div
                    className="
                        bg-white
                        rounded-2xl
                        border-2
                        p-4
                        ">
                        <Link
                        to="/login">
                            Iniciar sesión
                        </Link>
                    </div>
                    <div
                    className="
                        bg-white
                        rounded-2xl
                        border-2
                        p-4
                        ">
                        <Link
                        to="/register">
                            Registrarse
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Options;