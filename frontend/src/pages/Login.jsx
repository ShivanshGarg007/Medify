import { useState } from 'react'
import api from '../services/api'
import { useNavigate, Link } from 'react-router-dom'

export default function Login(){
    const [form, setForm] = useState({ email: '', password: '' })
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        if(!form.email || !form.password){
            setError("please fill all fields")
            return
        }

        if(!form.email.includes('@')){
            setError("email is not valid")
            return
        }

        if(form.password.length < 6){
            setError("password must be atleast 6 chars")
            return
        }

        try {
            const res = await api.post('/auth/login', form)
            localStorage.setItem('token', res.data.token)
            navigate('/catalog')
        } catch(err){
            console.log("login error", err)
            setError("login failed. try again")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
                <div className="text-center">
                    <img src="/medi.webp" alt="Medify Logo" className="mx-auto h-20 w-auto mb-2" />
                    <h1 className="text-4xl font-bold text-blue-600">Welcome to Medify</h1>
                    <h2 className="mt-4 text-2xl font-semibold text-gray-900">Login to your account</h2>
                    {error && <div className="mt-2 text-center text-sm text-red-600 bg-red-50 p-2 rounded">{error}</div>}
                </div>
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email" className="sr-only">Email address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                        >
                            Login
                        </button>
                    </div>
                    
                    <div className="text-center mt-4">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{' '}
                            <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500 transition duration-150 ease-in-out">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}


// import { useState } from 'react';
// import api from '../services/api';
// import { useNavigate } from 'react-router-dom';

// export default function Login() {
//   const [form, setForm] = useState({ email: '', password: '' });
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const res = await api.post('/auth/login', form);
//     localStorage.setItem('token', res.data.token);
//     navigate('/catalog');
//   };

//   return (
//     <div className="p-6 max-w-md mx-auto">
//       <h2 className="text-2xl mb-4 font-semibold">Login</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input type="email" placeholder="Email" required className="w-full p-2 border"
//           onChange={(e) => setForm({ ...form, email: e.target.value })}
//         />
//         <input type="password" placeholder="Password" required className="w-full p-2 border"
//           onChange={(e) => setForm({ ...form, password: e.target.value })}
//         />
//         <button className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
//       </form>
//     </div>
//   );
// }
