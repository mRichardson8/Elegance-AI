# hackerthon
    <div className="min-h-screen bg-gray-100">
      <div className="sidebar w-1/4 h-full bg-white fixed p-4">
        <h2 className="text-xl font-semibold mb-4">Search</h2>
        <input type="text" placeholder="Enter search term" className="w-full p-2 border border-gray-300 rounded-md" />
      </div>
      <div className="main-container w-3/4 ml-auto p-4">
        <div className="flex justify-center">
          <div className="w-64 h-80 m-4 p-4 bg-white shadow-lg rounded-md flex items-center justify-center">
            <h1 className="text-2xl font-bold">NET-A-PORTER</h1>
          </div>
          {items.map((item, index) => (
            <Card key={index} title={item.title} price={item.price} />
          ))}
        </div>
      </div>
    </div>




