import { useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { registerUserAPI } from '../services/userServices';
import { registerUserAction } from '../redux/authSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Register = () => {
    const dispatch = useDispatch();

    const registerMutation = useMutation({
        mutationFn: registerUserAPI,
        onSuccess: (userData) => {
            dispatch(registerUserAction(userData));
        },
        onError: (error) => {
            console.error(error.response?.data?.message || 'Registration failed');
        },
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            email: Yup.string().email('Invalid email').required('Email is required'),
            password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
        }),
        onSubmit: (values) => {
            registerMutation.mutateAsync(values);
            

        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 p-4 border rounded shadow-md w-80 mx-auto">
            <input
                type="text"
                name="name"
                placeholder="Name"
                className="p-2 border rounded"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && <div className="text-red-500 text-sm">{formik.errors.name}</div>}

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

            <button type="submit" className="bg-green-500 text-white p-2 rounded" disabled={registerMutation.isLoading}>
                {registerMutation.isLoading ? 'Registering...' : 'Register'}
            </button>
        </form>
    );
};

export default Register;
