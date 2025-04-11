import React, { useState, useEffect } from 'react';
import {
    Modal,
    Button,
    Form,
    Row,
    Col,
    Alert,
    Spinner
} from 'react-bootstrap';
import { courseApi } from '../../../utils/api';

const EditCourseModal = ({ show, onHide, course, onCourseUpdated }) => {
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

    // Categories for the dropdown
    const categories = [
        'Graphic Designing',
        'Programming & Development',
        'Data & Analytics',
        'Cybersecurity & Networking',
        'Digital Marketing'
    ];

    // Initialize form data when course changes
    useEffect(() => {
        if (course) {
            setFormData({
                title: course.title || '',
                description: course.description || '',
                price: course.price?.toString() || '',
                hours: course.hours?.toString() || '',
                category: course.category || '',
                instructor: course.instructor || '',
            });
            setImagePreview(course.img ? `/images/${course.img}` : null);
        }
    }, [course]);

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

            // Submit the course data using the updated endpoint
            const response = await courseApi.updateCourse(course._id, courseData);

            // Call the parent callback
            if (onCourseUpdated && response.course) {
                onCourseUpdated(response.course);
            }

        } catch (err) {
            setError(err.message || 'Failed to update course. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            backdrop="static"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Edit Course</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <Alert variant="danger">{error}</Alert>}

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
                                    placeholder="Course price"
                                    min="0"
                                    step="0.01"
                                    required
                                />
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
                            placeholder="Enter course description"
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
                        <Form.Label>Instructor</Form.Label>
                        <Form.Control
                            type="text"
                            name="instructor"
                            value={formData.instructor}
                            onChange={handleChange}
                            placeholder="Enter instructor name"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label>Course Image</Form.Label>
                        {imagePreview && (
                            <div className="mb-2">
                                <img
                                    src={imagePreview}
                                    alt="Course Preview"
                                    style={{
                                        width: '100%',
                                        maxHeight: '200px',
                                        objectFit: 'cover',
                                        borderRadius: '8px'
                                    }}
                                />
                                <p className="text-muted small mt-1">Current image</p>
                            </div>
                        )}
                        <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        <Form.Text className="text-muted">
                            Upload a new image only if you want to change the current one.
                        </Form.Text>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancel
                </Button>
                <Button
                    variant="primary"
                    onClick={handleSubmit}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                className="me-2"
                            />
                            Updating...
                        </>
                    ) : 'Save Changes'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditCourseModal; 