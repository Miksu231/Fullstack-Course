const Filter = (props) => {

  return (
    <div>find countries <input value={props.search} onChange={props.onChange} /></div>
  )
}
export default Filter