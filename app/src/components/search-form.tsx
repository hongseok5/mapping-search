
import React, {useState, useEffect} from 'react'

const SearchForm: React.FC = () => {

    const [tableNames, setTableNames] = useState<string[]>([]);
    const [selectedTableName, setSelectedTableName] = useState<string>('');
    const [propertyIds, setPropertyIds] = useState<string[]>([]);
    const [selectedPropertyId, setSelectedPropertyId] = useState<string>('');
    const [mappings, setMappings] = useState<Mapping[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');

    return(
        <div>
            <div>
            <label>Table Name: </label>
            <select value={selectedTableName} onChange={e => setSelectedTableName(e.target.value)}>
                <option value="">All</option>
                {tableNames.map(tableNm => (
                <option key={tableNm} value={tableNm}>
                    {tableNm}
                </option>
                ))}
            </select>
            </div>
            <div>
            <label>Class Name: </label>
            <select value={selectedPropertyId} onChange={e => setSelectedPropertyId(e.target.value)}>
                <option value="">All</option>
                {propertyIds.map(proptName => (
                <option key={proptName} value={proptName}>
                    {proptName}
                </option>
                ))}
            </select>
            </div>
            <div>
            <label>Search: </label>
            <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
            <button onClick={fetchData}>Fetch Data</button>
            </div>
        </div>
    )
}