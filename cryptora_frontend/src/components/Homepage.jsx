import React from 'react';

const HomePage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-gray-200">
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 border-b border-gray-600 pb-2">Security</h2>
        <p className="mb-4">
          Cryptora is designed to ensure the highest standards of data security and privacy. Our infrastructure and encryption mechanisms are continuously tested and improved to meet industry best practices.
        </p>
        <ul className="list-disc ml-6 space-y-2">
          <li>End-to-end AES encryption of stored credentials</li>
          <li>JWT-based authentication with token expiry management</li>
          <li>Role-based authorization with granular access control</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 border-b border-gray-600 pb-2">Features</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>Securely store and retrieve credentials linked to your account</li>
          <li>Update, delete, and manage credentials with ease</li>
          <li>View audit logs and activity history of your operations</li>
          <li>Modern, clean UI optimized for security and usability</li>
        </ul>
      </section>
    </div>
  );
};

export default HomePage;
