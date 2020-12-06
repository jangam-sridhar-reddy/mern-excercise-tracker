import React from "react";
import axios from "axios";


import Exercise from "./excercise.component";



class ExercisesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            excercise: []
        }
    }

    componentDidMount() {
        axios.get("http://localhost:5000/excercise").then((res) => {
            this.setState({
                excercise: res.data
            })

        })
    }


    deleteExcercise = (id) => {
        axios.delete("http://localhost:5000/excercise/" + id).then(res => console.log(res.data));

        this.setState({
            excercise: this.state.excercise.filter(el => el._id !== id)
        })

    }

    exerciseList() {
        return this.state.excercise.map(currentexercise => {
            return <Exercise exercise={currentexercise} deleteExercise={this.deleteExcercise} key={currentexercise._id} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Logged Exercises</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.exerciseList()}
                    </tbody>
                </table>
            </div>
        )
    }

}

export default ExercisesList