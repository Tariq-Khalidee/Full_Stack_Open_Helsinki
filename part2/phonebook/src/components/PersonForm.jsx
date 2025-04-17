const PersonForm = (props) => (
    <form onSubmit={props.submitHandler}>
    <div>
      Name: <input value={props.name} onChange={props.nameChangeHandler} />
    </div>
    <div>
      Number: <input value={props.number} onChange={props.numberChangeHandler}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

export default PersonForm 