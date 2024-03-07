import { useAuthRedirect } from '../hooks/useAuthRedirect';
import { useAuth } from '../context/AuthContext';
import { Typography } from '@mui/material';

export default function Dashboard() {
    console.log('foi no dashboard');
    useAuthRedirect(); // Redireciona se não estiver autenticado
    const { user, logout } = useAuth();

    

    return (
        <div>
            <Typography variant="h4">Dashboard</Typography>
            {user && <Typography>E aewwwww, {user.name}</Typography>}
            <button onClick={logout}>Logout</button>
        </div>
    );
}
