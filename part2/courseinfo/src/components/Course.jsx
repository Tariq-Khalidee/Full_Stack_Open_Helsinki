const Header = ({ name }) => (
    <h2>{name}</h2>
)

const Content = ({ parts }) => (
    <>
        {parts.map(item => <Part key={item.id} part={item} />)}
    </>
)

const Part = ({ part }) => (
    <p>{part.name} {part.exercises}</p>
)


const SumExercises = ({ parts }) => (
    <p><b>total of {parts.reduce((acc,curr) => acc + curr.exercises,0)} exercises</b></p>
)


const Course = ({ courses }) => (
    <div>
        <h1>Web Development Curriculum</h1>
        {courses.map(course => (
            <div key={course.id}>
                <Header name={course.name} />
                <Content parts={course.parts} />
                <SumExercises parts={course.parts} />
            </div>
        ))}
    </div>
)


export default Course 