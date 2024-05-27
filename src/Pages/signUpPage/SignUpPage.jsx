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
      }, 3000); // 1.5-second delay before redirection
    }
  }, [actionData]);

  // Function to render input fields based on config
  const renderInput = (config) => {
    if (config.type === 'select') {
      return (
        <div key={config.name} className="flex-2">
          <label htmlFor={config.name} className="block text-sm font-medium text-gray-700">{config.label}</label>
          <select
            name={config.name}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
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
          {renderInput(signupConfig.fullName)}
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

export const SignUpAction = async ({ request }) => {
  const data = await request.formData();

  // Collect form data
  const formDataObject = {
    fullName: data.get('fullName'),
    email: data.get('email'),
    phoneNumber: data.get('phoneNumber'),
    countryCode: data.get('countryCode'),
    password: data.get('password'),
    confirmPassword: data.get('confirmPassword'),
  };

  // Check if passwords match
  if (formDataObject.password !== formDataObject.confirmPassword) {
    return { error: "Password and Confirm Password do not match" };
  }

  console.log(formDataObject);

  // Simulate a successful response
  return { success: "You have registered successfully. Redirecting to login page...", redirect: true };
};
