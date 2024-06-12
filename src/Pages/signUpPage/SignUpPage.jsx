import React, { useRef, useState, useEffect } from 'react';
import { Link, Form, useActionData } from 'react-router-dom';
import Input from '../../components/input/Input';
import Notification from '../../components/notification/Notification';
import './SignUp.css';
import { signupConfig } from './SignUpPageConfig';

const SignUpPage = () => {
  const actionData = useActionData();
  const formRef = useRef(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    // Handle successful signup
    if (actionData?.success) {
      setNotification({ message: actionData.success, type: 'success' });
      if (formRef.current) {
        formRef.current.reset(); // Reset the form fields
      }
      setTimeout(() => {
        setNotification(null);
        window.location.href = '/LoginPage?success=true'; // Redirect to login page
      }, 1500); // 1.5-second delay before redirection
    }
  }, [actionData]);

  // Function to render input fields based on config
  const renderInput = (config) => {
    if (config.type === 'select') {
      return (
        <div key={config.name} className="flex-1">
          <label htmlFor={config.name} className="block text-sm font-medium text-gray-700">{config.label}</label>
          <select
            name={config.name}
            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
            required={config.required}
          >
            {config.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      );
    } else {
      return (
        <div key={config.name} className="flex-1">
          <label htmlFor={config.name} className="block text-sm font-medium text-gray-700">{config.label}</label>
          <Input
            type={config.type}
            name={config.name}
            placeholder={config.placeholder}
            required={config.required}
            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
            {...(config.pattern && { pattern: config.pattern })}
            {...(config.title && { title: config.title })}
            {...(config.minLength && { minLength: config.minLength })}
          />
        </div>
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <section className="p-5 mt-5 bg-white rounded-lg shadow-lg w-full max-w-xs sm:w-1/2 sm:max-w-xl lg:max-w-2xl">
        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        )}
        <h2 className="text-3xl font-bold mb-4 text-center">Register</h2>
        <Form method='post' action="/SignUpPage" className="space-y-7" ref={formRef}>
          {renderInput(signupConfig.title)}
          {renderInput(signupConfig.firstName)}
          {renderInput(signupConfig.lastName)}
          {renderInput(signupConfig.email)}
          <div className="flex gap-2">
            {renderInput(signupConfig.countryCode)}
            {renderInput(signupConfig.phoneNumber)}
          </div>
          {renderInput(signupConfig.password)}
          {renderInput(signupConfig.confirmPassword)}

          {actionData?.error && (
            <p className="mt-0 text-red-500">{actionData.error}</p>
          )}
          <button type='submit' className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full">Sign Up</button>
        </Form>
        <p className="mt-4">
          Already have an account? <Link to="/LoginPage" className="text-blue-500">Login</Link>
        </p>
      </section>
    </div>
  );
};

export default SignUpPage;

// Function to get the token
const getToken = async () => {
  const url = 'https://spartacus-demo.eastus.cloudapp.azure.com:8443/authorizationserver/oauth/token'; // Token API URL
  const tokenData = {
    client_id: 'mobile_android',
    client_secret: 'secret',
    grant_type: 'client_credentials'
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded' // Setting content type for form data
      },
      body: new URLSearchParams(tokenData) // Converting token data to URL-encoded format
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const responseData = await response.json(); // Parse JSON response
    return responseData.access_token; // Return access token

  } catch (error) {
    console.error('Error fetching token:', error);
    throw error; // Throw error if token fetching fails
  }
};

// Action function to handle the sign-up process
export const SignUpAction = async ({ request }) => {
  const data = await request.formData(); // Retrieve form data from the request

  // Create an object with the form data (according to swagger API)
  const formDataObject = {
    uid: data.get('email'),             // Map email to uid
    firstName: data.get('firstName'),   // Map firstName to firstName
    lastName: data.get('lastName'),     // Map lastName to lastName
    password: data.get('password'),     // Map password to password
    title: data.get('title'),           // Map title to title
    titleCode: data.get('title'),       // Use the same value for titleCode
    // countryCode: data.get('countryCode'), // Map countryCode to countryCode
    // phoneNumber: data.get('phoneNumber') // Map phoneNumber to phoneNumber
  };

  // Check if the password and confirm password match
  if (data.get('password') !== data.get('confirmPassword')) {
    return { error: "Password and Confirm Password do not match" };
  }

  // Ensure password meets validation criteria
  const passwordPattern = /^(?=.*[0-9]).*$/;
  if (!passwordPattern.test(data.get('password'))) {
    return { error: "Password should contain at least one number" };
  }

  const url = `https://spartacus-demo.eastus.cloudapp.azure.com:8443/occ/v2/electronics-spa/users`; // Construct the URL for the API endpoint
  console.log("url", url);

  try {
    const token = await getToken(); // Get the token from the token API
    console.log('Token:', token);

    // Save token to local storage
    localStorage.setItem('authToken', token);

    // Send a POST request to the signup endpoint
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Set content type to JSON
        'Authorization': `Bearer ${token}` // Add the token to the headers
      },
      body: JSON.stringify(formDataObject), // Convert form data to JSON string
    });

    console.log("response", response);

    // Check if the response is not ok (i.e., status code is not in the range 200-299)
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const responseData = await response.json(); // Parse JSON response from the server
    console.log('Response:', responseData);

    return { success: "You have registered successfully. Redirecting to login page...", redirect: true };

  } catch (error) {
    console.error('Error:', error);
    return { error: "Password should be at least six characters long. Please try again." };
  }
};
