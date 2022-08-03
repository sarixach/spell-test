import './App.css';
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import {IconButton} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

const DND_API = "https://www.dnd5eapi.co/api/spells/";

function SpellFavourites() {
    const effectRan = useRef(false);
    const [spells, setSpells] = useState([]);

    const [details, setDetails] = useState([]);
    const [keys, setKeys] = useState([]);

    useEffect(() => {

        if (!effectRan.current) {
            const getSpells = async () => {
                return await axios(DND_API).then(val => val.data);
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


    return (
        <div className="spellList">
            {/*{*/}
            {/*    spells && spells.map(spell => (*/}
            {/*        <div key={spell.index} className="spellRow" onClick={() => spellDetails(spell)}>*/}
            {/*            <IconButton>*/}
            {/*                <StarIcon color={favorites.includes(spell.index) ? "primary" : "disabled"} onClick={(e) => {*/}
            {/*                    e.stopPropagation();*/}
            {/*                    addOrRemoveFavourite(spell);*/}
            {/*                }}/>*/}
            {/*            </IconButton>*/}
            {/*            <div className="spellName">{spell.name}</div>*/}
            {/*        </div>*/}
            {/*    ))*/}
            {/*}*/}
        </div>
    );
}

export default SpellFavourites;
