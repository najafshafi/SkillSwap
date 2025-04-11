import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { paymentApi } from '../utils/api';
import { FaClock, FaCalendar } from 'react-icons/fa';

const EnrolledCourses = () => {
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { isAuthenticated, user } = useAuth();

    useEffect(() => {
        // Check if user is authenticated
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        const fetchEnrolledCourses = async () => {
            try {
                setLoading(true);
                // Fetch enrolled courses from the API
                const response = await paymentApi.getEnrolledCourses();
                setEnrolledCourses(response || []);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching enrolled courses:', error);
                setError('Failed to load your enrolled courses. Please try again later.');
                setLoading(false);
            }
        };

        fetchEnrolledCourses();
    }, [isAuthenticated, navigate]);

    const handleContinueCourse = (courseUrl) => {
        navigate(`/course/${courseUrl}`);
    };
    console.log(enrolledCourses)
    return (
        <Container className="py-5">
            <h1 className="mb-4 text-center">My Enrolled Courses</h1>

            {loading ? (
                <div className="text-center py-5">
                    <Spinner animation="border" variant="primary" />
                    <p className="mt-3">Loading your courses...</p>
                </div>
            ) : error ? (
                <div className="alert alert-danger">{error}</div>
            ) : enrolledCourses.length === 0 ? (
                <div className="text-center py-5">
                    <h3>You haven't enrolled in any courses yet</h3>
                    <p className="mb-4">Browse our courses and start learning today!</p>
                    <Button
                        variant="primary"
                        onClick={() => navigate('/courses')}
                        className="px-4 py-2"
                    >
                        Browse Courses
                    </Button>
                </div>
            ) : (
                <Row className="g-4">
                    {enrolledCourses.map((course) => (
                        <Col md={6} lg={4} key={course.id}>
                            <Card className="h-100 shadow-sm border-0 course-card transition-hover">
                                <div className="position-relative">
                                    <Card.Img
                                        variant="top"
                                        src={`/images/${course.img}`}
                                        className="course-img"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = "/images/default-course.jpeg";
                                        }}
                                    />
                                    <div className="enrollment-date position-absolute bottom-0 start-0 w-100 bg-dark bg-opacity-75 text-white p-2">
                                        <small>
                                            <FaCalendar className="me-1" />
                                            Enrolled: {new Date(course.enrollmentDate).toLocaleDateString()}
                                        </small>
                                    </div>
                                </div>
                                <Card.Body className="d-flex flex-column">
                                    <div className="d-flex justify-content-between align-items-start mb-3">
                                        <Card.Title className="mb-0">{course.title}</Card.Title>
                                    </div>
                                    <div className="mb-3 text-muted">
                                        <FaClock className="me-1" /> {course.hours || "N/A"} hours of content
                                    </div>
                                    <div className="mb-3">
                                        <div className="progress">
                                            <div
                                                className="progress-bar"
                                                role="progressbar"
                                                style={{ width: `${course.progress || 0}%` }}
                                                aria-valuenow={course.progress || 0}
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                            >
                                                {course.progress || 0}%
                                            </div>
                                        </div>
                                        <small className="text-muted mt-1 d-block">
                                            {course.progress || 0}% Complete
                                        </small>
                                    </div>
                                    <Button
                                        variant="primary"
                                        className="mt-auto w-100"
                                        onClick={() => handleContinueCourse(course.url)}
                                    >
                                        Continue Learning
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};

export default EnrolledCourses; 