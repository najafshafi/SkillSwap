import React, { useState } from 'react';
import {
    Container,
    Row,
    Col,
    Form,
    Button,
    Card,
    Alert
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';
import { courseApi } from '../../utils/api';

const AddCourse = () => {
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        hours: '',
        category: '',
        instructor: '',
    });
    const [courseImage, setCourseImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Categories for the dropdown
    const categories = [
        'Graphic Designing',
        'Programming & Development',
        'Data & Analytics',
        'Cybersecurity & Networking',
        'Digital Marketing'
    ];

    // Check if user is authenticated and is admin
    React.useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        if (!user.isAdmin) {
            navigate('/');
        }
    }, [isAuthenticated, user, navigate]);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle image upload
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCourseImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccess('');

        try {
            // Validate form data
            if (!formData.title || !formData.description || !formData.price ||
                !formData.hours || !formData.category || !formData.instructor) {
                setError('Please fill in all required fields.');
                setIsLoading(false);
                return;
            }

            // Create the course data object
            const courseData = {
                ...formData,
                courseImage: courseImage
            };

            // Submit the course data
            const response = await courseApi.createCourse(courseData);

            // Handle success
            setSuccess('Course created successfully!');
            setFormData({
                title: '',
                description: '',
                price: '',
                hours: '',
                category: '',
                instructor: ''
            });
            setCourseImage(null);
            setImagePreview(null);

            // Navigate to course details after a short delay
            setTimeout(() => {
                navigate(`/course/${response.course.url}`);
            }, 2000);

        } catch (err) {
            setError(err.message || 'Failed to create course. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col md={10} lg={8}>
                    <Card className="shadow-sm border-0">
                        <Card.Header className="bg-primary text-white py-3">
                            <h4 className="mb-0">Add New Course</h4>
                        </Card.Header>
                        <Card.Body className="p-4">
                            {error && <Alert variant="danger">{error}</Alert>}
                            {success && <Alert variant="success">{success}</Alert>}

                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col md={8}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Course Title</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="title"
                                                value={formData.title}
                                                onChange={handleChange}
                                                placeholder="Enter course title"
                                                required
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col md={4}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Price ($)</Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="price"
                                                value={formData.price}
                                                onChange={handleChange}
                                                placeholder="0.00"
                                                min="0"
                                                step="0.01"
                                                required
                                            />
                                            <Form.Text className="text-muted">
                                                Enter 0 for free courses
                                            </Form.Text>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Form.Group className="mb-3">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        placeholder="Detailed course description"
                                        rows={4}
                                        required
                                    />
                                </Form.Group>

                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Category</Form.Label>
                                            <Form.Select
                                                name="category"
                                                value={formData.category}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="">Select a category</option>
                                                {categories.map((cat, index) => (
                                                    <option key={index} value={cat}>{cat}</option>
                                                ))}
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>

                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Duration (hours)</Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="hours"
                                                value={formData.hours}
                                                onChange={handleChange}
                                                placeholder="Course duration in hours"
                                                min="0.5"
                                                step="0.5"
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Form.Group className="mb-3">
                                    <Form.Label>Instructor Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="instructor"
                                        value={formData.instructor}
                                        onChange={handleChange}
                                        placeholder="Instructor's full name"
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label>Course Image</Form.Label>
                                    <Form.Control
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                    <Form.Text className="text-muted">
                                        Recommended: 16:9 ratio, max 5MB
                                    </Form.Text>

                                    {imagePreview && (
                                        <div className="mt-3 text-center">
                                            <img
                                                src={imagePreview}
                                                alt="Course preview"
                                                className="img-thumbnail"
                                                style={{ maxHeight: '200px' }}
                                            />
                                        </div>
                                    )}
                                </Form.Group>

                                <div className="d-grid gap-2">
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        size="lg"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'Creating...' : 'Create Course'}
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default AddCourse; 