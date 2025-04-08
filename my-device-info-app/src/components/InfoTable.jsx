import React from 'react';
import PropTypes from 'prop-types';

// Helper function to format keys (camelCase -> Title Case)
const formatKey = (key) => {
  // ... (implementation from previous example)
  if (!key) return '';
  const result = key
    .replace(/_/g, ' ') // Replace underscores with spaces
    .replace(/([A-Z])/g, ' $1') // Add space before uppercase letters
    .replace(/^./, (str) => str.toUpperCase()); // Capitalize first letter
  return result.trim();
};

const InfoTable = ({ data, title }) => {
  // ... (implementation from previous example)
  if (!data || Object.keys(data).length === 0) {
    return <p className="info">{title ? `${title}: ` : ''}No data available.</p>;
  }

  return (
    <div>
      {title && <h3>{title}</h3>}
      <table>
        <tbody>
          {Object.entries(data).map(([key, value]) => (
            <tr key={key}>
              <th>{formatKey(key)}</th>
              <td>
                {typeof value === 'boolean' ? (value ? 'Yes' : 'No') :
                 typeof value === 'object' && value !== null ? <pre>{JSON.stringify(value, null, 2)}</pre> :
                 String(value ?? 'N/A')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

InfoTable.propTypes = {
  data: PropTypes.object,
  title: PropTypes.string,
};

export default InfoTable;