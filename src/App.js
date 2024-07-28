import './App.css';
import Jeff from './Image/asset3 3.png';
import Vector from './Image/Vector.png';
import Vectors from './Image/Vector (1).png';
import { useForm, ValidationError } from '@formspree/react';
import axios from 'axios';
import { useState } from 'react';

function App() {
  const [state, handleSubmit] = useForm(process.env.REACT_APP_SUBMIT_CODE);
  const [emailError, setEmailError] = useState('');
  const HUNTER_API_KEY = process.env.REACT_APP_API_KEY; // Replace with your actual API key

  // Function to verify the email address using Hunter.io
  const verifyEmail = async (email) => {
    try {
      const response = await axios.get('https://api.hunter.io/v2/email-verifier', {
        params: {
          email: email,
          api_key: HUNTER_API_KEY
        }
      });

      if (response.data.data.result === 'deliverable') {
        setEmailError('');
        return true;
      } else {
        setEmailError('Email is not Valid.');
        return false;
      }
    } catch (error) {
      console.error('Error verifying email:', error);
      setEmailError('There was an error verifying the email.');
      return false;
    }
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const email = formData.get('email');
    
    // Assuming `verifyEmail` is an async function that checks the email validity
    const isEmailValid = await verifyEmail(email);
    
    if (isEmailValid) {
      // Extract other form data if needed
      const formValues = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
      };
      
      // Submit the form data to Formspree
      handleSubmit(formValues); // Ensure handleSubmit is used correctly
    } else {
      // Handle invalid email case
      console.error('Invalid email address');
    }
  };
  

  return (
    <div>
      <section className="px-4 sm:px-10 md:px-20 lg:px-40 xl:px-60 font-sedan">
        <div className="flex flex-col lg:flex-row my-20">
          <section className="bg-[#F3EDDC] flex flex-col text-center items-center justify-center px-5 py-5 gap-8 w-full">
            <p><img src={Vector} className='absolute w-[60%] lg:w-[30%] transfor -translate-x-48' /> </p>
            <img src={Jeff} alt="jeff" className="w-[80%] md:w-[60%]" />
            <h1 className="text-2xl md:text-3xl font-bold">GRAND OPENING</h1>
            <p className="text-sm md:text-base">
              The Jefferson Hospitality Group, a leading lifestyle hospitality company, cordially requests the pleasure of your presence at the opening ceremony of the exquisite Ivy Lush Hotel.
            </p>
            <p className="text-sm md:text-xl font-bold">AUG | SUN 4th | 2024</p>
            <p className="text-sm md:text-base">Time: Four o’clock in the Evening (4pm) to Ten o’clock (10pm)</p>
            <p className="text-sm md:text-base">
              Location: Ivy Lush Hotel, Shinkeli Junction along NPA Expressway, Warri, 332213, Delta State, Nigeria.
            </p>
            <p className="text-sm md:text-lg">RSVP (Chioma): <b className='text-xl'>+234 813 510 1265</b></p>
          </section>

          <section className="flex flex-col items-center justify-center text-center bg-white w-full p-5 lg:p-10">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">RSVP</h1>
              <p className="text-sm md:text-base mt-3">Kindly Confirm Your esteemed Presence</p>
            </div>
            {state.succeeded ? (
              <p className="text-green-500 mt-5">Thanks for joining! We'll be in touch soon.</p>
            ) : (
              <form onSubmit={handleFormSubmit} className="flex flex-col justify-between text-left w-full gap-4 mt-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm md:text-base">Enter your Full Name</label>
                  <input type="text" id="name" name="name" placeholder="John Doe" className="border p-2 w-full outline-none" required />
                  <ValidationError prefix="Name" field="name" errors={state.errors} />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm md:text-base">Enter your Email Address</label>
                  <input type="email" id="email" name="email" placeholder="sample@gmail.com" className="border p-2 w-full outline-none" required />
                  {emailError && <p className="text-red-500">{emailError}</p>}
                  <ValidationError prefix="Email" field="email" errors={state.errors} />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="phone" className="text-sm md:text-base">Enter your Phone Number</label>
                  <input type="text" id="phone" name="phone" placeholder="+2348012345678" className="border p-2 w-full outline-none" required />
                  <ValidationError prefix="Phone" field="phone" errors={state.errors} />
                </div>

                <input
                  type="submit"
                  value="Submit"
                  disabled={state.submitting}
                  className="bg-[#7F5D3B] w-full py-2 text-white cursor-pointer mt-4"
                />
              </form>
            )}
          </section>
        </div>
      </section>

      <section className='flex justify-center pb-3 font-sedan'>
        <div className='flex gap-1'>
          <p><img src={Vectors} width={15} className='mt-1'/></p> 
          <p>2024 Ivy Lush Hotel. All rights reserved</p>
        </div>
      </section>
    </div>
  );
}

export default App;
