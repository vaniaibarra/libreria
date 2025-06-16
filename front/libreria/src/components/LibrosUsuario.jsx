import { useEffect } from "react";
import { useAuth } from "../context/Context";
import BookCard from "../pages/components/BookCard";

function LibrosUsuario(){

    const { book, userBooks, usuario } = useAuth();

    useEffect(() => {
        if(usuario){
            userBooks();
        }
    }, [usuario]);

    return(
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
            {book?.map((item) => (
                <BookCard key={item.id} book={item}/>
            ))}
        </div>
        </>
    )
}

export default LibrosUsuario;