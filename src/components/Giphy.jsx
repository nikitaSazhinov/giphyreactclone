import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Loader from './Loader';
import Pages from './Pages';
import {Button, ButtonGroup, Nav, Container, Row, Col, Modal} from 'react-bootstrap'
import {useAuth} from '../contexts/AuthContext' 
import {useHistory} from 'react-router-dom'
import './Giphy.css'

const Giphy = () => {

    const [data, setData] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [isError, setError]= useState(false)
    const [search, setSearch]= useState("")

    const [currPage, setPage]= useState(1)
    const [itemsPerPage, setItemsPerPage]= useState(10)
    const idxLastItem = currPage * itemsPerPage;
    const idxFirstItem = idxLastItem - itemsPerPage;
    const currItems = data.slice(idxFirstItem, idxLastItem)

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

    useEffect(() => {
        const fetchData = async () => {
            setError(false)
            setLoading(true)

            try {
                const results = await axios("https://api.giphy.com/v1/gifs/trending", 
                {params: {
                    api_key: "P4jbuZfGCfPyMLNlDBFP2SumJ4CIWiZN",
                    limit: 100
                }
                });
                console.log(results);
                setData(results.data.data);
            }
            catch (err) {
                setError(true)
                setTimeout(() => setError(false), 4000)
            }
            
            setLoading(false)
        }

        fetchData()
    }, []);


    
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const renderGifs = () => {
        //TODO: Download/Share gif button functionality and modal.
        if (isLoading) {
            return <Loader/>
        }
        return currItems.map(el => {
            return (
            
                <div key={el.id} className="gif" >
                    <div class="container">
                    <img alt="" src={el.images.fixed_height.url} class="image"/>
                    {currentUser && <div  class="overlay"><Button onClick={handleShow}><i class="fa fa-download" aria-hidden="true"></i></Button></div>}
                    </div>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                        <Modal.Title>Save GIF</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>dsds</Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Save Changes
                        </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                
            );
        });
    };

    const renderError = () => {
        if (isError) {
            return (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    Error has occured
                </div>
            )
        }
   }

   //Search
   const handleSubmit = async event => {
    event.preventDefault();
    setError(false)
    setLoading(true)

    try {
        const results = await axios("https://api.giphy.com/v1/gifs/search", {
            params: {
            api_key: "P4jbuZfGCfPyMLNlDBFP2SumJ4CIWiZN",
            q: search
            }
        });
        setData(results.data.data);
    } 
    catch {
        setError(true)
        setTimeout(() => setError(false), 4000)
    }
        setLoading(false)
    };

    const handleSearch = event => {
        setSearch(event.target.value);
    };

   const pageSelected = (pageNumber) => {
        setPage(pageNumber)
   }


    return (
        <div className="m-2">
            {renderError()}
            
            <Container>
                <Row>
                    <Col>


                    <div class="input-group" >
                    <Button className = "nav-button" onClick={(e) => window.location.href='/'}> <i class="fa fa-fw fa-home"></i></Button>

                    <div class="form-outline" >
                        <input type="text" id="form1" placeholder="search" className="form-control"
                        onChange={handleSearch} value={search}/>
                    </div>
                        <button onClick={handleSubmit} type="submit" className="btn btn-primary">    
                        <i class="fas fa-search"></i></button>        
                    </div>
                    
                    </Col>

                    <Col>
                    
                        <Nav className="justify-content-end">
                        <ButtonGroup>
                        {currentUser && <Button onClick={(e) => window.location.href='/profile'}><i class="fa fa-user" aria-hidden="true"></i></Button>}
                        {currentUser && <Button onClick={handleLogout}><i class="fas fa-sign-out-alt"></i></Button>}
                        {!currentUser && 
                        <ButtonGroup><Button onClick={(e) => window.location.href='/login'}>Login</Button>
                        <Button onClick={(e) => window.location.href='/signup'}>Signup</Button></ButtonGroup>  
                        }
                        </ButtonGroup>
                        </Nav>
                    </Col>
                </Row>
                <Row>
                    <Pages  currPage={currPage} itemsPerPage={itemsPerPage} 
                    totalItems={data.length} pageSelected={pageSelected}/>
                </Row>  
            </Container>
           
            <div className="container gifs">{renderGifs()}</div>
        </div>
    )
}

export default Giphy;
