const signupValidation = (name: string, value: string): string => {
    const trimmedValue = value.trim(); // Trim whitespace

    switch (name) {
        case "name":
            if (trimmedValue.length === 0) return "Name is required.";
            return "";

        case "email":
            if (trimmedValue.length === 0) return "Email is required.";
            if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(trimmedValue))
                return "Email is invalid.";
            return "";

        case "password":
            if (trimmedValue.length === 0) return "Password is required.";
            if (
                !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/.test(
                    trimmedValue
                )
            )
                return "Password must be 8–15 characters with an uppercase, lowercase, number, and special character.";
            return "";

        default:
            return "";
    }
};

export default signupValidation;