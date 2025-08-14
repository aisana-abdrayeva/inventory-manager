import { useState, useMemo, useEffect } from "react";
import { Trash2, Unlock, Lock } from "lucide-react";
import { Button, Form, Table, Container, Row, Col } from 'react-bootstrap';
import { getUsers, blockUser, unblockUser, deleteUser } from "../services/users/users";

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    lastLogin: string;
    status: "active" | "blocked";
}

interface AdminProps {
    currentUser: { id: string; name: string; email: string };
    onLogout: () => void;
}

export const Admin = ({ currentUser, onLogout }: AdminProps) => {
const [users, setUsers] = useState<User[]>([]);
const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
const [loading, setLoading] = useState(false);

const allSelected = selectedUsers.size === users.length && users.length > 0;

useEffect(() => {
    const fetchUsers = async () => {
        setLoading(true);
        const usersData = await getUsers();
        setUsers(usersData);
        setLoading(false);
    };
    fetchUsers();
}, []);

const handleSelectAll = () => {
    if (allSelected) {
        setSelectedUsers(new Set());
    } else {
        setSelectedUsers(new Set(users.map(user => user.id)));
    }
};

const handleSelectUser = (userId: string) => {
    const newSelected = new Set(selectedUsers);
    if (newSelected.has(userId)) {
    newSelected.delete(userId);
    } else {
    newSelected.add(userId);
    }
    setSelectedUsers(newSelected);
};

const handleBlock = async () => {
    if (selectedUsers.size === 0) return;
    
    try {
    const userId = selectedUsers.values().next().value;
    if (!userId) return;
    await blockUser(userId);
    setUsers(users.map(user => 
        selectedUsers.has(user.id) ? { ...user, status: "blocked" as const } : user
    ));
    setSelectedUsers(new Set());
    console.log(`${selectedUsers.size} user(s) have been blocked.`);
    } catch (error) {
    console.error("Error blocking users:", error);
    }
};

const handleUnblock = async () => {
    if (selectedUsers.size === 0) return;
    
    try {
    const userId = selectedUsers.values().next().value;
    if (!userId) return;
    await unblockUser(userId);
    setUsers(users.map(user => 
        selectedUsers.has(user.id) ? { ...user, status: "active" as const } : user
    ));
    setSelectedUsers(new Set());
    console.log(`${selectedUsers.size} user(s) have been unblocked.`);
    } catch (error) {
    console.error("Error unblocking users:", error);
    }
};

const handleDelete = async () => {
    if (selectedUsers.size === 0) return;
    
    try {
    const userId = selectedUsers.values().next().value;
    if (!userId) return;
    await deleteUser(userId);
    setUsers(users.filter(user => !selectedUsers.has(user.id)));
    setSelectedUsers(new Set());
    console.log(`${selectedUsers.size} user(s) have been deleted.`);
    } catch (error) {
    console.error("Error deleting users:", error);
    }
};

const selectedCount = selectedUsers.size;
const hasBlockedUsers = useMemo(() => 
    Array.from(selectedUsers).some(id => 
    users.find(user => user.id === id)?.status === "blocked"
    ), [selectedUsers, users]);

return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}> 
    {/* Header */}
    <header className="bg-light border-bottom">
        <Container fluid>
            <Row className="py-4">
                <Col xs={12} md={8}>
                <h1 className="h3 fw-bold text-dark"> Admin Dashboard</h1>
                <p className="text-muted"> Manage users, roles, and permissions</p>
                </Col>
                <Col xs={12} md={4} className="d-flex align-items-center justify-content-end gap-3">
                <span className="text-muted small">
                    Welcome, {currentUser.name}
                </span>
                <Button variant="outline-secondary" onClick={onLogout}>
                    Logout
                </Button>
                </Col>
            </Row>
        </Container>
    </header>

    {/* Main Content */}
    <main>
        <Container fluid className="px-4 py-6">
        {/* Toolbar */}
        <div className="mb-4">
            <Container fluid className="p-3 bg-light rounded-lg border">
                <Row className="align-items-center">
                    <Col xs={12} md={6} className="d-flex align-items-center gap-2">
                        <span className="text-muted small">
                            {selectedCount > 0 ? `${selectedCount} user(s) selected` : "No users selected"}
                        </span>
                    </Col>
                    <Col xs={12} md={6} className="d-flex justify-content-end gap-2">
                        <Button
                        onClick={handleBlock}
                        disabled={selectedCount === 0}
                        variant="outline-danger"
                        >
                        <Lock className="me-2" size={16}/> Block
                        </Button>
                        <Button
                            onClick={handleUnblock}
                            disabled={selectedCount === 0 || !hasBlockedUsers}
                            variant="outline-warning"
                        >
                        <Unlock className="me-2" size={16} /> Unblock
                        </Button>

                        <Button
                            onClick={handleDelete}
                            disabled={selectedCount === 0}
                            variant="outline-danger"
                        >
                        <Trash2 className="me-2" size={16} /> Delete 
                        </Button>
                    </Col>
                </Row>
            </Container>
        </div>

        {/* Users Table */}
        <div className="bg-light rounded-lg border p-3">
        <Table striped bordered hover responsive>
            <thead>
            <tr>
                <th style={{ width: '3rem' }}>
                <Form.Check
                    type="checkbox"
                    checked={allSelected}
                    onChange={handleSelectAll}
                    aria-label="Select all users"
                />
                </th>
                <th>Name</th>
                <th>Email</th>
                <th>Last Login</th>
                <th>Status</th>
            </tr>
            </thead>
            <tbody>
            {users.map((user) => (
                <tr key={user.id}>
                <td>
                    <Form.Check
                    type="checkbox"
                    checked={selectedUsers.has(user.id)}
                    onChange={() => handleSelectUser(user.id)}
                    aria-label={`Select ${user.name}`}
                    />
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.lastLogin}</td>
                <td>
                    <div
                    className={`badge ${
                        user.status === 'active'
                        ? 'bg-primary text-white'
                        : 'bg-danger text-white'
                    }`}
                    >
                    {user.status}
                    </div>
                </td>
                </tr>
            ))}
            </tbody>
        </Table>
    </div>

        {users.length === 0 && (
        <div className="text-center py-12">
            <p className="text-muted-foreground">No users found.</p>
        </div>
        )}
    </Container>
    </main>
    </div>
);
};