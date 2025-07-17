const SweetList = ({ sweets }) => {
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
          className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow p-6 flex flex-col justify-between"
        >
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
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-md mt-4">
            Purchase
          </button>
        </div>
      ))}
    </div>
  );
};


export default SweetList;
