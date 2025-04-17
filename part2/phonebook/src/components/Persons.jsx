const ShowPerson = (props) => (
    <p>{props.name} {props.phone}</p>
  );
  
  const Persons = (props) => {
    return (
      <>
        {props.persons.map((person, index) => (
          <ShowPerson key={index} name={person.name} phone={person.number} />
        ))}
      </>
    );
  };
  
  export default Persons;
  