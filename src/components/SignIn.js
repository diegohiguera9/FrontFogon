import '../styles/components/SignIn.scss'
import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import Auth0Button from './Auth0Button';

const SignIn = ()=>{
    let navigate = useNavigate();
    const passwordRegex = new RegExp(
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,14}$/
    );
    

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        done: false
      })
    
      const [touch, setTouch] = useState({
        name: false,
        email: false,
        password: false,
        done: false
      })
    
      const [validateName, setVname] = useState("")
      const [validatePassword, setVpassword] = useState("")
      const [validateEmail, setVemail] = useState("")
    
      const [disabled, setDisabled] = useState(true)
      const [error,setError] = useState(undefined)
    
      const validate = values => {
    
        if (!values.name) {
          setVname('Required');
        } else if (values.name.length < 4) {
          setVname('Must be 4 characters minimum');
        } else {
          setVname("")
        }
    
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
        setDisabled(!(data.done && !validateName && !validateEmail && !validatePassword))
      }
    
      const HandleChange = (e) => {
        const { name, checked, value, type } = e.target
        setData(prevData => {
          return {
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
          }
    
        })
      }
    
      const HandleBlur = (e) => {
        const { name, checked, type } = e.target
        setTouch({
          ...touch,
          [name]: type === 'checkbox' ? checked : true
        })
      }
    
      const HandleSubmit = (e) => {
        e.preventDefault();
    
        axios.post("https://diegohtop24.herokuapp.com/user/signup", {...data,role:'basic'}
        ).then((res) => {
          setData({
            name: "",
            email: "",
            password: "",
            done: false
          })
          setError(undefined)
          const token = res.data.token
          localStorage.setItem('token',token)
          navigate('/pedido')
        }).catch((err) => {
          alert('error1')
          setError(err.response.data) 
        })
      }
    
      const { name, email, password, done } = data
      return (
        <div className="App_form">
          <form onSubmit={HandleSubmit} className='form'>
            <label htmlFor='name'>Name</label>
            <input
              id="name"
              name='name'
              type='text'
              onSelect={e => HandleBlur(e)}
              onChange={e => HandleChange(e)}
              value={name}
              className={touch.name && validateName ?'form__error':'input'}
            />
            {touch.name && validateName ? (
              <div className='form__text__error'>{validateName}</div>
            ) : <div className='transparetn'>Transparent</div>}
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
            <button type='submit' disabled={disabled}>Enviar</button>
            <div visibility={error?'visible':'hidden'} className='form__errorM'>{error && `Ups! ${error.message}`}</div>
          </form>
          <Auth0Button/>
    
        </div>
      );
}

export default SignIn;