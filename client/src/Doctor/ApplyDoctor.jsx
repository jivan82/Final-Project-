import React, { useState } from 'react';
import axios from 'axios';
import { API, ID, token } from '../network';

const ApplyDoctor = () => {
  const [message, setMessage] = useState(null);
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
    hospital: '',
    specialization: '',
    experience: '',
    feePerConsultation: '',
    website: '',
    timings: '',
    userId: `${ID}`,
  });
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data.timings.slice(0, 2));
    if (data?.timings.slice(0, 2) >= 17 || data?.timings.slice(0, 2) <= 7) {
      alert('Please Apply Between 7AM to 5PM');
    } else {
      try {
        const res = await axios.post(
          `${API}/api/user/apply-doctor-account`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.data.success) {
          setMessage(res.data.message);
        } else {
          setMessage(res.data.message);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className="apply-doctor p-5">
      <h2 className="text-primary text-center fw-bolder">Apply for Doctor</h2>

      <hr />
      {message !== null && (
        <div className=" text-center alert alert-success">{message}</div>
      )}
      <form
        className="apply-doctor-form d-flex flex-column"
        onSubmit={handleSubmit}
      >
        <div
          className="form-field d-flex justify-content-center"
          style={{ gap: '2rem' }}
        >
          <div className="personal">
            <h3 className="text-secondary fw-bold py-3">
              Personal Information
            </h3>
            <div className="form-group">
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                onChange={handleChange}
                name="firstName"
                value={data.firstName}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                value={data.lastName}
                name="lastName"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber" className="form-label">
                Phone Number
              </label>
              <input
                type="text"
                onChange={handleChange}
                name="phoneNumber"
                className="form-control"
                id="phoneNumber"
                value={data.phoneNumber}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                required
                value={data.address}
                name="address"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="website" className="form-label">
                Website (Any Social Media Link)
              </label>
              <input
                type="text"
                className="form-control"
                id="website"
                required
                name="website"
                value={data.website}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="professional">
            <h3 className="text-secondary py-3 fw-bold">
              Professional Information
            </h3>
            <div className="form-group">
              <label htmlFor="specialization" className="form-label">
                Specialization
              </label>
              <input
                type="text"
                className="form-control"
                id="speciality"
                name="specialization"
                onChange={handleChange}
                value={data.specialization}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="experience" className="form-label">
                Experience (in years)
              </label>
              <input
                type="number"
                className="form-control"
                id="experience"
                name="experience"
                onChange={handleChange}
                value={data.experience}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="hospital" className="form-label">
                Hospital Name
              </label>
              <input
                type="text"
                className="form-control"
                id="hospital"
                name="hospital"
                onChange={handleChange}
                value={data.hosital}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="consultation" className="form-label">
                Fee Per consultation (in Rs.)
              </label>
              <input
                type="number"
                className="form-control"
                id="consultation"
                name="feePerConsultation"
                onChange={handleChange}
                value={data.feePerConsultation}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="timings" className="form-label">
                Available Time
              </label>
              <input
                type="time"
                className="form-control"
                id="timings"
                name="timings"
                onChange={handleChange}
                value={data.timings}
                required
              />
            </div>
          </div>
        </div>

        <div className="submit-btn align-self-center">
          <button
            type="submit"
            className="btn px-4 py-2 mt-4 btn-primary"
            // onClick={(event) => event.preventDefault()}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplyDoctor;
