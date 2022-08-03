import './App.css';
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const DND_API = "https://www.dnd5eapi.co/api/spells/";

function SpellDetails() {
    const { index } = useParams();
    const effectRan = useRef(false);

    const [details, setDetails] = useState([]);
    const [keys, setKeys] = useState([]);

    useEffect(() => {

        if (!effectRan.current) {
            const getSpells = async () => {
                return await axios(DND_API + index).then(val => val.data);
            }

            getSpells().then(val => {
                setDetails(val);
                setKeys(Object.keys(val));
            });

            return () => {
                effectRan.current = true;
            }
        }
    }, []);

    console.log(details)

    return (
        <div className="spellDetails">
            {
                keys && keys.map(key => (
                    <div key={key} className="spell__detailRow">
                        <div className="spell__detailName">{key}</div>
                        <div className="spell__detailValue">{typeof details[key] === "string" && details[key]}</div>
                    </div>
                ))
            }
        </div>
    );
}

export default SpellDetails;
