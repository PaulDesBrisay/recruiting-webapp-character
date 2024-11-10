import { SetStateAction, useState } from 'react';
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from './consts';


/** Initilize all ability scores to 10 ( default modifier of 0) */
/** Use context to allow scores to be modified inside children but accessed throughout*/
const attributes = new Map<string, number>();
const skillPoints = new Map<string, number>();



function Character(props){

    /** Use a mutable element for the name for future work where it can be changed. Id can never be changed */
    const [charName, setCharName] = useState(props.charName);
    const attributeItems = ATTRIBUTE_LIST.map(attribute => <li><Attribute type={attribute}/></li>);
    const skills = SKILL_LIST.map(skill => <li><Skill name={skill.name} attributeModifier={skill.attributeModifier} points ={0}/></li>);

    for(var att in ATTRIBUTE_LIST){
        attributes.set(ATTRIBUTE_LIST[att], 10);
    }

    for(var ski in SKILL_LIST){
        skillPoints.set(SKILL_LIST[ski].name, 0);
    }


    function getStats(){
      const out = {
        'id':props.id,
        'name':charName,
        'attributes':attributes,
        'skills':skills
      };
      return out;
    }

    function setStats(input : Map<string, object>){
      setCharName(input.get('name'));
      
    }


    return(
      <div>
        <h1>{charName}</h1>
        <div className='Character'>
          <section className='AttributeSection'>
            <h1>Attributes</h1>
            <ul>{attributeItems}</ul>
          </section>
          <section className='SkillsSection'>
            <h1>Skills</h1>
            <ul>{skills}</ul>
          </section>
          <section className='ClassSection'>
            <h1>Classes</h1>
    
          /** CLASS SECTION HERE */
          </section>
          <section className='RollSection'>
            <SkillCheck/>
          </section>
        </div>
      </div>
    );
  }
  
  function Attribute(props){
    const [val, setVal] = useState(attributes.get(props.type));

    function updateVal(newVal){
        if(newVal>val){
          //only need to check on the increse
          let totalAttributes =0;
          attributes.forEach((v)=>{totalAttributes+=v});
          if(totalAttributes>=70){
            return;
          }
        }
        attributes.set(props.type, newVal);
        setVal(newVal);
    }
  
    /** should trigger a rerender of skills on click - do later */
    return(
      <div className='AbilityScore'>
        <h3>{props.type}</h3>
        <div>
          <h4>{val}</h4>
          <button onClick={()=>updateVal(val-1)}>-</button>
          <button onClick={()=>updateVal(val+1)}>+</button>
        </div>
        <div>
          Modifier: {getModifier(props.type)}
        </div>
      </div>
    );
  }
  
  function Skill(props){
    
    const [points, setPoints] = useState(props.points);

    function updatePoints(newPoints){
        if(newPoints>=0){
            if(newPoints>points){
                /** Check if allowed to spend more points, but only if points are being added */
                let sum = 1;
                skillPoints.forEach((v)=>{
                    sum+=v;
                });
                if(sum > (getModifier('Intelligence')*4 +10)){
                    /** do not set values */
                    /** potentially add some logic to disable all + buttons in skills */
                    return;
                }
            }
            skillPoints.set(props.name, newPoints);
            setPoints(newPoints);
        }
    }

    function getPoints(){
        return points;
    }


    return(
      <div className='SkillScore'>
        {props.name}: {points} 
        <button onClick={()=>updatePoints(points-1)}>-</button>
        <button onClick={()=>updatePoints(points+1)}>+</button>
         ({props.attributeModifier}): {getModifier(props.attributeModifier)} Total: {getModifier(props.attributeModifier)+points}
      </div>
    );
  }

  function getModifier(attribute: string){
    if(attributes.has(attribute)){
        return Math.floor((attributes.get(attribute)-10)/2);
    }
    return 0;
  }


  function SkillCheck(){
    const [roll, setRoll] = useState(0);
    const [succ, setSucc] = useState('');
    const [dc, setDc] = useState(0);
    const [skill, setSkill] = useState(SKILL_LIST[0].name);
    const [modifier, setModifier] = useState(getModifierVal(SKILL_LIST[0].name));

    function changeDc(event){
      setDc(event.target.value);
    }

    function changeSkill(event){
      setRoll(0);
      setSucc('');
      setModifier(getModifierVal(event.target.value));
      setSkill(event.target.value);
    }

    function getModifierVal(skillName : string){
      const skillIndex = SKILL_LIST.map(skill => skill.name).indexOf(skillName);
      return (getModifier(SKILL_LIST[skillIndex].attributeModifier)+skillPoints.get(skillName));
    }

    function rollDice(){
      const rll = Math.ceil(Math.random()*20);
      setRoll(rll);
      if(rll+modifier>= dc){
        setSucc("Success!!");
      }else{
        setSucc("Failure");
      }
    }

    return(
      <div>
        <input type='number' placeholder='DC' value={dc} onChange={changeDc} ></input>
        <select value={skill} onChange={changeSkill}>
          {SKILL_LIST.map(skill => <option value={skill.name}>{skill.name}</option>)}
        </select>
        <button onClick={rollDice}>Roll</button>
        <h2>{roll+modifier} ({roll}+{modifier})</h2>
        {succ!==null && succ!=='' ? <h3>{succ}</h3> : ''}
      </div>
    );
  }

  

  export default Character;