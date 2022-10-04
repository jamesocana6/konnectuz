import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Header from '../components/Header'

/////////////////////////////////////////////////////////////////// 
// '/signup' route
// creates Users and alerts if trying to use an existing username
///////////////////////////////////////////////////////////////////

const SignUpPage = (props) => {
  let history = useHistory()
  const [users, setUsers] = useState(null)

  // sign up form initially set to empty values
  const [signUp, setSignUp] = useState({
    username: "",
    password: "",
    posts: [],
    image: ""
  })

  // where User data is stored
  const URL = 'http://localhost:4000/user/'

  // grab User data from MongoDB
  const getUsers = async () => {
    const response = await fetch(URL)
    const data = await response.json()

    setUsers(data)
  }

  // create a user using information from sign up form
  const createUser = async (formData) => {
    // by default fetch GETs, change to POST to create
    await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json"
      },
      body: JSON.stringify(formData)
    })
    getUsers()
  }

  useEffect(() => {
    getUsers()
  }, [])

  // handleChanges made to form when user types
  const handleChange = (event) => {
    // spread signUp object
    // reassign [key]:value pairs from 'input'
    setSignUp({ ...signUp, [event.target.name]: event.target.value })
  }

  // creates the new user, resets state of signUp to empty, redirects to '/'
  const handleSubmit = (event) => {
    // stop page from refreshing
    event.preventDefault()

    // search database if username exists, returns undefined if there is no match
    const taken = users.find((user) => user.username === signUp.username)
    // console.log('taken', taken)
    // console.log('signUp', signUp)

    // if 'taken' is 'undefined' createUser
    if (taken === undefined) {
      createUser(signUp)
      console.log('created user', signUp)
      console.log('everybody', users)

      // reset signUp
      setSignUp({
        username: "",
        password: "",
        posts: [],
        image: ""
      })

      // redirect to '/'
      history.push("/")

    }
    // username does exist
    else {
      alert('Username already exists! Try a different one.')
    }
  }

  return (
    <div id="signUpPage">
      <Header />
      <h1>Sign Up</h1>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div class="row justify-content-md-center">
            <div className="col col-lg-5">
              <div>
                <label>Username</label>
                <input
                  type="text"
                  value={signUp.username}
                  name="username"
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div>
                <label>Password</label>
                <input
                  type="password"
                  value={signUp.password}
                  name="password"
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div>
                <label>Profile Picture (URL)</label>
                <input
                  type="text"
                  value={signUp.image}
                  name="image"
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <input type="submit" value="Create Profile"></input>
            </div>

          </div>
        </form>
      </div >
    </div >
  )
}

export default SignUpPage