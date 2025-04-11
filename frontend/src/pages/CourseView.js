import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { courseApi } from '../utils/api';

// Sample static course content - similar to what's in individual course files
const staticCourseContent = {
    'logo-designing': {
        title: 'Logo Designing',
        description: 'Learn the art and science of logo design from industry experts.',
        sections: [
            {
                title: 'Introduction to Logo Design',
                content: 'Understanding the fundamentals of logo design and its importance in branding.'
            },
            {
                title: 'Design Principles',
                content: 'Color theory, typography, and composition for effective logos.'
            },
            {
                title: 'Tools and Techniques',
                content: 'Using industry-standard software to create professional logos.'
            }
        ]
    },
    'ui/ux-designing': {
        title: 'UI/UX Designing',
        description: 'Master the principles of user interface and user experience design.',
        sections: [
            {
                title: 'UI Fundamentals',
                content: 'Understanding interface design principles and patterns.'
            },
            {
                title: 'UX Research',
                content: 'Methods for gathering user insights and creating user personas.'
            },
            {
                title: 'Prototyping',
                content: 'Creating interactive prototypes and testing with users.'
            }
        ]
    },
    // Add more static courses as needed
};

const CourseView = () => {
    const { courseUrl } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isStaticCourse, setIsStaticCourse] = useState(false);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                setLoading(true);
                setError('');

                // First check if this is a static course
                if (staticCourseContent[courseUrl]) {
                    setCourse(staticCourseContent[courseUrl]);
                    setIsStaticCourse(true);
                    setLoading(false);
                    return;
                }

                // If not static, try to fetch from the database
                const courseData = await courseApi.getCourseByUrl(courseUrl);
                setCourse(courseData);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching course:', err);
                setError('Course not found or error loading course content.');
                setLoading(false);
            }
        };

        fetchCourse();
    }, [courseUrl]);

    // If loading or no course found
    if (loading) {
        return (
            <Container className="py-5 text-center">
                <Spinner animation="border" variant="primary" />
                <p className="mt-3">Loading course content...</p>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="py-5">
                <Alert variant="danger">
                    {error}
                    <div className="mt-3">
                        <Button variant="outline-primary" onClick={() => navigate('/courses')}>
                            Return to Courses
                        </Button>
                    </div>
                </Alert>
            </Container>
        );
    }

    if (!course) {
        return (
            <Container className="py-5">
                <Alert variant="warning">
                    Course not found. The requested course may have been removed or is unavailable.
                    <div className="mt-3">
                        <Button variant="outline-primary" onClick={() => navigate('/courses')}>
                            Browse Courses
                        </Button>
                    </div>
                </Alert>
            </Container>
        );
    }

    return (
        <Container className="py-5">
            <Row>
                <Col md={8}>
                    <h1 className="mb-4">{course.title}</h1>
                    <Card className="mb-4 shadow-sm border-0">
                        <Card.Body>
                            <p className="lead">{course.description}</p>
                        </Card.Body>
                    </Card>

                    {/* Course Content Sections */}
                    {isStaticCourse ? (
                        // Render static course content
                        <div>
                            {course.sections && course.sections.map((section, index) => (
                                <Card key={index} className="mb-3 shadow-sm">
                                    <Card.Header className="bg-light">
                                        <h4 className="mb-0">{section.title}</h4>
                                    </Card.Header>
                                    <Card.Body>
                                        <p>{section.content}</p>
                                    </Card.Body>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        // Render database course content
                        <div>
                            {course.content && course.content.map((section, index) => (
                                <Card key={index} className="mb-3 shadow-sm">
                                    <Card.Header className="bg-light">
                                        <h4 className="mb-0">{section.title}</h4>
                                    </Card.Header>
                                    <Card.Body>
                                        <p>{section.description}</p>
                                        {section.videoUrl && (
                                            <div className="ratio ratio-16x9 mt-3">
                                                <iframe
                                                    src={section.videoUrl}
                                                    title={section.title}
                                                    allowFullScreen
                                                ></iframe>
                                            </div>
                                        )}
                                        {section.materials && section.materials.length > 0 && (
                                            <div className="mt-3">
                                                <h5>Materials:</h5>
                                                <ul>
                                                    {section.materials.map((material, idx) => (
                                                        <li key={idx}>{material}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </Card.Body>
                                </Card>
                            ))}

                            {(!course.content || course.content.length === 0) && (
                                <Alert variant="info">
                                    Course content is being developed. Check back soon!
                                </Alert>
                            )}
                        </div>
                    )}
                </Col>

                <Col md={4}>
                    <Card className="shadow-sm sticky-top" style={{ top: '2rem' }}>
                        <Card.Img
                            variant="top"
                            src={isStaticCourse ? `/images/${courseUrl}.jpg` : `/images/${course.img}`}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/images/default-course.jpg';
                            }}
                        />
                        <Card.Body>
                            <h5>Course Information</h5>
                            <ul className="list-unstyled">
                                {course.instructor && <li><strong>Instructor:</strong> {course.instructor}</li>}
                                {course.hours && <li><strong>Duration:</strong> {course.hours} hours</li>}
                                {course.rating && <li><strong>Rating:</strong> {course.rating}/5</li>}
                                {course.enrolledCount && <li><strong>Students:</strong> {course.enrolledCount}</li>}
                            </ul>
                            <div className="d-grid">
                                <Button variant="success" className="mt-3">
                                    Continue Learning
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default CourseView; 