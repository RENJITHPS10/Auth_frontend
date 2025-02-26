import { useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { loginUserAPI } from '../services/userServices';
import { loginUserAction } from '../redux/authSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Login = () => {
    const dispatch = useDispatch();

    const loginMutation = useMutation({
        mutationFn: loginUserAPI,
        onSuccess: (userData) => {
            dispatch(loginUserAction(userData));
        },
        onError: (error) => {
            console.error(error.response?.data?.message || 'Login failed');
        },
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email').required('Email is required'),
            password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
        }),
        onSubmit: (values) => {
            loginMutation.mutateAsync(values);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 p-4 border rounded shadow-md w-80 mx-auto">
            <input
                type="email"
                name="email"
                placeholder="Email"
                className="p-2 border rounded"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && <div className="text-red-500 text-sm">{formik.errors.email}</div>}

            <input
                type="password"
                name="password"
                placeholder="Password"
                className="p-2 border rounded"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && <div className="text-red-500 text-sm">{formik.errors.password}</div>}

            <button type="submit" className="bg-blue-500 text-white p-2 rounded" disabled={loginMutation.isLoading}>
                {loginMutation.isLoading ? 'Logging in...' : 'Login'}
            </button>
        </form>
    );
};

export default Login;
