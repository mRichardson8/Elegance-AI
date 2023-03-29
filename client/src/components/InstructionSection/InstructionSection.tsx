const InstructionSection = () => {
    return (
      <div className="bg-white p-4 mb-1 rounded-md shadow-sm max-w-xl">
        <h2 className="text-xl font-semibold mb-3">How It Works</h2>
        <p className="text-gray-700 mb-2">
          Discover the perfect outfit for any event with our luxury fashion ai stylist. Follow these simple steps to create a stunning look:
        </p>
        <ol className="list-decimal list-outside pl-6">
          <li className="text-gray-700 mb-2">
            <strong>Search for Your Occasion</strong>: Use the search bar on the left to find outfit ideas for any occasion, from red-carpet galas to intimate cocktail parties.
          </li>
          <li className="text-gray-700 mb-2">
            <strong>Explore Our Collection</strong>: Browse our ai curated selection of designer outfits and choose your favorites, crafted with the finest materials and attention to detail.
          </li>
          <li className="text-gray-700">
            <strong>Customize Your Look</strong>: Use the arrows below each image to find similar items and create your unique style. Add luxury accessories for the perfect finishing touch.
          </li>
        </ol>
        <p className="text-gray-700 mt-2">
          Feel like a million dollars with every outfit. Happy shopping!
        </p>
      </div>
    );
  };

  export default InstructionSection;