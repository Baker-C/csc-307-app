import React from 'react'

function TableHeader() {
    return (
      <thead>
        <tr>
          <th>Name</th>
          <th>Job</th>
          <th>ID</th>
        </tr>
      </thead>
    );
  }
  
  function TableBody({ characterData, removeCharacter }) {
    const rows = characterData.map(({ name, job, id }, index) => {
      return (
        <tr key={index}>
          <td>{name}</td>
          <td>{job}</td>
          <td>{id}</td>
          <td>
            <button onClick={() => removeCharacter(index)}>
              Delete Character
            </button>
          </td>
        </tr>
      );
    });
    return (
      <tbody>
        {rows}
      </tbody>
    );
  }

  function Table({ characterData, removeCharacter }) {
    return (
      <table>
        <TableHeader />
        <TableBody 
          characterData={characterData}
          removeCharacter={removeCharacter}  
        />
      </table>
    );
}

export default Table;