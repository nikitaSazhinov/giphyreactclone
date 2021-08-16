import React, {useState, useEffect} from 'react'
import {Nav, Button, Container, ButtonGroup, Row,
     Col} from 'react-bootstrap'
import {useAuth} from '../contexts/AuthContext' 
import {useHistory} from 'react-router-dom'
import database from "../firebase";
import Upload from './Upload';

export default function Profile() {

    const [isError, setError]= useState(false)
    const history = useHistory()
    const {currentUser, logout} = useAuth()
    async function handleLogout() {
        setError(false)

        try {
            await logout()
            history.push("/login")
        } catch {
            setError(true)
        }
    }

    //TODO: Display GIFs uploaded by the user
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        database.collection("gifcolleciom").orderBy("time", "desc")
        .onSnapshot((querySnapshot) => {
            const _posts =[];

            querySnapshot.forEach((doc) => {
                _posts.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });

            setPosts(_posts);
        })
       
    }, [])

    return (
        <div>
                <Container>
                    <Row>
                    <Col>
                    <Nav>
                    <Button className = "nav-button" onClick={(e) => window.location.href='/'}> <i class="fa fa-fw fa-home"></i></Button>
                    </Nav>
                    </Col>
                    <Col>
                    <Nav className="justify-content-end">
                    <ButtonGroup>
                        {currentUser && <Button onClick={(e) => window.location.href='/profile'}><i class="fa fa-user" aria-hidden="true"></i></Button>}
                        {currentUser && <Button onClick={handleLogout}><i class="fas fa-sign-out-alt"></i></Button>}
                        </ButtonGroup>
                    </Nav>
                    </Col>
                    </Row>
                </Container>
                <Upload/>
        </div>
    )
}
