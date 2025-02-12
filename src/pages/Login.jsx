import { useState } from 'react'
import { TextField, Button, Stack } from '@mui/material'

const Login = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [data, setData] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    const sendLogin = async () => {
        setIsError(false)
        setIsLoading(true)
        const reqHeaders = new Headers()
        reqHeaders.append("credentials", "include")
        reqHeaders.append("Content-Type", "application/json")

        try {
            const result = await fetch("https://frontend-take-home-service.fetch.com/auth/login", 
                {
                    method: "POST",
                    body: JSON.stringify({ name, email }),
                    headers: reqHeaders,
                    credentials: "include"
                })

            setData(result)
        } catch (error) {
            setIsError(true)
        }

        setIsLoading(false)
    }

    const onChangeName = (event) => {
        setName(event.target.value)
    }

    const onChangeEmail = (event) => {
        setEmail(event.target.value)
    }

    return(<div>
        <Stack spacing={2}>
            <TextField
                id="name-field"
                label="Name"
                variant="outlined"
                margin="normal"
                value={name}
                onChange={(e) => onChangeName(e)}
            />
            <TextField
                id="email-field"
                label="Email"
                variant="outlined"
                margin="normal"
                value={email}
                onChange={(e) => onChangeEmail(e)}
            />
            <Button variant="contained" onClick={() => sendLogin()} >Login</Button>
        </Stack>
    </div>)
}

export default Login
