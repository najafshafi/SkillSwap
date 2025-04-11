import axios from 'axios';

// Create an axios instance with default config
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5001/api',
    headers: {
        'Content-Type': 'application/json',
    }
});

// Add request interceptor to add auth token to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor to handle common errors
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle 401 Unauthorized errors by redirecting to login
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('isAuthenticated');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Auth API calls
export const authApi = {
    login: async (email, password) => {
        try {
            console.log('Sending login request to:', api.defaults.baseURL + '/auth/login');
            const response = await api.post('/auth/login', { email, password });
            console.log('Login response:', response.data);

            // Verify we have a token
            if (!response.data || !response.data.token) {
                throw new Error('No token received from server');
            }

            return response.data;
        } catch (error) {
            console.error('Login request failed:', error);
            if (error.response) {
                console.error('Server response:', error.response.data);
                throw error.response.data;
            } else if (error.request) {
                console.error('No response received:', error.request);
                throw { message: 'No response from server. Please check your connection.' };
            } else {
                throw { message: error.message || 'Network error' };
            }
        }
    },

    signup: async (userData) => {
        try {
            // Remove the confirmPassword field as it's not needed on the server
            const { confirmPassword, ...dataToSend } = userData;

            // Handle arrays properly
            if (Array.isArray(dataToSend.skillsOffered)) {
                // If it's already an array, we're good
            } else if (typeof dataToSend.skillsOffered === 'string') {
                // Convert comma-separated string to array
                dataToSend.skillsOffered = dataToSend.skillsOffered
                    .split(',')
                    .map(skill => skill.trim())
                    .filter(skill => skill.length > 0);
            }

            // Handle file uploads if present
            if (dataToSend.profilePicture instanceof File) {
                const formData = new FormData();

                // Add all non-file fields as JSON
                Object.keys(dataToSend).forEach(key => {
                    if (dataToSend[key] instanceof File) {
                        formData.append(key, dataToSend[key]);
                    } else if (Array.isArray(dataToSend[key])) {
                        formData.append(key, JSON.stringify(dataToSend[key]));
                    } else {
                        formData.append(key, dataToSend[key]);
                    }
                });

                const response = await axios.post(
                    `${api.defaults.baseURL}/auth/signup`,
                    formData,
                    { headers: { 'Content-Type': 'multipart/form-data' } }
                );

                return response.data;
            } else {
                // If no files, use JSON request
                const response = await api.post('/auth/signup', dataToSend);
                return response.data;
            }
        } catch (error) {
            console.error('Signup error:', error);
            throw error.response ? error.response.data : { message: 'Network error' };
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('isAuthenticated');
    },

    isAuthenticated: () => {
        return localStorage.getItem('isAuthenticated') === 'true';
    }
};

// Course API calls
export const courseApi = {
    getAllCourses: async () => {
        try {
            const response = await api.get('/courses');
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : { message: 'Network error' };
        }
    },

    getCourseByUrl: async (url) => {
        try {
            const response = await api.get(`/courses/${url}`);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : { message: 'Network error' };
        }
    },

    enrollCourse: async (courseId) => {
        try {
            const response = await api.post(`/courses/${courseId}/enroll`);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : { message: 'Network error' };
        }
    },

    createCourse: async (courseData) => {
        try {
            // Handle multipart form data for course image upload
            const formData = new FormData();

            // Add all text fields to form data
            Object.keys(courseData).forEach(key => {
                if (key !== 'courseImage') {
                    formData.append(key, courseData[key]);
                }
            });

            // Add image if provided
            if (courseData.courseImage) {
                formData.append('courseImage', courseData.courseImage);
            }

            const response = await api.post('/courses/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : { message: 'Network error' };
        }
    }
};

// User API calls
export const userApi = {
    getProfile: async () => {
        try {
            const response = await api.get('/users/profile');
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : { message: 'Network error' };
        }
    },

    updateProfile: async (userData) => {
        try {
            const formData = new FormData();

            // Handle profile picture separately to avoid field size limits
            const profilePicture = userData.profilePicture;

            // Add all other fields to FormData
            Object.keys(userData).forEach(key => {
                // Skip profilePicture in the main loop
                if (key !== 'profilePicture') {
                    // Handle arrays like skillsOffered
                    if (Array.isArray(userData[key])) {
                        // Send skills as separate items instead of stringifying the array
                        userData[key].forEach((item, index) => {
                            formData.append(`${key}[${index}]`, item);
                        });
                    } else {
                        formData.append(key, userData[key]);
                    }
                }
            });

            // Handle profile picture if it exists
            if (profilePicture) {
                // If it's a File object (from input type=file)
                if (profilePicture instanceof File) {
                    formData.append('profilePicture', profilePicture);
                }
                // If it's a data URL and starts with data:image
                else if (typeof profilePicture === 'string' && profilePicture.startsWith('data:image')) {
                    // Convert to Blob to reduce size before appending
                    const response = await fetch(profilePicture);
                    const blob = await response.blob();
                    formData.append('profilePicture', blob, 'profile-image.jpg');
                }
            }

            const response = await axios.put(
                `${api.defaults.baseURL}/users/profile`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );

            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : { message: 'Network error' };
        }
    },

    // Method specifically for FormData - avoids double processing
    updateProfileWithFormData: async (formData) => {
        try {
            const response = await axios.put(
                `${api.defaults.baseURL}/users/profile`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : { message: 'Network error' };
        }
    }
};

// Payment API calls
export const paymentApi = {
    getPaymentData: async () => {
        try {
            const response = await api.get('/payments/data');
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : { message: 'Network error' };
        }
    },

    addPaymentMethod: async (paymentMethod) => {
        try {
            const response = await api.post('/payments/methods', paymentMethod);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : { message: 'Network error' };
        }
    },

    removePaymentMethod: async (paymentMethodId) => {
        try {
            const response = await api.delete(`/payments/methods/${paymentMethodId}`);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : { message: 'Network error' };
        }
    },

    processCoursePayment: async (paymentData) => {
        try {
            const response = await api.post('/payments/process', paymentData);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : { message: 'Network error' };
        }
    },

    getTransactionHistory: async () => {
        try {
            const response = await api.get('/payments/transactions');
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : { message: 'Network error' };
        }
    },

    getEnrolledCourses: async () => {
        try {
            const response = await api.get('/payments/enrolled-courses');
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : { message: 'Network error' };
        }
    },

    updateCourseProgress: async (courseId, progress) => {
        try {
            const response = await api.put(`/payments/course-progress/${courseId}`, { progress });
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : { message: 'Network error' };
        }
    },

    getAllTransactions: async () => {
        try {
            const response = await api.get('/payments/all-transactions');
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : { message: 'Network error' };
        }
    }
};

export default {
    auth: authApi,
    courses: courseApi,
    users: userApi,
    payments: paymentApi
};
