import React from 'react';
import { Link, Form, useActionData, redirect } from 'react-router-dom';
import Input from '../../components/input/Input';
import { loginPageConfig } from './LoginPageConfig';
 
const LoginPage = () => {
  const actionData = useActionData();
 
  // Function to dynamically render input fields based on configuration
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
    <section className='p-5 m-auto bg-[#eee] rounded-lg'>
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
 
  return redirect('/ProductListingPage?success=true');
};