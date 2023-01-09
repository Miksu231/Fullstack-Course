import Name from './Name.js'

const Persons = (props) => {

  let list = (props.search === '') ? props.list : props.list.filter(person => {
    return person.name.toLowerCase().includes(props.search.toLowerCase())
  })
  return (
    <div>
      <ul>
        {list.map(person => <Name key={person.id} content={person.name} number={person.number} state={props.list} stateChange={props.stateChange} id={person.id}/>)}
      </ul>
    </div>
  )
}
export default Persons