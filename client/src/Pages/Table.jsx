import React from "react";
import moment from "moment";
const Table = ({ appointments }) => {
  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead className="table-secondary">
          <tr>
            <th scope="col">Doctor</th>
            <th scope="col">Specialization</th>
            <th scope="col">Date</th>
            <th scope="col">Time</th>
            <th scope="col">Fee To Pay</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments &&
            appointments.map((appointment) => (
              <tr key={appointment._id}>
                <td>{appointment?.doctorInfo.firstName}</td>
                <td>{appointment?.doctorInfo.specialization}</td>
                <td>{appointment?.date.substring(0, 10)}</td>
                <td>{moment(appointment?.time).format("hh:mm A")}</td>
                <td>Rs.{appointment?.doctorInfo?.feePerConsultation}</td>
                <td>{appointment?.status}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
