export const signupConfig = {
    title: {
        name: "title",
        label: "Title",
        type: "select",
        options: [
            { label: "Select Title", value: "" },
            { label: "Mr.", value: "mr" },
            { label: "Mrs.", value: "mrs" },
            { label: "Miss", value: "miss" },
            { label: "Dr.", value: "dr" }
        ],
        required: true
    },
    firstName: {
        name: "firstName",
        label: "First Name",
        type: "text",
        placeholder: "Enter your first name",
        required: true
    },
    lastName: {
        name: "lastName",
        label: "Last Name",
        type: "text",
        placeholder: "Enter your last name",
        required: true
    },
    email: {
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "Enter your email",
        required: true
    },
    countryCode: {
        name: "countryCode",
        label: "Country Code",
        type: "select",
        options: [
            { label: "+1", value: "+1" },
            { label: "+91", value: "+91" },
            { label: "+44", value: "+44" },
            { label: "+61", value: "+61" },
            { label: "+81", value: "+81" }
        ],
        required: true
    },
    phoneNumber: {
        name: "phoneNumber",
        label: "Phone Number",
        type: "tel",
        placeholder: "Enter your phone number",
        required: true,
        pattern: "^\\d{4,15}$",
        title: "Enter a valid phone number"
    },
    password: {
        name: "password",
        label: "Password",
        type: "password",
        placeholder: "Enter your password",
        minLength: 4,
        required: true
    },
    confirmPassword: {
        name: "confirmPassword",
        label: "Confirm Password",
        type: "password",
        placeholder: "Confirm your password",
        minLength: 4,
        required: true
    }
};
