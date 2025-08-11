import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { login, register } from '../api/auth'; 

interface AuthFormProps {
    onLogin: (user: { id: string; name: string; email: string }) => void;
}

export const AuthForm = ({ onLogin }: AuthFormProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

    try {
        if (isLogin) {
            const response = await login ({email, password});
            if (response.user && response.user.id) {
                onLogin({
                    id: response.user.id,
                    name: response.user.name,
                    email: response.user.email,
                });
            }
            else {
                console.error("Registration failed. Please try again.");
            }
    } else {
            const response = await register({ name, email, password });
            if (response.user && response.user.id) {
                onLogin({
                    id: response.user.id,
                    name: response.user.name,
                    email: response.user.email,
                });
            } else {
                console.error("Registration failed. Please try again.");
            }
        }
    } catch (err: any) {
        console.error("Authentication error:", err);
        if(err.response?.status === 409)  {
            setError("Email already exists. Please use a different email.");
        } else if (err.response?.data?.error) {
            setError(err.response.data.error);
        } else {
            setError("An error occurred. Please try again.");
        }
    } finally {
        setLoading(false);
    }
}
    return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100 px-">
                <Form className="border p-4 rounded-3 w-100" style={{ maxWidth: '500px' }} onSubmit={handleSubmit}>
                    <h2 className="text-center fw-bolder"> {isLogin ? ("Sign in") : ("Sign up")}</h2>
                    <p className="text-center text-muted">
                        {isLogin ? ("Enter your credentials to access your account") : ("Fill in your details to create a new account")}</p>
                        {!isLogin && (
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Label className="fw-bold">Name</Form.Label>
                                <Form.Control 
                                type="text" 
                                value={name}
                                placeholder="Enter your name" 
                                onChange={(e) => setName(e.target.value)}
                                required
                                />
                            </Form.Group>
                        )}
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="fw-bold">Email</Form.Label>
                            <Form.Control 
                            type="email" 
                            value={email}
                            placeholder="Enter your email" 
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label className="fw-bold">Password</Form.Label>
                            <Form.Control 
                            type="password" 
                            value={password}
                            placeholder="Enter your password"
                            onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        {error && (
                            <div className="text-red-500 text-sm text-center p-2 bg-red-50 rounded">
                                {error}
                            </div>
                        )}
                        <div className="d-flex flex-column flex-sm-row gap-2">
                            <Button variant="primary" type="submit" className="flex-fill">
                            {loading ? "Processing.." : (isLogin ? ( "Sign In" ) : ( "Sign Up" ))}
                            </Button> 
                            <Button variant="light" type="button" className="flex-fill"  onClick={() => setIsLogin(!isLogin)}>
                                {isLogin ? ("Doesn't have an account? Sign Up") : ("Already have an account? Sign In")}
                            </Button>
                        </div>
                </Form>
        </Container>
    )
}