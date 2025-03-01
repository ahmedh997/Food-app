export const emailValidation = {
    required: 'Email is required',
    pattern: {
        value: /^((?:[A-Za-z0-9!#$%&'*+\-\/=?^_`{|}~]|(?<=^|\.)"|"(?=$|\.|@)|(?<=".*)[ .](?=.*")|(?<!\.)\.){1,64})(@)((?:[A-Za-z0-9.\-])*(?:[A-Za-z0-9])\.(?:[A-Za-z0-9]){2,})$/,
        message: 'Please enter Valid Email'
    }
};


export const passwordValidation = {
    required: 'Password is required',
    minLength: { value: 6, message: 'Min length 6 chars' },
    pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/,
        message: 'Password must include at least one lowercase letter, one uppercase letter, one digit, and one special character'
    }
};

export const confirmPasswordValidation = (password) => {
    return {
        required: 'Confirm Password is required',
        validate: (value) =>
            value === password || 'Passwords do not match',
    };
};