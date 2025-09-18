import React, { useEffect, useState } from "react";
import { getPublishers } from "../../services/publishersService";
import PublisherRow from "./PublisherRow";
import Spinner from "../Spinner";

const Publishers = () => {
  const [publishers, setPublishers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadPublishers = async () => {
    setLoading(true);
    try {
      const data = await getPublishers();
      setPublishers(data);
    } catch (err) {
      setError("Publishers are taking a coffee break ☕. Please try again");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadPublishers();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <div className="title-container">
        <h1>Publishers</h1>
      </div>
      <div className="error-container">
        {error && <span className="error-span show">{error}</span>}
      </div>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Website</th>
            </tr>
          </thead>
          <tbody>
            {publishers.map((publisher) => (
              <PublisherRow
                key={publisher.id}
                name={publisher.name}
                address={publisher.address}
                website={publisher.website}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Publishers;
