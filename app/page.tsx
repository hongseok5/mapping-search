"use client"
import React, {useState, useEffect} from 'react'
import {Mapping} from './src/interface/mapping';

const Home: React.FC = () => {

  const [tableNames, setTableNames] = useState<string[]>([]);
  const [selectedTableName, setSelectedTableName] = useState<string>('');
  const [propertyIds, setPropertyIds] = useState<string[]>([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>('');
  const [mappings, setMappings] = useState<Mapping[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchTableNames = async () => {
      try {
        const response = await fetch('/api/tables');
        const data = await response.json();
        console.log(data)
        setTableNames(data);
      } catch (error) {
        console.error('Error fetching table names:', error);
      }
    };

    fetchTableNames();
  }, []);

  const fetchData = async () => {
    try {
      let query = "/api/mappings"
      if(searchTerm ){
        query = `${query}?keyword=${searchTerm}`
      }
      if(searchTerm && selectedTableName){
        query = `${query}&tablenm=${selectedTableName}`
      }
      if(!searchTerm && selectedTableName){
        query = `${query}?tablenm=${selectedTableName}`
      }
      const response = await fetch(query); // API 엔드포인트로 요청 보내기
      if (response.ok) {
        response.json().then( v => {
          setMappings(v);
        }, err=> {
          console.error(err)
        }).catch(err => {
          console.error(err)
        })

      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  /**
            <div>
          <label>Class Name: </label>
          <select value={selectedProptName} onChange={e => setSelectedProptName(e.target.value)}>
            <option value="">All</option>
            {proptNames.map(proptName => (
              <option key={proptName} value={proptName}>
                {proptName}
              </option>
            ))}
          </select>
        </div>

   */
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
      <h1>Data Table</h1>
      
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

        <table>
          <thead>
            <tr>
              <th>Class Name</th>
              <th>Class ID</th>
              <th>Propt Name</th>
              <th>Propt ID</th>
              <th>Colum Name</th>
              <th>Data Type</th>
              <th>Table Name</th>
              <th>Description</th>
              <th>Rmk</th>
            </tr>
          </thead>
          <tbody>
            {mappings.map( (m, i) =>     
              <tr key={i}>
              <React.Fragment>
                <td>{m.class_name}</td>
                <td>{m.class_id}</td>
                <td>{m.propt_name}</td>
                <td>{m.propt_id}</td>
                <td>{m.colum_name}</td>
                <td>{m.data_type}</td>
                <td>{m.table_name}</td>
                <td>{m.description}</td>
                <td>{m.rmk}</td>
              </React.Fragment>
              </tr>  
            )}
          </tbody>
        </table>
      </div>
    </main>
  )
}
export default Home;