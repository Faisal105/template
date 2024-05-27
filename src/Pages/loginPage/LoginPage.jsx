import React from 'react';
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
  React.useEffect(() => {
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
  const data = await request.formData(); 
  const formDataObject = {
    email: data.get('email'),
    password: data.get('password')
  };

  console.log(formDataObject); 

  // Simulate login process
  return { user: { email: formDataObject.email } }; 
};
