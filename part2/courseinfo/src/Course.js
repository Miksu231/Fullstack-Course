const Header = (props) => {
  return (
    <div>
      <h1>
        {props.course.name}
      </h1>
    </div>
  )
}
const Part = (props) => {
  return (
    <div>
      <p>
        {props.part} {props.exercises}
      </p>
    </div>
  )
}
const Content = (props) => {
  const partList = props.course.parts.map((item) => {
    return (<Part key={item.id} part={item.name} exercises={item.exercises} />)
  })
  return (
    <div>
      {partList}
    </div>
  )
}
const Total = (props) => {
  return (
    <div>
      <p>
        <b>Total of {props.course.parts.map(item => item.exercises).reduce((a, b) => a + b)} exercises</b>
      </p>
    </div>
  )
}
const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )

}
export default Course