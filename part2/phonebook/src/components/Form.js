const Form = (props) => {
  
  return (
      <div>
	      < form onSubmit = {props.onSubmit} >
        <div>name: <input value={props.name} onChange={props.onNameChange} /></div>
        <div>number: <input value={props.number} onChange={props.onNumbChange}/></div>
          <div>
            <button type="submit">add</button>
          </div>
        </form >
      </div>
  )

}
export default Form