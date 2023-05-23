import React, { Component } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from './Auth.css'
import * as actions from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'
import {connect} from 'react-redux'
import { Redirect } from "react-router-dom";
class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email Address',
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false,
            },
            password: {

                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                },
                valid: false,
                touched: false,

            },
        },
        isSignUp:true
    }

    componentDidMount(){
        if(!this.props.building && this.props.authRedirectPath !=='/'){
            this.props.onSetAuthRedirectPath()
        }
    }
    checkValidity(value, rules) {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }
        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }
        return isValid
    }


    inputChangedHandler = (event, inputIdentifier) => {
        const updatedControlsForm = {
            ...this.state.controls
        }
        const updatedFormElement = {
            ...this.state.controls[inputIdentifier]
        }
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true
        updatedControlsForm[inputIdentifier] = updatedFormElement
        let formValid = true
        for (let inputIdentifier in updatedControlsForm) {
            if (updatedControlsForm[inputIdentifier].valid === false) {
                formValid = false;
            }
        }
        this.setState({ controls: updatedControlsForm, formValid: formValid });


    }
    submitHandler=(event)=>{
        event.preventDefault()
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignUp)
    }


    switchAuthModeHandler=()=>{
        this.setState(prevState=>{
            return {isSignUp:!prevState.isSignUp}
        })
    }

    render() {
        let authRedirect=null
        if(this.props.isAuthenticated){
            authRedirect=<Redirect to={this.props.authRedirectPath} />
        }
        const formElementsArray = []
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }
        
        let form =
            formElementsArray.map((formElement) => (
                <Input
                    key={formElement.id}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    value={formElement.config.value} />

            ))
        if (this.props.loading){
            form= <Spinner />
        }

        let errorMessage=null;
        if(this.props.error){
            errorMessage=(
                <p>{this.props.error.message}</p>
            )
        }
        return (
            <div className={classes.Authenticate}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success" disabled={!this.state.formValid}>SUBMIT</Button>
                </form>
                <Button 
                clicked={this.switchAuthModeHandler}
                btnType="Danger" >SWITCH TO {this.state.isSignUp?"SIGNIN":"SIGNUP"}</Button>
            </div>
        )
    }
}
const mapStateToProps= (state)=>{
    return {
        loading:state.auth.loading,
        error:state.auth.error,
        isAuthenticated:state.auth.idToken!==null,
        building:state.burgerBuilder.building,
        authRedirectPath:state.auth.authRedirectPath
    }
}

const mapDispatchToProps=dispatch=>{
    return {
        onAuth:(email,password,isSignUp)=>dispatch (actions.auth(email,password,isSignUp)),
        onSetAuthRedirectPath:()=>dispatch(actions.setAuthRedirectPath('/'))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Auth)