export default function Gomb({szin, onClick, text}){
    return(
        <button  className={szin} onClick={onClick}>
            {text}

        </button>

        
    )
}