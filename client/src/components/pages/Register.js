import React from 'react'
import Select from 'react-select'
import {
    MDBCard,
    MDBContainer,
    MDBCardHeader,
    MDBCol,
    MDBInput,
    MDBBtn,
    MDBRow
} from "mdbreact"
import {getHash} from '../functions/Functions'
import {register} from '../functions/Services'
import {toast} from 'react-toastify'

export default class Register extends React.Component {

    state = {
        showErr: false,
        errMsg: "Required fields empty or invalid!!!",
        degrees: [{name: "degree", value: "bm", label: "business"}],
        faculties: [{name: "faculty", value: "cf", label: "computing"}]
    }

    handleChange = event => {
        let value = event;
        if (event.target) {
            value = event.target.value;
            this.setState({[event.target.name]: value})
        } else {
            this.setState({[event.name]: event.value})
        }

    }

    handleSubmit = event => {
        this.setState({showErr: false})

        if (this.state.degree && this.state.faculty) {
            const body = {
                "address":this.state.address,
                "firstName": this.state.fname,
                "lastName": this.state.lname,
                "mobile": this.state.phone,
                "email": this.state.email,
                "password": getHash(this.state.password),
                "roles": [{"role": "STUDENT"}],
                "faculty": [this.state.faculty],
                "degree": [this.state.degree],
                "nic": this.state.nic
            }
            register(body)
                .then(res => {
                    console.log(res)
                    toast.success("Registration successful. Click the confirmation link sent to your email")
                    this.props.history.push('/')
                })
                .catch(err => {
                    console.log(err)
                    toast.error("Unable to register the new user")
                })
        } else {
            this.setState({showErr: true})
        }

        event.preventDefault()
        event.stopPropagation()
    }

    render() {
        return (
            <MDBContainer>
                <form onSubmit={this.handleSubmit}>
                    <MDBRow>
                        <MDBCol md="12">
                            <MDBCard className="mb-4">
                                <MDBCardHeader>Student Registration</MDBCardHeader>
                                <MDBRow className="align-items-center justify-content-center p-5">
                                    <MDBRow className="w-75">
                                        <MDBCol md={6}>
                                            <label className="grey-text pt-1">Faculty</label>
                                            <Select options={this.state.faculties} name="faculty"
                                                    onChange={this.handleChange}/>
                                        </MDBCol>
                                        <MDBCol md={6}>
                                            <label className="grey-text pt-1">Degree</label>
                                            <Select options={this.state.degrees} name="degree"
                                                    onChange={this.handleChange}
                                                    value={this.state.to}/>
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow className="w-75">
                                        <MDBCol md={6}>
                                            <MDBInput
                                                label="First Name"
                                                required
                                                name="fname"
                                                error="wrong"
                                                success="right"
                                                onChange={this.handleChange}
                                            />
                                        </MDBCol>
                                        <MDBCol md={6}>
                                            <MDBInput
                                                label="Last Name"
                                                required
                                                name="lname"
                                                error="wrong"
                                                success="right"
                                                onChange={this.handleChange}
                                            />
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow className="w-75">
                                        <MDBCol md={6}>
                                            <MDBInput
                                                label="NIC"
                                                required
                                                name="nic"
                                                error="wrong"
                                                success="right"
                                                onChange={this.handleChange}
                                            />
                                        </MDBCol>
                                        <MDBCol md={6}>
                                            <MDBInput
                                                label="Phone"
                                                required
                                                name="phone"
                                                error="wrong"
                                                success="right"
                                                onChange={this.handleChange}
                                            />
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow className="w-75">
                                        <MDBCol md={6}>
                                            <MDBInput
                                                label="Email"
                                                type="email"
                                                required
                                                validate
                                                name="email"
                                                error="wrong"
                                                success="right"
                                                onChange={this.handleChange}
                                            />
                                        </MDBCol>
                                        <MDBCol md={6}>
                                            <MDBInput
                                                label="Password"
                                                type="password"
                                                required
                                                validate
                                                name="password"
                                                error="wrong"
                                                success="right"
                                                onChange={this.handleChange}
                                            />
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow className="w-75">
                                        <MDBCol md={12}>
                                            <label className="grey-text">
                                                Address
                                            </label>
                                            <textarea
                                                name="address"
                                                className="form-control"
                                                rows="4"
                                                onChange={this.handleChange}
                                                required
                                            />
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow className="w-75 mt-2">
                                        <MDBCol>
                                            {this.state.showErr && <p style={{color: 'red'}}>{this.state.errMsg}</p>}
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow className="w-75">
                                        <MDBCol className="text-right">
                                            <MDBBtn className="mr-0 mt-3" color="indigo" type="submit">Register</MDBBtn>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBRow>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </form>
            </MDBContainer>
        )
    }
}