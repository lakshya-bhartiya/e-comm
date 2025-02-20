import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../apiSlice/authApiSlice/authApiSlice';
import { useAuth } from '../context/AuthContext';

const Login = () => {


    const {login} = useAuth();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const [loginUser] = useLoginUserMutation();
    const loginSchema = Yup.object().shape({
        mobile: Yup.string()
            .required('Mobile is required')
            .matches(/^[0-9]{10}$/, 'Mobile must be 10 digits'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
    });

    // Initial form values
    const initialValues = {
        mobile: '',
        password: '',
    };

    // Handle form submission
    const onSubmit = async (values, { setSubmitting }) => {
        setLoading(true);
        loginUser(values)
            .then((res) => {
                console.log(res);
                if (res.data?.status === true) {
                    const token = res.data.token;
                    login(token)
                    navigate('/');
                }
            }).catch((err) => {
                console.log(err);
            }).finally(() => {
                setLoading(false);
                setSubmitting(false);
            });
    }

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div
            className="h-screen bg-cover bg-center"
            style={{ backgroundImage: "url('https://media.gettyimages.com/id/1131417667/photo/background-of-a-sky-of-blue-soft-color-with-white-clouds.jpg?s=612x612&w=0&k=20&c=rpqwe-5v15XoSo_DGiI11kQ-6SL4MvNOXEeZIZp1iOU=')" }}
        >
            <div className="flex justify-center items-center h-full">
                <div className='border-2 border-gray-200 rounded-lg shadow-lg p-4 w-96'>

                    <div className="flex flex-col justify-center items-center">
                        <div>
                            <h1 className="text-center text-2xl font-bold mb-4">Welcome Back!</h1>
                            <p className="text-lg text-center mb-6">
                                <i className='text-gray-500 text-sm'>Log in to your account to explore exclusive deals, track your orders, and enjoy a seamless shopping experience.</i>
                            </p>
                        </div>
                        <div>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={loginSchema}
                                onSubmit={onSubmit}
                            >
                                {({ isSubmitting }) => (
                                    <Form>
                                        {/* Email Field */}
                                        <div className="mb-4">
                                            <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
                                                Mobile
                                            </label>
                                            <Field
                                                type="text"
                                                name="mobile"
                                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="Enter your mobile number"
                                            />
                                            <ErrorMessage
                                                name="mobile"
                                                component="div"
                                                className="text-red-500 text-sm mt-1"
                                            />
                                        </div>

                                        {/* Password Field */}
                                        <div className="mb-6 relative">
                                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                                Password
                                            </label>
                                            <div className="relative">
                                                <Field
                                                    type={showPassword ? 'text' : 'password'}
                                                    name="password"
                                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 pr-10"
                                                    placeholder="Enter your password"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={togglePasswordVisibility}
                                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                                                >
                                                    {showPassword ? (
                                                        <FaEyeSlash className="h-5 w-5 text-gray-500" />
                                                    ) : (
                                                        <FaEye className="h-5 w-5 text-gray-500" />
                                                    )}
                                                </button>
                                            </div>
                                            <ErrorMessage
                                                name="password"
                                                component="div"
                                                className="text-red-500 text-sm mt-1"
                                            />
                                        </div>

                                        {/* Submit Button */}
                                        {loading ? <p className='text-center'>Loading...</p> : <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                        >
                                            Login
                                        </button>}

                                    </Form>
                                )}
                            </Formik>
                        </div>
                        <div className="mt-4 text-center">
                            <p className="text-sm text-gray-600">
                                Don't have an account?{' '}
                                <Link to={'/register'} className="text-blue-500 hover:text-blue-900">
                                    Register
                                </Link>
                            </p>
                            <div className="flex justify-center space-x-4 mt-4">

                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEkUlEQVR4nO2Zb0wbZRzHn3taesUtRpOJYbo/DoQM5c/GMgryzxkYxbGBiQsbNBCEFGaIY8zCCuaUMSiQAQMGQWAgcSY2GeuNuzpc8NqNvRoCItE3841Dthj3ToNzbX+mVRBI197Zo2VJv8n3XZ+nn89dn6dPrwj5448/HgcoJIWqgGIoxywU4HuQTfwJSsIKBxBAKgJIQzbIJhZBhX+BE/g6VAUU2ccgXwc0UgWU4tvwNmGBJASCqiQsoMa3QRsQ433wOlk4qPEsvCkQ2llTEUAxnoEaFOIdeA3RCumEzWPwtT2IrHCK0K0f+HkUCMX4B9HBk9b0PTwNFJKJC9+NngcVfrDu8En/toJoFw9+EMnhOPGr1+DLCE40eIeAGn/vPXgsMvyHRIfgrbEMT0IlroUmaQpQaAtQKAjOSN6C05hy7Db21zgbW4pN4sI3kyGQQVh5g5+W9PJZfEChZ+ADydAqkVKR4R1vVIHv8IIvwPNwDr0oeP4aFAJ5+P76wJvl22CcfAQaCUCyC/gSPAV6JEEbLWAmdWAmwdHeAIB0wvmV35DweiQBs2x+WcDeURmACv8Hn0lYoAK9hDZiwCSPXwW/VI4E0En/ObuclPSjjRowybROBZY6FPAAyhGJNmrATF5xKWCSdQiZL1gzC2I0XDthO9rUd9e9gImccynAkRm+EAjWzMIbddcW+Qg8dCMQ6iuB3TW3rHwEHrkWQJt9JbCjehKeaoHtVd+C5x+hm7IwXwns1t60Pd2L+JNRHovYTI642UY7fSVwRDc8z0NAduZJ8A+5Z6Geif/jvF4RiEROy3D+puiPvrG4Eii/0DjqXoALVDiDnx0PBhWthENXs6HDGHtJbIGTnfX97u6Arq/iuHsBQBjMsntL4DYzCfRYOGQbDjvg7c2jlZaL11/bJhZ8W496Z2SNyeoK/vVas4XiKH5P88BENtrhfzdthrNMwjL4ylaPJi9wXIrHjwcpjpIeafxswd3VL2lrm+A9KXCBL98df+GvEjrdKfxSP2YTZjyRoDhKmt/SM+d2/6+egsbuylhBkzcwihlX8CvvRP/X4VuFwvfeiNhe1lX3E5/d51hz75zQ+RE9FvZKPq208pHIp5WWzq/2DlCDKXJ38w6PRW1qZ/b15RmU1pyRHDja2uH2FEp9ekrQl+dyutmY1iweAitFGljFdJdxL6VnIw5cGdsVdJkL2zJgjEq8aNxTV8ckTNpfs3JM1kgOFPZQsLXqO6cC77c3dSNPomPjpvkKeNKiwXLYWX1nFfy7TQM/Ik+j10fINHTqfW9IFH5RCJG1Jgd8ev2Xv53o6hJ0cHxiOG7HczVM4oI3JI7pc0HVemGeGq4MEgV+hYT8LBM/K2RN/J+eYxXTRmPo+v3m7jNGNecaMq2iX3lDprWXjWlG3sgwvSe0gY2beseQ5TF4ztXDjqt++caru5C3MzQWGdvM7L9VZDj4WCh4AZ3xuJGJm/icifb+n3xrowck6WeiC1uN+0a1TOLPajptUWVQWu13yH4IzDVk2tSGtMWqa8nzLex+ts8YU2Afg/zxxx/kaf4GzSVnCicBYF0AAAAASUVORK5CYII=" width={'50px'} alt="google-logo" />

                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADK0lEQVR4nO2Zz08TQRTHNzM0MQHixaMnI2jE4Mmr/4A/okej3r0oAn+AiYke9IYkpDNFDAkRqokHL4bEEzFelIqAJP5IDPvetrXQAhXSsrRjplYMboGdnd0th/0m79TN7Pcz8+bN7KthRIoUKZJUbNg8Qxj0UYZJwnCGcsxTjpv1yBOGH2u/cbNXPmscCCVy7YRDP2XwmXIUSsFgXgIbg9m28I3fFS1yJinDZWXjDhBcIgzvyDHDMR/Hk4RjStv4f0EYThsJOBGodxqHS5RD0W/z9F9arVEOFwMxTxLWDcrBDsw8/xtgE25dD2LmQzCP2xCUwQV/3A+ZHX+WVs9U24glOiey4uzLn6LreVZ0jGfE4afWXhBFud98qDbeN2wLR3H1TV5Mpctis1IVjXR5cnn3jc3hg1Z1qpVKj+YPDVti4vuG2E9X9gCoQcSxx5v70XQr5ZDzCvBwpriveTcA8pyQB6aH2Yd+r+aPjmVEeZeUUQbg8oyAPmUAT9eDevS+W2lotlCuiPupNXFzqrAdx55l9h+TwbySeXnZ0qk4498a5/65VznPY8YS6dOhpI+Mt5myw/zs8qbn8ajqZpbXXp2XzeVtB8DY1w0tAMpwXGEF8JPOyxYKToDHc7/0VoBjSmUFlvwGGNAEoBxyKgDlgweApUAA7k2viXypsiO2GhwBpa2q47l8qSK6X2QDAXCdQo9cnriNVBVCtI9Y/qeQyibWAfhR3ApsEyfDAJiEUkBlVLZHQgAYUNjYhONt1wAxbnarfKgcGU3viC8rzirEFtYdz7U+cZv/KGIs3eUaoL4KswolLtgyyhQvc6ppFDQA4WZvqB80vgIwXPLcvZMds2YDEIa3DK2PeobTzQIgHN4bSUENLfHF45TBavgA4ENbpS7Z7lNpbOkDgE0T5nnDT8l2n1sIPQCwCcNrRhCS7T43XTrPAAxWfZ95hxh0yo6Z3wBEbtghs8MIRbI6xbFnt2u3GgDkaqVSu9p40WC2TZ7YhMOcKoC8qhB5wjblL6YGkpet2qpwnHhtlgqLRbuybleFDLNoVx6kVi15Ja61R4atU832GylSJONg6DekIcfGE7hs2QAAAABJRU5ErkJggg==" alt="facebook-new" />

                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADSklEQVR4nO2WSWgTURjHn0W06kFRvCgk3dLGpmmLGwWVZl4UFAQ9CaLoRQQv6lVQehAxi0mzdLEVtbbvRSwKnlzAg4JHQVyw4oJVmWSm0yRd3qtotZ9MulhDqgfnDQ3mB38Ghhn4/WfmffMQKlCgQIH/ip13YLGbjh7AhN/DlL1F+YS7Z9QlEfYGUw56JMKHUL6AY6MHMWHj0/KTYY9RPoAJ24UJm/hdnoNE2Rk039nRDcsw4Ykc8mxr78hqNN/BlJ/IltfjIvw4ygcwYQ9zFOhEAAtQPqBPmlmL9otE2Km8kdfBhH2QKH+OCT8vXf9SjuYLuztgqUT5UUz5A4myj5iwMUz5a0zYTXcPO+y+Nrwq+57Gq1DsInwPJvwKpvwFpjyFKR+RCH+GKQtKsVGHKfJSbGyfRHgy1+KcSWbms0eYsDaJci+m7LZE+fBf7pnAlHds700tF2MOsABTFv6jhDF5vT3G1xjuLxF22gR5mNpm3DVU3h1jO3P9TQXJ9zT0whLD5JuaoGhyoYmX39Y9fMvwMeuiY41myG/qTCedQaUMGY0+wwV/MlDflgR7WH1guHymAOX3Rck3XB4GW1ABi0cGZ1jbI6YA4X2GPW3KYUvXCKy/mJoRn05dc3qFkAISYfJsia1dI7DhYgocUQ1sAQXK/Qko8cUz0UX0Y5k/AeUXZiWQyJyzeievyY7VEwch8pkClL3HlMHGzjRUZj01I+PsSDmFFNh8Kf2uIiBO3DKV2qh2TkiBqpDaL1re4pH1t/tZSIHqyMB9MwpYPTI4WrRjhhdwtKSOmVHA4pGh1B8fd7RqmwwtUN0Li0p88g/TSvji351tySOGlrCH1VdmFbD8WhOfGptgoSEFaiLaXrMLVDUr/chIbEElaZa8Vf8vtBi8tXC2J/dbTSpgD6kvkQjszUqfaPkSn/yjNpIoFVKgPjRgK/XHv4ssUBPVziKR1EUHTor6lOwh5SkyA0eL1mG0fGVQVaxXodiUApkSEfWG1TvHFPHK+lZ70B5S+9aF1SdVzWp/mT/xdU75gBKvvjS0EpmNPpkqg4pc4pUn9NgCiXRNROtqaB9cm7N0a+qQPgjK/IlvesmKgML0t4kAikyXL1CgQAH0r/wExzvOnPO9wFIAAAAASUVORK5CYII=" alt="mac-os--v1" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login