import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

class EditExercise extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            description: "",
            duration: 0,
            date: new Date(),

        }

    }

    componentDidMount() {
        axios.get("http://localhost:5000/excercise/" + this.props.match.params.id)
            .then(res => {
                const { username, description, duration, date } = res.data;
                this.setState({
                    username: username,
                    description: description,
                    duration: duration,
                    date: new Date(date)

                })
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

        axios.put("http://localhost:5000/excercise/update/" + this.props.match.params.id, excercise).then(() => console.log("excercise edited!")).catch(err => console.log(err))
        window.location = "/";

    }


    render() {
        return (
            <div>
                <h3>Edit Exercise Log</h3>
                <form onSubmit={this.onSubmit}>

                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                            name="username"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeHandler}
                        />
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
                        <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }

}

export default EditExercise