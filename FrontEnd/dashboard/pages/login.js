import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button, TextField, Container, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext';

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const { login, isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            router.push('/dashboard');
        }
    }, [isAuthenticated, isLoading, router]);

    const handleSubmit = async (e) => {
        console.log('clicou no singin');
        e.preventDefault();
        await login(email, senha);
        console.log('redirecionando pro dashboard')
        router.push('/dashboard');
        
    };

    return (
        <Container component="main" maxWidth="xs">
            <Typography component="h1" variant="h5">Login</Typography>
            <form onSubmit={handleSubmit} noValidate>
                <TextField 
                    variant="outlined" 
                    margin="normal" 
                    required 
                    fullWidth 
                    label="Email Address" 
                    name="email" 
                    autoComplete="email" 
                    autoFocus 
                    onChange={e => setEmail(e.target.value)} 
                />
                <TextField 
                    variant="outlined" 
                    margin="normal" 
                    required 
                    fullWidth 
                    name="senha" 
                    label="Senha" 
                    type="password" 
                    id="senha" 
                    autoComplete="current-password" 
                    onChange={e => setSenha(e.target.value)} 
                />
                <Button 
                    type="submit" 
                    fullWidth 
                    variant="contained" 
                    color="primary"
                >
                    Sign In
                </Button>
            </form>
        </Container>
    );
}
