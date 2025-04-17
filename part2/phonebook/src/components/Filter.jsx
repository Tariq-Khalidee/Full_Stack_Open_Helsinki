const Filter = (props) => (
    <div>
    Filter shown using: <input value={props.val} onChange={props.handler}/>
    </div>
)

export default Filter