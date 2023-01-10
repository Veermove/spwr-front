import React, { useRef, useState, useCallback } from 'react';
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from '../context/AuthContext';


export default function Signup () {
    const
        emailRef = useRef<HTMLInputElement | null>(null),
        nameRef = useRef<HTMLInputElement | null>(null),
        profRef = useRef<HTMLInputElement | null>(null),
        studRef = useRef<HTMLInputElement | null>(null),
        passwordRef = useRef<HTMLInputElement | null>(null),
        confirmRef = useRef<HTMLInputElement | null>(null),
        [error, setError] = useState(""),
        [loading, setLoading] = useState(false),
        { signup } = useAuth()!;

    const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (emailRef.current       === null
            || passwordRef.current === null
            || confirmRef.current  === null
            || nameRef.current  === null
        ) {
            return setError("Please fill all required fields.");
        }

        if (passwordRef.current.value !== confirmRef.current.value) {
            return setError("Passwords do not match.");
        }
        try {
            setError("");
            setLoading(true);
            await signup(
                emailRef.current.value,
                passwordRef.current.value,
                nameRef.current.value,
                [
                    profRef.current === null
                        ? false
                        : profRef.current.checked,
                    studRef.current === null
                        ? false
                        : studRef.current.checked
                ],
            );
        } catch({ message }) {
            setError("Failed to create account. " + message);
        };

        setLoading(false);
        }, [signup]);

    return (
    <>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Sign Up!</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required />
                    </Form.Group>
                    <Form.Group id="name">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" ref={nameRef} required />
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required />
                    </Form.Group>
                    <Form.Group id="password-confirm">
                        <Form.Label>Confirm password</Form.Label>
                        <Form.Control type="password" ref={confirmRef} required />
                    </Form.Group>
                    <Form.Group id="pwrAssoc">
                        <Form.Label>Student or Professor?</Form.Label>
                        <br/>
                        <Form.Check
                            inline
                            label="Student"
                            name="pwrAssoc"
                            type={"checkbox"}
                            id={"student"}
                            ref={studRef}
                        />
                        <Form.Check
                            inline
                            label="Professor"
                            name="pwrAssoc"
                            type={"checkbox"}
                            id={"prof"}
                            ref={profRef}
                        />
                        <br/>
                    </Form.Group>
                    <Button disabled={loading} className="w-100" type="submit">Sign up!</Button>
                </Form>
            </Card.Body>
        </Card>
    </>
    )
}
