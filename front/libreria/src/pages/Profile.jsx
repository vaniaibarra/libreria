import { useAuth } from "../context/Context";

function Profile() {

    const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-6 mb-6">
        <img 
          src={user.photoUrl} 
          alt={`${user.username} foto`} 
          className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
        />

        <div>
          <h2 className="text-2xl font-semibold">{user.username}</h2>
          <p className="text-gray-600 mt-2 max-w-md">{user.description}</p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Productos subidos</h3>
        {user.products && user.products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {user.products.map((product) => (
              <div key={product.id} className="border rounded p-2">
                <img 
                  src={product.imgUrl} 
                  alt={product.name} 
                  className="w-full h-32 object-cover rounded"
                />
                <p className="mt-2 text-center">{product.name}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No hay productos subidos.</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
