import React from "react";
import axios from "axios";


class CreateUser extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: ""
        }
    }

    onChangeHandler = event => {
        const { name, value } = event.target;

        this.setState({ [name]: value })
    }

    onSubmit = (event) => {
        event.preventDefault();


        const user = {
            username: this.state.username
        }


        axios.post("http://localhost:5000/users/add", user).then(() => console.log("user added")).catch(err => console.log(err));
        this.setState({ username: "" })

    }

    render() {
        return (
            <div>
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                            required
                            name="username"
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeHandler}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }

}

export default CreateUser