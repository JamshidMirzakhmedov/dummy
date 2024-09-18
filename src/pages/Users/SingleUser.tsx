import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { User } from "../../Types/Types";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  FaUserAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaBuilding,
  FaCreditCard,
  FaEthereum,
} from "react-icons/fa";
import { getUserById } from "../../API/API";

const SingleUserPage = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    getUserById(id!)
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load user data. Please try again later.");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <div className="w-full px-4">
          <Skeleton height={256} />
          <Skeleton height={40} width="80%" />
          <Skeleton height={24} count={3} />
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-6 text-red-500">{error}</div>;
  }

  if (!user) {
    return <div className="text-center py-6 text-gray-500">No user found</div>;
  }

  return (
    <div className="flex justify-center">
      <div className="p-4 sm:p-6 w-full max-w-4xl">
        <div className="bg-white border rounded-lg shadow-md p-4 sm:p-6">
          {/* User's Profile Image */}
          <div className="flex flex-col sm:flex-row items-center mb-6">
            <img
              src={user.image}
              alt={`${user.firstName} ${user.lastName}`}
              className="w-24 h-24 rounded-full object-cover mb-4 sm:mb-0 sm:mr-4 border-4 border-blue-300"
            />
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-gray-600 flex items-center justify-center sm:justify-start">
                <FaEnvelope className="mr-2" /> {user.email}
              </p>
              <p className="text-gray-600 flex items-center justify-center sm:justify-start">
                <FaUserAlt className="mr-2" /> Role: {user.role}
              </p>
            </div>
          </div>

          {/* User's General Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Personal Info */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-md">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 flex items-center">
                <FaUserAlt className="mr-2" /> Personal Info
              </h2>
              <p>
                <strong>Gender:</strong> {user.gender}
              </p>
              <p>
                <strong>Age:</strong> {user.age}
              </p>
              <p>
                <strong>Blood Group:</strong> {user.bloodGroup}
              </p>
              <p>
                <strong>Height:</strong> {user.height} cm
              </p>
              <p>
                <strong>Weight:</strong> {user.weight} kg
              </p>
              <p>
                <strong>Eye Color:</strong> {user.eyeColor}
              </p>
              <p>
                <strong>Hair:</strong> {user.hair.color}, {user.hair.type}
              </p>
            </div>

            {/* Contact Info */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-md">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 flex items-center">
                <FaPhoneAlt className="mr-2" /> Contact Info
              </h2>
              <p>
                <strong>Phone:</strong> {user.phone}
              </p>
              <p className="flex items-center">
                <FaMapMarkerAlt className="mr-2" />
                <span>
                  <strong>Address:</strong> {user.address.address},{" "}
                  {user.address.city}, {user.address.state}
                </span>
              </p>
              <p>
                <strong>Country:</strong> {user.address.country}
              </p>
              <p>
                <strong>IP:</strong> {user.ip}
              </p>
              <p>
                <strong>Mac Address:</strong> {user.macAddress}
              </p>
            </div>

            {/* Company Info */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-md">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 flex items-center">
                <FaBuilding className="mr-2" /> Company Info
              </h2>
              <p>
                <strong>Company:</strong> {user.company.name}
              </p>
              <p>
                <strong>Department:</strong> {user.company.department}
              </p>
              <p>
                <strong>Title:</strong> {user.company.title}
              </p>
              <p>
                <strong>Address:</strong> {user.company.address.address},{" "}
                {user.company.address.city}, {user.company.address.state}
              </p>
            </div>

            {/* Bank Details */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-md">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 flex items-center">
                <FaCreditCard className="mr-2" /> Bank Details
              </h2>
              <p>
                <strong>Card Number:</strong> {user.bank.cardNumber}
              </p>
              <p>
                <strong>Card Type:</strong> {user.bank.cardType}
              </p>
              <p>
                <strong>Currency:</strong> {user.bank.currency}
              </p>
              <p>
                <strong>IBAN:</strong> {user.bank.iban}
              </p>
            </div>
          </div>

          {/* Crypto Info */}
          <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-md">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 flex items-center">
              <FaEthereum className="mr-2" /> Crypto Info
            </h2>
            <p>
              <strong>Coin:</strong> {user.crypto.coin}
            </p>
            <p>
              <strong>Wallet:</strong> {user.crypto.wallet}
            </p>
            <p>
              <strong>Network:</strong> {user.crypto.network}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleUserPage;
