export default function ConfirmationCardBoolean({yes, no}){
    return(
        <div className="confirmation-options">
            <button className='confirmation-yes' onClick={yes}>Yes</button>
            <button className="confirmation-no" onClick={no}>No</button>
        </div>
    )
}