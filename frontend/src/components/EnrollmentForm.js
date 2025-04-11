import React, { useState } from "react";
import "../styles/EnrollmentForm.css";

function EnrollmentForm() {
    const [formData, setFormData] = useState({
        gender: "",
        firstName: "",
        lastName: "",
        address: "",
        address2: "",
        city: "",
        region: "",
        postalCode: "",
        country: "",
        email: "",
        dob: "",
        citizenship: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Enrollment Data:", formData);
        alert("Enrollment Successful!");
    };

    return (
        <div className="enrollment-form">
            <div style={{ maxWidth: "500px", margin: "auto", padding: "20px", border: "1px solid #ccc", borderRadius: "5px" }}>
                <h2>Enrollment Form</h2>
                <form onSubmit={handleSubmit}>

                    {/* Gender Field - Front per move kiya */}
                    <label>Gender:</label>
                    <select name="gender" value={formData.gender} onChange={handleChange} required>
                        <option value="" disabled>Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>

                    <label>Your Name:</label>
                    <div style={{ display: "flex", gap: "10px" }}>
                        <input type="text" name="firstName" placeholder="First" value={formData.firstName} onChange={handleChange} required />
                        <input type="text" name="lastName" placeholder="Last" value={formData.lastName} onChange={handleChange} required />
                    </div>

                    <label>Home Address:</label>
                    <input type="text" name="address" placeholder="Street Address" value={formData.address} onChange={handleChange} required />
                    <input type="text" name="address2" placeholder="Street Address Line 2" value={formData.address2} onChange={handleChange} />

                    <div style={{ display: "flex", gap: "10px" }}>
                        <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
                        <input type="text" name="region" placeholder="Region" value={formData.region} onChange={handleChange} required />
                    </div>

                    <div style={{ display: "flex", gap: "10px" }}>
                        <input type="text" name="postalCode" placeholder="Postal / Zip Code" value={formData.postalCode} onChange={handleChange} required />
                        <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} required />
                    </div>

                    <label>Email:</label>
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />

                    <label>Date of Birth:</label>
                    <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />

                    <label>Citizenship:</label>
                    <input type="text" name="citizenship" placeholder="Citizenship" value={formData.citizenship} onChange={handleChange} required />

                    <button type="submit" style={{ marginTop: "10px", padding: "10px", background: "blue", color: "white", border: "none", cursor: "pointer" }}>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default EnrollmentForm;
