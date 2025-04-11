import React, { useState, useEffect } from 'react';
import {
    Container,
    Row,
    Col,
    Table,
    Button,
    Card,
    Alert,
    Badge,
    Modal,
    Form,
    Spinner
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { courseApi } from '../../utils/api';
import { useAuth } from '../../utils/AuthContext';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import EditCourseModal from './components/EditCourseModal';

const ManageCourses = () => {
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // State for delete confirmation modal
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [courseToDelete, setCourseToDelete] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    // State for edit course modal
    const [showEditModal, setShowEditModal] = useState(false);
    const [courseToEdit, setCourseToEdit] = useState(null);

    // Categories for filtering
    const categories = [
        'All',
        'Graphic Designing',
        'Programming & Development',
        'Data & Analytics',
        'Cybersecurity & Networking',
        'Digital Marketing'
    ];
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Fetch courses on component mount
    useEffect(() => {
        // Check if user is authenticated and is admin
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        if (!user?.isAdmin) {
            navigate('/');
            return;
        }

        fetchCourses();
    }, [isAuthenticated, user, navigate]);

    // Fetch courses from API
    const fetchCourses = async () => {
        setLoading(true);
        setError('');

        try {
            console.log('Fetching admin courses...');
            const token = localStorage.getItem('token');
            console.log('Auth token exists:', !!token);

            const data = await courseApi.getAdminCourses();
            console.log('Courses data received:', data);
            setCourses(data);
        } catch (err) {
            console.error('Error fetching courses:', err);
            // More detailed error message
            if (err.status === 401 || err.message?.includes('token')) {
                setError('Authentication error. Please log in again.');
            } else if (err.status === 403) {
                setError('You do not have permission to access this page.');
            } else {
                setError(`Failed to load courses: ${err.message || 'Unknown error'}`);
            }
        } finally {
            setLoading(false);
        }
    };

    // Handle view course details
    const handleViewCourse = (url) => {
        navigate(`/course/${url}`);
    };

    // Handle edit course
    const handleEditCourse = (course) => {
        setCourseToEdit(course);
        setShowEditModal(true);
    };

    // Handle delete course confirmation
    const handleDeleteConfirmation = (course) => {
        setCourseToDelete(course);
        setShowDeleteModal(true);
    };

    // Handle actual course deletion
    const handleDeleteCourse = async () => {
        if (!courseToDelete) return;

        setDeleteLoading(true);
        try {
            await courseApi.deleteCourse(courseToDelete._id);

            // Update courses list
            setCourses(courses.filter(course => course._id !== courseToDelete._id));
            setSuccess(`Course "${courseToDelete.title}" has been deleted successfully.`);

            // Close the modal
            setShowDeleteModal(false);
            setCourseToDelete(null);
        } catch (err) {
            setError(err.message || 'Failed to delete course. Please try again.');
        } finally {
            setDeleteLoading(false);
        }
    };

    // Handle course update
    const handleCourseUpdated = (updatedCourse) => {
        // Update the courses array with the updated course
        setCourses(courses.map(course =>
            course._id === updatedCourse._id ? updatedCourse : course
        ));
        setSuccess(`Course "${updatedCourse.title}" has been updated successfully.`);
        setShowEditModal(false);
    };

    // Filter courses by category
    const filteredCourses = selectedCategory === 'All'
        ? courses
        : courses.filter(course => course.category === selectedCategory);

    return (
        <Container className="py-5">
            <Row className="mb-4">
                <Col>
                    <h2 className="mb-4">Manage Courses</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {success && <Alert variant="success">{success}</Alert>}
                </Col>
            </Row>

            <Card className="shadow-sm mb-4">
                <Card.Body>
                    <Row className="mb-3 align-items-center">
                        <Col md={6}>
                            <h5>Filter by Category</h5>
                            <Form.Select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                {categories.map((category, index) => (
                                    <option key={index} value={category}>{category}</option>
                                ))}
                            </Form.Select>
                        </Col>
                        <Col md={6} className="text-md-end mt-3 mt-md-0">
                            <Button
                                variant="primary"
                                onClick={() => navigate('/admin/add-course')}
                            >
                                Add New Course
                            </Button>
                        </Col>
                    </Row>

                    {loading ? (
                        <div className="text-center py-5">
                            <Spinner animation="border" variant="primary" />
                            <p className="mt-3">Loading courses...</p>
                        </div>
                    ) : filteredCourses.length === 0 ? (
                        <Alert variant="info">
                            No courses found. {selectedCategory !== 'All' && 'Try selecting a different category or '}
                            <Button
                                variant="link"
                                className="p-0"
                                onClick={() => navigate('/admin/add-course')}
                            >
                                add a new course
                            </Button>.
                        </Alert>
                    ) : (
                        <div className="table-responsive">
                            <Table hover className="align-middle">
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Title</th>
                                        <th>Category</th>
                                        <th>Price</th>
                                        <th>Enrollments</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredCourses.map(course => (
                                        <tr key={course._id}>
                                            <td>
                                                <img
                                                    src={`/images/${course.img}`}
                                                    alt={course.title}
                                                    style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px' }}
                                                />
                                            </td>
                                            <td>{course.title}</td>
                                            <td>
                                               {course.category}
                                            </td>
                                            <td>${course.price.toFixed(2)}</td>
                                            <td>
                                                <Badge bg="secondary">{course.enrolledCount}</Badge>
                                            </td>
                                            <td>
                                                <Button
                                                    variant="outline-primary"
                                                    size="sm"
                                                    className="me-2"
                                                    onClick={() => handleViewCourse(course.url)}
                                                    title="View Course"
                                                >
                                                    <FaEye />
                                                </Button>
                                                <Button
                                                    variant="outline-success"
                                                    size="sm"
                                                    className="me-2"
                                                    onClick={() => handleEditCourse(course)}
                                                    title="Edit Course"
                                                >
                                                    <FaEdit />
                                                </Button>
                                                <Button
                                                    variant="outline-danger"
                                                    size="sm"
                                                    onClick={() => handleDeleteConfirmation(course)}
                                                    title="Delete Course"
                                                    disabled={course.enrolledCount > 0}
                                                >
                                                    <FaTrash />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    )}
                </Card.Body>
            </Card>

            {/* Delete Confirmation Modal */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {courseToDelete && (
                        <>
                            <p>Are you sure you want to delete the course <strong>{courseToDelete.title}</strong>?</p>
                            <p className="text-danger">This action cannot be undone.</p>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancel
                    </Button>
                    <Button
                        variant="danger"
                        onClick={handleDeleteCourse}
                        disabled={deleteLoading}
                    >
                        {deleteLoading ? 'Deleting...' : 'Delete Course'}
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Edit Course Modal */}
            {courseToEdit && (
                <EditCourseModal
                    show={showEditModal}
                    onHide={() => setShowEditModal(false)}
                    course={courseToEdit}
                    onCourseUpdated={handleCourseUpdated}
                />
            )}
        </Container>
    );
};

export default ManageCourses; 