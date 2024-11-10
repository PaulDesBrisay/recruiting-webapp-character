import Character from "./Character";
import { useState } from "react";

function CharacterEditor(){
    const [list, setList]= useState([]);
    const [charName, setCharName]=useState<string>('');

    function onChange(event){
        setCharName(event.target.value);
    }

    function onAdd(){
        const id = crypto.randomUUID;
        const newList = list.concat(<Character charName ={charName} id = {id}/>);
        setList(newList);
    }

    function onLoad(){
        /* load json from api**/
        fetch('https://api.example.com/users')
        .then(response => response.json())
        .then(data => {
            for(var dat in JSON.parse(data)){
                
            }
        })
        .catch(error => {
            console.log({error})
        });
    }

    function onSave(){
        const out = [];
        for(var character in list){
            //Want this to work like Java where I can loop through the <Character> object and use the getStats method. Not familiar enough with react for this
            //out=out.concat((Character)character))
        }
        //not sure how to iterate through my list, confused on the sloppy mapping to <Character>
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({out})
        };
        console.log(requestOptions.body);
        fetch('https://recruiting.verylongdomaintotestwith.ca/api/{{PaulDesBrisay}}/character', requestOptions)
            .then(response => response.json())
            .then(data => this.setState({ postId: data.id }));

    }

    return(
        <div>
            <div>
                <input type='text' placeholder='New Character Name' value={charName} onChange={onChange}/>
                <button onClick={onAdd}>Add New Character</button>
                <button onClick={onSave}>Save All</button>
                <button onClick={onLoad}>Load All</button>

            </div>
            <ul>
                {list}
            </ul>
        </div>
    );
}


export default CharacterEditor;