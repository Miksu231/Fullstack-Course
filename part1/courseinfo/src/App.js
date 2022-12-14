const Header = (props) => {
    return(
    <div>
        <h1>
            {props.course}
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
    const partList = props.parts.map((item) => {
       return(<Part part={item.name} exercises={item.exercises} />)
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
                Number of exercises {props.exercises.reduce((a,b)=> a+b, 0)}  
        </p>
        </div>
    )
}
const App = () => {
    const course = 'Half Stack application development'
    const part1 = {
        name: 'Fundamentals of React',
        exercises: 10
    }
    const part2 = {
        name: 'Using props to pass data',
        exercises: 7
    }
    const part3 = {
        name: 'State of a component',
        exercises: 14
    }

    return (
        <div>
            <Header course={course} />
            <Content parts={[part1, part2, part3]} />
            <Total exercises={[part1.exercises, part2.exercises, part3.exercises]} />
        </div>
    )
}

export default App