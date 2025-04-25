// Type can be notification (green) or error (red)
const Notification = ({message}) => {
    if (message === null) {
        return null 
    }
    
    return (
        <div className={`notification ${message.type}`}> 
            {message.text}
        </div>
    )
}

export default Notification 