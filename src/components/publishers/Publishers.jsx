import React, { useEffect, useState } from "react";
import { getSortedPublishers } from "../../services/publishersService";
import PublisherRow from "./PublisherRow";
import Spinner from "../Spinner";

const Publishers = () => {
  const [publishers, setPublishers] = useState([]);
  const [sortBy, setSortBy] = useState("Name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadPublishers = async () => {
    setLoading(true);
    try {
      const data = await getSortedPublishers(sortBy, sortDirection);
      setPublishers(data.items);
    } catch (err) {
      setError("Publishers are taking a coffee break ☕. Please try again");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadPublishers();
  }, [sortBy, sortDirection]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <div className="title-container">
        <h1>Publishers</h1>

        <div className="sorting-dropdown">
          <label htmlFor="sortSelect">Sort by: </label>
          <select
            id="sortSelect"
            value={`${sortBy}-${sortDirection}`}
            onChange={(e) => {
              const [column, direction] = e.target.value.split("-");
              setSortBy(column);
              setSortDirection(direction);
            }}
          >
            <option value="Name-asc">Name ASC</option>
            <option value="Name-desc">Name DESC</option>
            <option value="Address-asc">Address ASC</option>
            <option value="Address-desc">Address DESC</option>
          </select>
        </div>
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
