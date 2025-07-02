  interface Props {
    bannerType: string;
    selectedCharacters: string[];
    selectedWeapons: string[];
    allCharacters: string[];
    allWeapons: string[];
    designatedItem: string | null;
    pathPoints: number;
    charToAdd: string;
    weaponToAdd: string;
    setCharToAdd: (val: string) => void;
    setWeaponToAdd: (val: string) => void;
    handleAdd: (item: string, type: 'char' | 'weapon') => void;
    handleRemove: (item: string, type: 'char' | 'weapon') => void;
    handleDesignatedSelect: (val: string) => void;
    featured5Stars: string[];
  }

  export default function CustomizeFeaturedItems({
    bannerType,
    selectedCharacters,
    selectedWeapons,
    allCharacters,
    allWeapons,
    designatedItem,
    pathPoints,
    charToAdd,
    weaponToAdd,
    setCharToAdd,
    setWeaponToAdd,
    handleAdd,
    handleRemove,
    handleDesignatedSelect,
    featured5Stars,
  }: Props) {
    
  return (
    <div className="bg-white rounded-2xl shadow-md p-5 space-y-4 border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-800">Customize Featured Items</h2>
      {bannerType === 'chronicle' && (
        <>
          <div className="flex gap-2">
            <select
              value={charToAdd}
              onChange={e => setCharToAdd(e.target.value)}
              className="flex-1 p-2 rounded border border-gray-300">
              <option value="">Select Character</option>
              {allCharacters.filter(c => !selectedCharacters.includes(c)).map(char => (
                <option key={char} value={char}>{char}</option>
              ))}
            </select>
            <button
              onClick={() => handleAdd(charToAdd, 'char')}
              disabled={!charToAdd}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition">Add
            </button>
          </div>

          {selectedCharacters.map(char => (
            <div key={char} className="flex justify-between items-center bg-gray-100 px-3 py-1 rounded">
              <span>{char}</span>
              <button onClick={() => handleRemove(char, 'char')} className="text-red-600 font-bold">×</button>
            </div>
          ))}

          <div className="flex gap-2 mt-4">
            <select
              value={weaponToAdd}
              onChange={e => setWeaponToAdd(e.target.value)}
              className="flex-1 p-2 rounded border border-gray-300">
              <option value="">Select Weapon</option>
              {allWeapons.filter(w => !selectedWeapons.includes(w)).map(weap => (
                <option key={weap} value={weap}>{weap}</option>
              ))}
            </select>
            <button
              onClick={() => handleAdd(weaponToAdd, 'weapon')}
              disabled={!weaponToAdd}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition">Add
            </button>
          </div>

          {selectedWeapons.map(weap => (
            <div key={weap} className="flex justify-between items-center bg-gray-100 px-3 py-1 rounded">
              <span>{weap}</span>
              <button onClick={() => handleRemove(weap, 'weapon')} className="text-red-600 font-bold">×</button>
            </div>
          ))}
        </>
      )}

      <div>
        <label className="block text-sm font-semibold mb-1">Designated 5★ Item</label>
        <select
          className="w-full p-2 rounded border border-gray-300"
          value={designatedItem || ''}
          onChange={e => handleDesignatedSelect(e.target.value)}>
          <option value="">None</option>
          {featured5Stars.map(item => (
          <option key={item} value={item}>{item}</option>
          ))}
        </select>
        <p className="text-sm text-gray-600 mt-1">Path Points: {pathPoints}</p>
      </div>
    </div>
  );
}
