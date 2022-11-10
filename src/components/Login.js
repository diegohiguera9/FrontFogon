import '../styles/components/SignIn.scss'
import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import Auth0Button from './Auth0Button';
import { Loader } from '@mantine/core';

const LogIn = ()=>{
  const [loading,setLoading] = useState(false)
    let navigate = useNavigate();
    const passwordRegex = new RegExp(
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,14}$/
    );    

    const [data, setData] = useState({
        email: "",
        password: "",
        done: false
      })
    
      const [touch, setTouch] = useState({
        email: false,
        password: false,
        done: false
      })
          
      const [validatePassword, setVpassword] = useState("")
      const [validateEmail, setVemail] = useState("")
    
      const [disabled, setDisabled] = useState(true)
      const [error,setError] = useState(undefined)
    
      const validate = values => {   
    
        if (!values.password) {
          setVpassword('Required');
        } else if (!passwordRegex.test(values.password)) {
          setVpassword('At least a symbol, upper and lower case letters and number');
        } else {
          setVpassword("")
        }
    
        if (!values.email) {
          setVemail('Required');
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
          setVemail('Invalid email address');
        } else {
          setVemail("")
        }
      }
    
      useEffect(() => {
        validate(data)    
        HandleDisabled()
        // eslint-disable-next-line
      }, [data])   
    
      const HandleDisabled = () => {
        setDisabled(!(data.done && !validateEmail && !validatePassword))
      }
    
      const HandleChange = (e) => {
        const {name, checked, value, type } = e.target
        setData(prevData => {
          return {
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
          }
    
        })
      }
    
      const HandleBlur = (e) => {
        const { name,checked, type } = e.target
        setTouch({
          ...touch,
          [name]: type === 'checkbox' ? checked : true
        })
      }
    
      const HandleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
    
        axios.post(process.env.REACT_APP_HEROKU+"/user/signin",data, {withCredentials:true}
        ).then((res) => {
          setData({
            email: "",
            password: "",
            done: false
          })
          setError(undefined)
          const token = res.data.token
          localStorage.setItem('token',token)
          navigate('/inroute')
        }).catch((err) => {
          setError(err.response.data) 
        })
      }
    
      const { email, password, done } = data
      return (
        <div className="App_form">
          <form onSubmit={HandleSubmit} className='form'>
            <label htmlFor='email'>email</label>
            <input
              id="email"
              name='email'
              type='text'
              onSelect={e => HandleBlur(e)}
              onChange={e => HandleChange(e)}
              value={email}
              className={touch.email && validateEmail ?'form__error':'input'}
            />
            {touch.email && validateEmail ? (
              <div className='form__text__error'>{validateEmail}</div>
            ) : <div className='transparetn'>Transparent</div>}
            <label htmlFor='password'>Password</label>
            <input
              id="password"
              name='password'
              type='password'
              onSelect={e => HandleBlur(e)}
              onChange={e => HandleChange(e)}
              value={password}
              className={touch.password && validatePassword ?'form__error':'input'}
            />
            {touch.password && validatePassword ? (
              <div className='form__text__error'>{validatePassword}</div>
            ) : <div className='transparetn'>Transparent</div>}
            <div className='form__checkbox'>
              <label htmlFor='done'>Ready?</label>
              <input
                id="done"
                name='done'
                type='checkbox'
                onChange={e => HandleChange(e)}
                checked={done}
              />
            </div>
            <button type='submit' disabled={disabled}>{loading?(<Loader color="gray" size="sm"/>):'Enviar'}</button>
            <div visibility={error?'visible':'hidden'} className='form__errorM'>{error && `Ups! ${error.message}`}</div>
          </form>
          <Auth0Button/>
    
        </div>
      );
}

export default LogIn;