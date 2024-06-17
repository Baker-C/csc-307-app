import React, { useState, useEffect }  from 'react';
import Table from "./Table"
import Form from "./Form"


function MyApp() {
  const [characters, setCharacters] = useState([])

  const BACKEND_URL = "http://localhost:8000/users"

  function fetchUsers() {
    const promise = fetch(BACKEND_URL)
    return promise
  }

  function postUser(person) {
    const promise = fetch(BACKEND_URL, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(person),
    })
    return promise
  }

  function updateList(person) {
    postUser(person)
      .then((res) => {
        if (res.status === 201) {
          return res.json()
        } else {
          console.log(res.json())
        }})
      .then((json) => {
        console.log(json)
        if (json) setCharacters([...characters, person])
      })
      .catch((err) => console.log(err))
  }

  function removeUser(id) {
    const promise = fetch(`${BACKEND_URL}/${id}`, {
      method: "DELETE",
      headers: { 
        "Content-type": "application/json"
       },
    })
    return promise
  }

  function removeOneCharacter(index) {
    const id = characters[index]?.id
    const updated = characters.filter((character, i) => {
      return (i !== index);
    });
    removeUser(id)
      .then(() => setCharacters(updated))
      .catch((err) => console.log(err))
  }

  // the initial data fetch for users
  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((err) => {console.log(err)})
  }, [characters])

  return (
    <div className="container">
        <Table 
          characterData={characters} 
          removeCharacter={removeOneCharacter}
        />
        <Form handleSubmit={updateList} />
    </div>
  );
}


export default MyApp;