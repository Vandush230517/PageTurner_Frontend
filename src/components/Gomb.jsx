export default function Gomb({szin, onClick, text}){
    return(
        <button className={szin} onClick={onClick} style={{ margin: 0 }}>
            {text}
        </button>
    )
}