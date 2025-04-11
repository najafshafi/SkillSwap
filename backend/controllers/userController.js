const User = require("../models/User");

// Get user profile details
const getProfile = async (req, res) => {
    try {
        const userId = req.user.userId;
        console.log("Getting profile for user:", userId);

        // Find user by ID but exclude password from the response
        const user = await User.findById(userId).select("-password");

        if (!user) {
            console.log("User not found:", userId);
            return res.status(404).json({ message: "User not found" });
        }

        // Convert the user to a plain object so we can modify it
        const userObj = user.toObject();

        // Convert profile picture buffer to base64 data URL if it exists
        if (userObj.profilePicture) {
            console.log("Profile picture found, converting to base64");
            // Convert buffer to base64 string
            userObj.profilePicture = `data:image/jpeg;base64,${userObj.profilePicture.toString('base64')}`;
        } else {
            console.log("No profile picture found for user");
        }

        res.status(200).json(userObj);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: "Server error. Please try again." });
    }
};

// Update user profile
const updateProfile = async (req, res) => {
    try {
        const userId = req.user.userId;
        console.log("Updating profile for user:", userId);
        console.log("Request body fields:", Object.keys(req.body));
        console.log("Request file:", req.file ? "File exists" : "No file");

        const { name, phone, address, gender, birthdate, skillsOffered, bio, location, skillsWanted } = req.body;

        // Find user
        const user = await User.findById(userId);

        if (!user) {
            console.log("User not found for update:", userId);
            return res.status(404).json({ message: "User not found" });
        }

        // Update user fields
        if (name) user.name = name;
        if (phone) user.phone = phone;
        if (address) user.address = address;
        if (gender) user.gender = gender;
        if (birthdate) user.birthdate = new Date(birthdate);

        // Handle skills array correctly
        if (skillsOffered) {
            try {
                if (typeof skillsOffered === 'string') {
                    // Function to recursively parse stringified JSON
                    const deepParse = (str) => {
                        try {
                            const parsed = JSON.parse(str);
                            // If it parsed to a string and looks like JSON, try parsing again
                            if (typeof parsed === 'string' &&
                                (parsed.startsWith('[') || parsed.startsWith('{'))) {
                                return deepParse(parsed);
                            }
                            return parsed;
                        } catch (e) {
                            // If it fails to parse, return the original string
                            return str;
                        }
                    };

                    // Apply recursive parsing
                    user.skillsOffered = deepParse(skillsOffered);
                    console.log("Parsed skills:", user.skillsOffered);
                } else {
                    user.skillsOffered = skillsOffered;
                }
            } catch (err) {
                console.error("Error parsing skills:", err);
                // If parsing fails, try comma-separated string
                user.skillsOffered = skillsOffered.split(',').map(s => s.trim());
            }
        }

        if (bio) user.bio = bio;
        if (location) user.location = location;
        if (skillsWanted) user.skillsWanted = skillsWanted;

        // Handle profile picture upload if provided
        if (req.file) {
            console.log("Profile picture uploaded via multer, setting buffer");
            user.profilePicture = req.file.buffer;
        } else if (req.body.profilePicture && req.body.profilePicture.startsWith('data:image')) {
            console.log("Profile picture provided as base64 data URL");
            // Extract the base64 data part
            const base64Data = req.body.profilePicture.split(',')[1];
            user.profilePicture = Buffer.from(base64Data, 'base64');
        }

        // Save updated user
        console.log("Saving updated user");
        await user.save();

        // Return updated user data without password
        const updatedUser = await User.findById(userId).select("-password");

        // Convert to plain object for modification
        const userObj = updatedUser.toObject();

        // Convert profile picture buffer to base64 data URL if it exists
        if (userObj.profilePicture) {
            console.log("Converting updated profile picture to base64 for response");
            userObj.profilePicture = `data:image/jpeg;base64,${userObj.profilePicture.toString('base64')}`;
        }

        console.log("Update successful");
        res.status(200).json({
            message: "Profile updated successfully",
            user: userObj
        });
    } catch (error) {
        console.error("Error updating user profile:", error);
        res.status(500).json({ message: "Server error. Please try again." });
    }
};

module.exports = {
    getProfile,
    updateProfile
}; 