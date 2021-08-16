import React, {useRef, useState} from 'react'
import {Card, Form, Button, Alert, Nav } from 'react-bootstrap' 
import {useAuth} from '../contexts/AuthContext'
import {Link, useHistory} from 'react-router-dom'

export default function Login() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const {login} = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()


    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push("/")
        } catch {
            setError("Failed to sign in")
        }
        
        setLoading(false)
    }

    return (
        <div>
            <Nav>
            <Button className = "nav-button" onClick={(e) => window.location.href='/'}> <i class="fa fa-fw fa-home"></i></Button>
            </Nav>
            <Card style={{flex:1, backgroundColor:'black', color: 'white'}}>
                <Card.Body>
                    <h2 className="text-center mb-4">Login</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type ="email" ref={emailRef} required/>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type ="password" ref={passwordRef} required/>
                        </Form.Group>
                        <Button disabled = {loading} className="w-100" type="submit">Login</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Link to="/signup">Dont have an account? Signup!</Link>
            </div>
        </div>
    )
}
