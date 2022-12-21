const Header = (props) => {
    return(
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
    const partList = props.course.parts.map((item, index) => {
      return (<Part key={index} part={item.name} exercises={item.exercises} />)
    })
    return (
        <div>
            {partList}
        </div>
    )
}
const Total = (props) => {
    return(
    <div>
        <p>
                Number of exercises {props.course.parts.map(item => item.exercises).reduce((a, b) => a + b)}  
        </p>
        </div>
    )
}
const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            }
        ]
    }
    return (
        <div>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
        </div>
    )
}

export default App