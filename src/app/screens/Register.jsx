import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '../apiSlice/authApiSlice/authApiSlice';
import { toast } from 'react-toastify';
import {FadeLoader} from 'react-spinners';


const Register = () => {
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()
    // Register User Mutation
    const [registerUser] = useRegisterUserMutation();
    // Validation schema using Yup
    const validationSchema = Yup.object({
        fullName: Yup.string()
            .required('Full Name is required')
            .min(3, 'Full Name must be at least 3 characters'),
        mobile: Yup.string()
            .required('Mobile is required')
            .matches(/^[0-9]{10}$/, 'Mobile must be 10 digits'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters'),
    });

    // Initial form values
    const initialValues = {
        fullName: '',
        mobile: '',
        password: '',
    };
    // Handle form submission

    const onSubmit = async (values, { setSubmitting }) => {
        setLoading(true);
        registerUser(values).then((res) => {
            if (res.data?.status === true) {
               toast.success('Registration Successful! Please login to continue');
               navigate('/login');
               setLoading(false);
            }
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            setLoading(false);
        });
    };

    return (

        <div className='p-4'>
            <div className="grid grid-cols-2">
                {/* Left Side (Blue Background) */}
                <div className="bg-slate-500 p-4 text-white rounded hover:bg-blue-400 shadow-lg transition duration-300">
                    <div className=" p-8 text-white flex flex-col justify-center items-center h-full">
                        <h1 className="text-4xl font-bold mb-4 text-center">Welcome to Our Store!</h1>
                        <p className="text-lg text-center mb-6">
                            Discover a world of amazing products at your fingertips. Whether you're looking for the latest trends, everyday essentials, or unique gifts, we've got you covered.
                        </p>
                        <ul className="list-disc list-inside text-left">
                            <li className="mb-2">🚀 Fast and Reliable Delivery</li>
                            <li className="mb-2">💳 Secure Payment Options</li>
                            <li className="mb-2">🌟 Premium Quality Products</li>
                            <li className="mb-2">📞 24/7 Customer Support</li>
                        </ul>
                        <button className="mt-8 px-6 py-2 bg-white text-blue-500 rounded-lg font-semibold hover:bg-gray-200 transition duration-300">
                            Explore Now
                        </button>
                    </div>
                </div>

                {/* Right Side (Form) */}
                <div className='flex flex-col p-8 w-full'>
                    <h1 className='font-serif'><strong>Get started</strong></h1>
                    <p className='text-gray-400 font-sans'>Create your account now</p>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <div className='flex flex-col space-y-4 mt-8'>
                                    {/* Full Name Field */}
                                    <div>
                                        <label className='text-slate-400'>Full Name</label><br />
                                        <Field className="border border-slate-300 w-full p-1 rounded-md" type="text" name="fullName" />
                                        <ErrorMessage className='text-red-600' name="fullName" component="span" />
                                    </div>

                                    {/* Mobile Field */}
                                    <div>
                                        <label className='text-slate-400'>Mobile</label><br />
                                        <Field className="border border-slate-300 w-full p-1 rounded-md" type="text" name="mobile" />
                                        <ErrorMessage className='text-red-600' name="mobile" component="span" />
                                    </div>

                                    {/* Password Field */}
                                    <div>
                                        <label className='text-slate-400'>Password</label><br />
                                        <Field className="border border-slate-300 w-full p-1 rounded-md" type="password" name="password" />
                                        <ErrorMessage className='text-red-600' name="password" component="span" />
                                    </div>

                                    {/* Submit Button */}
                                    {loading ? (
                                        <div className='flex justify-center'>
                                            <FadeLoader className='text-center' color='#2563EB' loading={loading} size={7} />
                                            </div>
                                    ) : (
                                        <div className='flex justify-center bg-blue-600 p-2 rounded-md text-white hover:bg-blue-800'>
                                        <button type="submit" disabled={isSubmitting}>
                                            Register
                                        </button>
                                    </div>
                                    )}

                                    {/* Login Link */}
                                    <div className='flex justify-center space-x-2'>
                                        <p className='text-gray-400'>Already have an account?</p>
                                        <Link to={'/login'}>
                                            <span className='text-blue-600 hover:text-cyan-500'>Login</span>
                                        </Link>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};
export default Register
