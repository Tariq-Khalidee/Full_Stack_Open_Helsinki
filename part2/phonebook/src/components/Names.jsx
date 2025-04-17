const ShowName = (props) => (
    <p>{props.name}</p>
  );
  
  const Names = (props) => {
    return (
      <>
        {props.persons.map((person, index) => (
          <ShowName key={index} name={person.name} />
        ))}
      </>
    );
  };
  
  export default Names;
  