import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

class CreateExercise extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            description: "",
            duration: 0,
            date: new Date(),
            users: []
        }

    }

    componentDidMount() {
        axios.get("http://localhost:5000/users").then(res => {
            if (res.data.length > 0) {
                this.setState({
                    users: res.data.map(user => user.username),
                    username: res.data[0].username
                })
            }
        })
    }


    onChangeHandler = event => {
        const { name, value } = event.target;

        this.setState({ [name]: value })
    }

    onChangeDate = (date) => {
        this.setState({ date: date })
    }


    onSubmit = (event) => {
        event.preventDefault();


        const excercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date,
        }

        axios.post("http://localhost:5000/excercise/add", excercise).then(() => console.log("excercise added!")).catch(err => console.log(err))

        console.log(excercise);
        window.location = "/";

    }


    render() {
        return (
            <div>
                <h3>Create New Exercise Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref="userInput"
                            required
                            name="username"
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeHandler}>

                            {

                                this.state.users.map(function (user, id) {
                                    return <option
                                        key={id}
                                        value={user}>{user}
                                    </option>;
                                })
                            }

                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                            name="description"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeHandler}
                        />
                    </div>
                    <div className="form-group">
                        <label>Duration (in minutes): </label>
                        <input
                            required
                            type="text"
                            name="duration"
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.onChangeHandler}
                        />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }

}

export default CreateExercise