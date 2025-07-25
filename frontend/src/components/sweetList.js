import { useState } from 'react';

const SweetList = ({
  sweets,
  onAction,
  onPurchaseClick,
  onRestockClick,
  onEditClick,
  onDeleteClick,
}) => {
  const [showMenuId, setShowMenuId] = useState(null);

  if (!sweets.length)
    return (
      <p className="text-center text-gray-500 mt-10 text-lg">
        🍬 No sweets available at the moment
      </p>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 p-4">
      {sweets.map((sweet) => (
        <div
          key={sweet._id}
          className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow p-6 flex flex-col justify-between relative"
        >
          {/* Action Menu Button */}
          <div className="absolute top-2 right-2">
            <button
              onClick={() =>
                setShowMenuId(showMenuId === sweet._id ? null : sweet._id)
              }
              className="text-gray-500 hover:text-gray-700"
            >
              ⋮
            </button>

            {showMenuId === sweet._id && (
              <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-10">
                <button
                  onClick={() => {
                    setShowMenuId(null);
                    onEditClick(sweet);
                  }}
                  className="block px-4 py-2 text-left w-full hover:bg-gray-100"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setShowMenuId(null);
                    onDeleteClick(sweet);
                  }}
                  className="block px-4 py-2 text-left w-full hover:bg-gray-100 text-red-500"
                >
                  Delete
                </button>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <center>
              <h2 className="text-2xl font-semibold text-orange-700">
                {sweet.name}
              </h2>
            </center>

            <table className="w-full text-left text-gray-600">
              <tbody>
                <tr>
                  <th className="font-semibold pr-2">Category</th>
                  <td>:</td>
                  <td>{sweet.category}</td>
                </tr>
                <tr>
                  <th className="font-semibold pr-2">Price</th>
                  <td>:</td>
                  <td>₹{sweet.price}</td>
                </tr>
                <tr>
                  <th className="font-semibold pr-2">In Stock</th>
                  <td>:</td>
                  <td>{sweet.quantity}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex space-x-2 mt-4">
            <button
              onClick={() => onPurchaseClick(sweet)}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-3 rounded-md w-1/2"
            >
              Purchase
            </button>
            <button
              onClick={() => onRestockClick(sweet)}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-3 rounded-md w-1/2"
            >
              Restock
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SweetList;
