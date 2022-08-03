import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";
import {useHistory, useLocation} from "react-router-dom";
import {IconButton} from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import _ from "lodash";

const DND_API = "https://www.dnd5eapi.co/api/spells";

function SpellList() {
    const history = useHistory();
    const location = useLocation();

    const [spells, setSpells] = useState([]);
    const [favorites, setFavorites] = useState(() => {
        return JSON.parse(localStorage.getItem('favourites'));
    });

    useEffect(() => {
        const getSpells = async () => {
            return await axios(DND_API).then(val => val.data);
        }

        getSpells().then(val => {
            const data = val.results.splice(0, 50); // get first 50 items

            if (location.pathname === "/favourites") {

                setSpells(_.reduce(data, (acc, i) => {
                    if (favorites.indexOf(i.index) !== -1) {
                        acc.push(i)
                    }

                    return acc;
                }, []));
            } else {
                setSpells(data);
            }
        });


    }, [favorites, location.pathname]);

    const spellDetails = ({index}) => {
        history.push(`/spell/${index}`)
    };

    const addOrRemoveFavourite = ({index: indexName}) => {
        let fav = JSON.parse(localStorage.getItem('favourites'));

        if (fav.indexOf(indexName) === -1) {
            fav.push(indexName);
        } else {
            fav = fav.filter((i) => i !== indexName);
        }

        localStorage.setItem("favourites", JSON.stringify(fav));
        setFavorites(fav);
    }

    console.log(favorites)

    return (
        <div className="spellList">
            {
                spells && spells.map(spell => (
                    <div key={spell.index} className="spellRow" onClick={() => spellDetails(spell)}>
                        <IconButton>
                            <StarIcon color={favorites.includes(spell.index) ? "primary" : "disabled"} onClick={(e) => {
                                e.stopPropagation();
                                addOrRemoveFavourite(spell);
                            }}/>
                        </IconButton>
                        <div className="spellName">{spell.name}</div>
                    </div>
                ))
            }
        </div>
    );
}

export default SpellList;
