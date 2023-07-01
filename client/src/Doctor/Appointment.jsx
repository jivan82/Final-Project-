import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ContextUser } from '../Context/UserContext';
import { API, token } from '../network';
import moment from 'moment';

const Appointment = () => {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [isAvailable, setIsAvailable] = useState(false);
  const navigate = useNavigate();
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const user = useContext(ContextUser);
  const [doctor, setDoctor] = useState(null);
  const params = useParams();

  // Get Doctor
  const getDoctor = () => {
    axios
      .post(
        `${API}/api/doctor/get-doctor-info-by-id`,
        {
          doctorId: params.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
          setDoctor(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // Check Availablilty of Doctor
  const checkAvailability = () => {
    if (
      // input data>=doctordata and input data<=17
      time.slice(0, 2) >= doctor?.timings.slice(0, 2) &&
      time.slice(0, 2) <= 17
    ) {
      axios
        .post(
          `${API}/api/user/check-booking-availability`,
          {
            doctorId: params.id,
            date,
            time,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          if (res.data.success) {
            setSuccess(res.data.message);
            setIsAvailable(true);
            setTimeout(() => {
              setSuccess(null);
            }, 3000);
          } else {
            setError(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return alert('Please Select Time Between Doctor Timings to 5PM');
    }
  };
  // Book Appointment
  const bookNow = () => {
    axios
      .post(
        `${API}/api/user/book-appointment`,
        {
          doctorId: params.id,
          userId: user._id,
          doctorInfo: doctor,
          userInfo: user,
          date,
          time,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
          setSuccess(res.data.message);
          navigate('/profile');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (token) getDoctor();
  }, []);
  return (
    <div className="appointment py-4 container">
      <h4 className="text-primary  text-center fw-bold">Appointment</h4>
      <h3 className="text-primary text-dark text-center fw-bolder">
        Book an Appointment
      </h3>
      <div className="doctor-info">
        <h4 className="fw-bold text-secondary">
          Doctor, {doctor?.firstName} {doctor?.lastName}
        </h4>
        <div className="doctor-sub-info px-2 row">
          <ul className="list-group list-group-action col-md-6">
            <li className="list-group-item list-group-item-secondary">
              <span className="fw-bold"> Phone Number: </span>
              {doctor && doctor.phoneNumber}
            </li>
            <li className="list-group-item list-group-item-info">
              <span className="fw-bold"> Timings: </span>
              {doctor && doctor.timings}
              {doctor && doctor.timings >= 12 ? 'PM' : 'AM'}
            </li>
            <li className="list-group-item list-group-item-primary">
              <span className="fw-bold"> Hospital: </span>
              {doctor && doctor.hospital}
            </li>
            <li className="list-group-item list-group-item-warning">
              <span className="fw-bold"> Address: </span>
              {doctor && doctor.address}
            </li>
            <li className="list-group-item list-group-item-success">
              <span className="fw-bold"> Fee Per Visit: </span>
              Rs.{doctor && doctor.feePerConsultation}
            </li>
          </ul>
          <div className="form col-md-6">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="date">Date</label>
                  <input
                    type="date"
                    className="form-control"
                    placeholder="Enter your date"
                    required
                    onChange={(value) => {
                      setDate(value.target.value);
                      setIsAvailable(false);
                    }}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="time">Time</label>
                  <input
                    type="time"
                    className="form-control"
                    placeholder="Enter your time"
                    onChange={(value) => {
                      setTime(value.target.value);
                      setIsAvailable(false);
                    }}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6 mt-3">
                <div className="form-group">
                  {!isAvailable ? (
                    <button
                      className="btn btn-primary"
                      onClick={checkAvailability}
                      disabled={date === undefined || time === undefined}
                    >
                      Check Availability
                    </button>
                  ) : (
                    <button className="btn btn-primary" onClick={bookNow}>
                      Book Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {success !== null && <div className="alert alert-success">{success}</div>}
      {error !== null && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Appointment;
