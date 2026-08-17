import type { Imovie } from "../types/movie";
interface MovieCartProps {
    movie: Imovie;
}


function MovieCart({movie}:MovieCartProps){
    return(
        <>
            <h3>{movie.title}</h3>
        </>
    )
}
export default MovieCart