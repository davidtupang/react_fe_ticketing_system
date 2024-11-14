function Introduction(props) {
    console.log("Parameter Kiriman: ", props.name);
  return (
    <div>
     <h1>Menu {props.name}</h1>
     <p>Detail Menu </p>
    </div>
  );
}

export default Introduction;
