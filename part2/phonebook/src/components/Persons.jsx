const ShowPerson = (props) => (
  <p>
    <span style={{ marginRight: '10px' }}>{props.name}</span>
    <span style={{ marginRight: '10px' }}>{props.phone}</span>
    <button onClick={() => props.deleteHandler(props.id, props.name)}>delete</button>
  </p>
);

  
  const Persons = (props) => {
    return (
      <>
        {props.persons.map((person) => (
          <ShowPerson 
          key={person.id} 
          id = {person.id}
          name={person.name} 
          phone={person.number} 
          deleteHandler={props.deleteHandler} />
        ))}
      </>
    );
  };
  
  export default Persons;
  