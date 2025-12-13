import React, { useRef, useState, useEffect } from "react";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const ref = useRef()
  const passRef = useRef()
  const [form, setform] = useState({ site: "", username: "", password: "" })
  const [passwordArray, setpasswordArray] = useState([])

  useEffect(() => {
    const loadPasswords = async () => {
      try {
        const response = await fetch('https://pg-backend-7p7k.onrender.com/passwords');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setpasswordArray(data);
      } catch (error) {
        console.error("Failed to fetch passwords from API:", error);
      }
    };
    loadPasswords();
  }, []);

  const showPass = () => {
    if (ref.current.src.includes("hide.png")) {
      passRef.current.type = "text"
      ref.current.src = "view.png"
    }
    else {
      ref.current.src = "hide.png"
      passRef.current.type = "password"
    }
  }

  const savePassword = async () => {
    if (form.site.length < 3 || form.username.length < 3 || form.password.length < 3) {
      alert("Please ensure all fields are at least 3 characters long.");
      return;
    }

    const passwordData = { ...form, id: uuidv4() };

    try {
      const response = await fetch('https://pg-backend-7p7k.onrender.com/passwords', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(passwordData)
      });
      if (!response.ok) throw new Error('Failed to save password on server.');
      
      setpasswordArray([...passwordArray, passwordData]);
      setform({ site: '', username: '', password: '' });
      
      toast('Password Saved securely', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
    catch (error) {
      console.error("Error saving password via API:", error);
      toast.error('Failed to save password');
    }
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  const Delete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this password?");
    if (!confirmed) return;

    try {
      const response = await fetch('https://pg-backend-7p7k.onrender.com/passwords', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id })
      });
      if (!response.ok) throw new Error('Failed to delete password on server.');
      
      const newPasswordArray = passwordArray.filter(item => item.id !== id);
      setpasswordArray(newPasswordArray);
      
      toast('🔐 Entry wiped from the vault.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
    catch (error) {
      console.error("Error deleting password via API:", error);
    }
  }

  const edit = (id) => {
    setform(passwordArray.filter(i => i.id === id)[0])
    setpasswordArray(passwordArray.filter(item => item.id !== id))
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      
      <div className="fixed inset-0 -z-10 bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      </div>

      <div className="w-full min-h-screen flex flex-col items-center">
        
        {/* === HERO SECTION === */}
        {/* h-auto on mobile, 50vh on desktop */}
        <div className="bg-gray-300 w-full h-auto md:h-[50vh] py-8 md:py-0 shadow-md flex flex-col justify-center">
          <div className="max-w-7xl mx-auto px-4 w-full flex flex-col items-center">
            
            <div className="flex items-center justify-center mb-2">
              <h1 className="text-4xl md:text-5xl font-bold text-[#1E212E]">Cypher</h1>
              <h1 className="text-4xl md:text-5xl font-bold text-blue-400">Vault</h1>
            </div>

            <p className="text-xl md:text-3xl text-gray-900 font-semibold text-center mb-8">
              Your own Password Manager
            </p>

            <div className="flex flex-col gap-6 w-full">
              
              <input
                type="text" value={form.site} onChange={handleChange} name="site"
                className="bg-[#1E212E] text-xl border border-blue-500 text-white px-4 py-3
                rounded-full placeholder-gray-400 transition
                focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-300 
                shadow-[0_0_15px_rgba(0,140,255,0.7)]
                w-full" 
                placeholder="Enter website url..."
              />

              <div className="flex flex-col md:flex-row gap-6 w-full">
                
                <input
                  type="text" value={form.username} onChange={handleChange} name="username"
                  className="bg-[#1E212E] text-xl border border-blue-500 text-white px-4 py-3
                  rounded-full focus:outline-none focus:ring-2 focus:ring-blue-900 
                  focus:border-blue-300 placeholder-gray-400 transition 
                  shadow-[0_0_12px_rgba(0,140,255,0.4)]
                  w-full md:flex-[2]" 
                  placeholder="Your username..."
                />

                {/* Password & Eye Wrapper */}
                <div className="flex items-center gap-4 w-full md:flex-[1]"> 
                  <input
                    type="password" ref={passRef} value={form.password} onChange={handleChange} name="password"
                    className="bg-[#1E212E] text-xl border border-blue-500 text-white px-4 py-3
                    rounded-full focus:outline-none focus:ring-2 focus:ring-blue-900 
                    focus:border-blue-300 placeholder-gray-400 transition 
                    shadow-[0_0_12px_rgba(0,140,255,0.4)]
                    w-full"
                    placeholder="Enter password"
                  />
                  {/* Eye Icon Outside */}
                  <span className="cursor-pointer shrink-0" onClick={showPass}>
                    <img src="view.png" ref={ref} className="w-7 h-7" alt="Toggle" />
                  </span>
                </div>
              </div>

              <div className="flex justify-center mt-4">
                <button onClick={savePassword}
                  className="flex items-center gap-2 px-8 py-3 rounded-full 
                  bg-gradient-to-r from-blue-100 to-indigo-600 
                  text-white font-semibold text-lg
                  shadow-[0_0_12px_rgba(0,140,255,0.45)]
                  hover:shadow-[0_0_18px_rgba(0,140,255,0.65)]
                  hover:scale-105 active:scale-95 
                  transition-all duration-200 cursor-pointer"
                >
                  <lord-icon
                    src="https://cdn.lordicon.com/rpviwvwn.json"
                    trigger="hover"
                    style={{ width: "35px", height: "35px" }}
                  ></lord-icon>
                  Add Password
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* === RESPONSIVE TABLE SECTION === */}
        <div className="max-w-7xl w-full px-4 mt-12 mb-24">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight text-center mb-8">
            Your Saved Passwords
          </h1>

          {passwordArray.length === 0 ? (
            <div className="text-center text-xl text-gray-500">
              No passwords saved yet.
            </div>
          ) : (
            // Changed: Removed overflow-x-auto, added w-full
            <div className="w-full rounded-xl shadow-[0_0_15px_rgba(0,140,255,0.25)] border border-gray-200">
              {/* Changed: Added table-fixed */}
              <table className="w-full table-fixed text-gray-200"> 
                
                <thead className="bg-blue-800 text-blue-300 uppercase text-xs md:text-lg">
                  <tr>
                    {/* Changed: Adjusted percentages and padding for squeeze fit */}
                    <th className="py-3 px-2 md:px-6 text-left w-[40%]">Site</th>
                    <th className="py-3 px-2 md:px-6 text-left w-[30%]">User</th>
                    <th className="py-3 px-2 md:px-6 text-left w-[15%]">Pass</th>
                    <th className="py-3 px-2 md:px-6 text-center w-[15%]">Actions</th>
                  </tr>
                </thead>

                <tbody className="bg-[#161922]">
                  {passwordArray.map((item, index) => (
                    <tr key={index} className="border-b border-gray-700 hover:bg-[#1f2430] transition text-sm md:text-xl">
                      
                      {/* Added break-all to force line break on long text */}
                      <td className="py-3 px-2 md:px-6 break-all">
                        <a href={item.site} target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-500 underline">
                          {item.site}
                        </a>
                      </td>
                      
                      <td className="py-3 px-2 md:px-6 break-all">{item.username}</td>
                      
                      <td className="py-3 px-2 md:px-6">
                        <div className="flex items-center">
                          <span className="tracking-widest">{"•".repeat(Math.min(item.password.length, 10))}</span>
                        </div>
                      </td>
                      
                      <td className="py-3 px-2 md:px-6 text-center">
                        <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4">
                          <div onClick={() => { edit(item.id) }} className="cursor-pointer">
                            <lord-icon  src="https://cdn.lordicon.com/exymduqj.json"
                              trigger="hover" 
                              style={{ width: "30px", height: "30px",backgroundColor: "white", borderRadius: "10px" }} // Smaller icons on mobile
                            ></lord-icon>
                          </div>
                          <div onClick={() => { Delete(item.id) }} className="cursor-pointer">
                            <lord-icon src="https://cdn.lordicon.com/jzinekkv.json"
                              trigger="hover" 
                              style={{ width: "30px", height: "30px",backgroundColor: "white", borderRadius: "10px" }}
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;