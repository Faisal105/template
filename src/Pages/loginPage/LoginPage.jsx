import React, { useEffect } from 'react';
import { Link, Form, useActionData, useNavigate } from 'react-router-dom';
import Input from '../../components/input/Input';
import './Login.css';
import { loginPageConfig } from './LoginPageConfig';
import { useUser } from '../../contexts/UserContext';

const LoginPage = () => {
  const actionData = useActionData(); // Hook to access the result of an action
  const navigate = useNavigate(); // Hook to programmatically navigate
  const { login } = useUser(); // Access the login function from user context

  // Effect to handle post-login navigation and context update
  useEffect(() => {
    if (actionData && actionData.user) {
      login(actionData.user); // Log in the user
      navigate('/ProductListingPage?success=true'); // Navigate to the product listing page
    }
  }, [actionData, login, navigate]);

  const renderInput = (config) => {
    return (
      <div key={config.name} className="flex-1">
        <label htmlFor={config.name} className="block text-sm font-medium text-gray-700">{config.label}</label>
        <Input
          type={config.type}
          name={config.name}
          placeholder={config.placeholder}
          required={config.required}
          minLength={config.minLength}
          className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
        />
      </div>
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <section className="p-5 m-auto bg-white rounded-lg shadow-lg login-container">
        <h2 className="text-3xl font-bold mb-4 text-center">Login</h2>
        <Form method='post' action="/LoginPage" className="space-y-7">
          {renderInput(loginPageConfig.email)}
          {renderInput(loginPageConfig.password)}
          <button type='submit' className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full">Login</button>
        </Form>
        <p className="mt-4">
          Don't have an account? <Link to="/SignUpPage" className="text-blue-500">Sign Up</Link>
        </p>
      </section>
    </div>
  );
};

export default LoginPage;

export const LoginAction = async ({ request }) => {
  const data = await request.formData(); // Retrieve form data from the request
  const formDataObject = {
    email: data.get('email').toLowerCase(), // Get email from form data , must convert email to lowerCase to match with registered uid 
    password: data.get('password') // Get password from form data
  };

  try {
    // Send login request to the token API
    const tokenResponse = await fetch('https://spartacus-demo.eastus.cloudapp.azure.com:8443/authorizationserver/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded', // Set content type to URL encoded form data
      },
      body: new URLSearchParams({
        client_id: 'mobile_android',
        client_secret: 'secret',
        // scope:'',
        grant_type: 'password',
        username: formDataObject.email,
        password: formDataObject.password
      }) // Convert form data to URL-encoded format
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      throw new Error(`HTTP error! status: ${tokenResponse.status}, message: ${errorText}`);
    }

    const tokenData = await tokenResponse.json(); // Parse JSON response from token request
    const token = tokenData.access_token; // Extract access token from login response

    // Save token to local storage
    localStorage.setItem('authToken', token);

    // Send request to fetch user profile using the access token
    // console.log("Login url",process.env.REACT_APP_BASE_URL)

    // const profileResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/users/current?lang=en&curr=USD`, {
    const profileResponse = await fetch(`https://spartacus-demo.eastus.cloudapp.azure.com:8443/occ/v2/electronics-spa/users/current?lang=en&curr=USD`, {
      headers: {
        'Authorization': `Bearer ${token}`, // Include access token in the Authorization header
        'Accept': 'application/json'
      }
    });

    if (!profileResponse.ok) {
      const errorText = await profileResponse.text();
      throw new Error(`HTTP error! status: ${profileResponse.status}, message: ${errorText}`);
    }

    const userProfile = await profileResponse.json(); // Parse JSON response from profile request

    return { user: userProfile }; // Return the user profile
  } catch (error) {
    console.error('Error:', error); // Log any errors that occur
    return { error: error.message }; // Return error message if an error occurs
  }
};
