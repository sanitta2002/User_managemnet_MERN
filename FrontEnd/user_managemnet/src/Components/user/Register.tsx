import { useState, type FormEvent } from "react"
import { Api } from "../../Api/UserApi"
import type { User } from "../../Interfase/User"


function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, SetPassword] = useState('')
  const [Cpassword, setCpassword] = useState('')


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!name.trim() || !email.trim() || !password.trim() || !Cpassword.trim()) {
      alert("Please fill in all fields")
      return
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      alert("Invalid email format.")
    }
    if (password && password.length < 6) {
      alert("Password must be at least 6 characters long.")
    }

    if (password !== Cpassword) {
      alert("Passwords do not match.")
    }
    console.log(name, email, password)
    try {
      const response = await Api.post<User>('/user/signup', {
        name,
        email,
        password
      })
      console.log(response.data)
      alert("Registration successful!")
      setName("");
      setEmail("");
      SetPassword("");
      setCpassword("");
    } catch (error) {

    }
  }
  return (
    <div >
      <div>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter your Name" /><br/>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Enter your Email" /><br/>
          <input value={password} onChange={(e) => SetPassword(e.target.value)} type="text" placeholder="Enter your Password" /><br/>
          <input value={Cpassword} onChange={(e) => setCpassword(e.target.value)} type="text" placeholder="Confirm Possword" /><br/>
          <button>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Register
